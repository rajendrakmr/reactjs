import React, { useEffect, useState, useCallback } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import { GetReportDepoCode, GetReportType, GetTransCode } from "../apiService";
import MandatoryField from "../../../../components/MandatoryField";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";
import InputDateField from "../../../../components/formComponent/InputDateField";
import { submitPostData } from "../../../../redux/reducer/commonApiSlice";
import Loader from "../../../../components/Loader";

const Index = () => {
    const dispatch = useDispatch();
    const baseUrl = `${window.location.pathname}`;
    const menuList = useSelector(state => state.menu);
    const [reportType, seReportType] = useState([]);
    const [errors, setErrors] = useState({});
    const [serError, setSerError] = useState("");
    const [reportDepoOptions, setReportDepoOptions] = useState([{ value: "0", label: "All" }]);
    const [reportTCOption, setReportTCOptions] = useState([{ value: "0", label: "All" }]);
    const [isGenerate, setIsGenerate] = useState(false);

    useEffect(() => {
        const currentMenu = menuList?.data?.Store?.Report.find(report => `${'/Store_Accounts'}${report.menuLinkName}` === baseUrl);
        if (currentMenu) {
            GetReportType(dispatch, seReportType, currentMenu.dcpyViewSecurityMenyKey.menuId)
        } 
    }, [menuList, baseUrl, dispatch]);


    useEffect(() => { 
        GetReportDepoCode(dispatch, setReportDepoOptions)
        GetTransCode(dispatch, setReportTCOptions)
    }, []);

    useEffect(() => {
        if (reportType.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                typeOfReport: `${reportType[0].fileType}|${reportType[0].fileName}`,
            }));
        }
    }, [reportType]);


    // set validation 
    const validateForm = (callback) => {
        let errors = {};
        if (!formData.depoCode) errors.depoCode = "Field is required.";
        if (!formData.tcCode) errors.tcCode = "Field is required.";
        if (!formData.fromDate) errors.fromDate = "Field is required.";
        if (!formData.toDate) errors.toDate = "Field is required.";
        if (!formData.typeOfReport) errors.typeOfReport = "Field is required.";
        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        if (callback) { callback(isValid, errors); }
        return isValid;
    };

    const initialState = {
        tcCode: "",
        depoCode: "",
        fromDate: null,
        toDate: null,
        typeOfReport: "",
        fileName: ""
    };
    const [formData, setFormData] = useState(initialState);


    const handleSubmit = useCallback(async (event) => {
        event.preventDefault(); 
        validateForm(async (isValid, errors) => {
            if (isValid) {
                const [filetype, fileUrl] = formData.typeOfReport.split("|");
                if (!filetype || !fileUrl) {
                    setSerError("Invalid report type selection. Please try again.");
                    setIsGenerate(false);
                    return;
                }
                setIsGenerate(true)
                const filepath = fileUrl.split('.jrxml')[0];
                const endPoint = `report/jasper/${filetype}/${fileUrl}`;
                try {
                    const dataInfo = {
                        depoCode: formData.depoCode,
                        tcCode: formData.tcCode,
                        irFlag: "I",
                        fromDate: formData.fromDate,
                        toDate: formData.toDate
                    };
                    const action = await dispatch(submitPostData({ dataInfo: dataInfo, indicatorsPath: endPoint }));

                    if (submitPostData.fulfilled.match(action)) {
                        if (action?.payload) {
                            const response = new Blob([action.payload]);
                            const url = window.URL.createObjectURL(response);
                            const link = document.createElement('a');
                            link.href = url;
                            let fileExtension = '';
                            switch (filetype) {
                                case 'TXT':
                                    fileExtension = 'txt';
                                    break;
                                case 'EXCEL':
                                    fileExtension = 'xls';
                                    break;
                                case 'PDF':
                                    fileExtension = 'pdf';
                                    break;
                                default:
                                    fileExtension = 'txt';
                            }

                            link.download = `${filepath}.${fileExtension}`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(url);

                            // setTimeout(() => { setFormData(initialState); }, 5000);
                            setFormData({
                                ...initialState,
                                typeOfReport: `${reportType[0].fileType}|${reportType[0].fileName}`,
                            });
                        } else {
                            console.error('Error submitting the form:');
                        }
                    }
                    else {
                        setSerError("Report not available for the selected data. Please check your input and try again.");
                        setTimeout(() => {
                            setSerError("");
                        }, 5000)
                    }
                } catch (error) {
                    console.error('Error submitting the form:', error);
                } finally {
                    setIsGenerate(false);
                }

            } else {
                setSerError('Please fiil all required fields.')
                setTimeout(() => {
                    setSerError('')
                    setIsGenerate(false)
                }, 2000);
            }
        })

    }, [formData]);



    const setSelectError = useCallback((field) => {
        if (field !== undefined) { return errors[field] || ''; }
        return errors;
    }, [errors]);

    const hasError = useCallback((name) => { return !!errors[name]; }, [errors]);

    /********** Handle change********************* */
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            ...(name === "fromDate" && {toDate:null })
        }));
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[name]) {
                delete updatedErrors[name];
            }
            return updatedErrors;
        });
    }, []);

    const handleChangeSelect = useCallback((e, field) => {
        const { value } = e; 
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
            ...(field === "tcCode" && {toDate:null,fromDate:null }),
            ...(field === "depoCode" && {tcCode:null,toDate:null,fromDate:null })
        })); 
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[field]) {
                delete updatedErrors[field];
            }
            return updatedErrors;
        });
    }, []);


    return (
        <section >
            <div className="container mt-5">
                <BreadCrumb item={{ label: 'Store', 'sub_label': 'Report', active: true, current: 'Issue Receipt Wise Register' }} />
                <div className="pb-4">
                    <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                        <h5>Issue Receipt Wise Register</h5>
                    </div>
                    <MandatoryField />
                    {serError && (
                        <div className="alert alert-danger m-3">
                            {serError}
                        </div>
                    )}

                    <div className="_rkContentBorder row py-2">
                        <div className="row mx-auto mw-100">
                            <SelectFormInput
                                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
                                error={setSelectError('depoCode')}
                                id="depoCode"
                                name="depoCode"
                                value={formData.depoCode}
                                options={reportDepoOptions}
                                label="Depot Code"
                                required={true}
                            />

                            <SelectFormInput
                                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'tcCode')}
                                error={setSelectError('tcCode')}
                                id="tcCode"
                                name="tcCode"
                                value={formData.tcCode}
                                options={reportTCOption}
                                label="Trans Code"
                                required={true} 
                            />
                            <InputDateField label="From Date" name="fromDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={handleChange} isRequired={true} type="date" />
                            <InputDateField label="To Date" minDate={formData.fromDate} name="toDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={handleChange} isRequired={true} type="date" />

                            <div className="form-group col-md-3 d-flex align-items-center gap-2 mt-1">
                                <label htmlFor="type" className="col-form-label" style={{ flex: '0 0 40%' }}>Output File:<span className="text-danger text-bold">*</span></label>
                                <div id="type">
                                    {reportType.map((report, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                className="form-check-input custome-border"
                                                type="radio"
                                                id={`reportType${index}`}
                                                name="typeOfReport"
                                                value={`${report.fileType}|${report.fileName}`}
                                                checked={formData.typeOfReport === `${report.fileType}|${report.fileName}`}
                                                onChange={handleChange}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <label className="form-check-label" htmlFor={`reportType${index}`}>
                                                {report.fileType}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            {hasError("typeOfReport") && (
                                <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>
                                    {errors['typeOfReport']}
                                </span>
                            )}
                        </div>

                        <div className="d-flex justify-content-end gap-4 mt-4 flex-wrap">
                            <button type="submit"
                                onClick={handleSubmit}
                                className="btn btn-sm custome-button-color1 text-white mx-2">
                                <FaSyncAlt className="me-1" /> {isGenerate ? 'Generating...' : 'Generate Report'}
                            </button>
                        </div>

                        { isGenerate && <Loader text="Generating..." />}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;









