import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getReportListing, getReportListing1, postAllDataAction, reportGenerateAction } from "../../../../redux/slice/comman/commanSlice";
import BreadCrumb from "../../../../components/layout/BreadCrumb";

const GroupWiseItemControl = () => {
    const dispatch = useDispatch();
    const menuList = useSelector(state => state.menu);
    const getPostData = useSelector((state) => state.comman.getPostData);
    const getReport = useSelector((state) => state.comman.getReport);
    const getReport1 = useSelector((state) => state.comman.getReport1);

    // const loading = useSelector((state) => state.comman.loading);
    const [loading, setLoading] = useState(false); // loading state
    const [reportTypes, setReportTypes] = useState([]);
    const [downloadReport, setDownloadReport] = useState({
        groupCode: "",
        depoCode: "",
        fromDate: "",
        toDate: "",
        reportType: "",
        fileName: ""
    });
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        if (getPostData?.success?.length) {
            const parsedReportTypes = getPostData.success.map((item) => {
                const fileType = item.split('/')[0].toUpperCase(); // TEXT, PDF, EXCEL
                const fileName = item.split('/')[1]; // DCST_Ledger_TXT, pd_Ledger, ex_Ledger
                return { type: fileType, fileName };
            });
            setReportTypes(parsedReportTypes);
        }
    }, [getPostData]);

    useEffect(() => {
        const storeModule = menuList.data['Store'];
        const reportMenu = storeModule?.Report?.find(report => report.dcpyViewSecurityMenyKey.menuId === 1212);
        if (!reportMenu) {
            console.error("Report menu not found for moduleId 12");
            return; // Exit the function early if reportMenu is undefined
        }

        const menuId = reportMenu.dcpyViewSecurityMenyKey.menuId;
        const getReportGenerate = async () => {
            const endPoint = `report/reportType/${menuId}`;
            const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
            const { token } = adminLoginData;

            try {
                await dispatch(postAllDataAction({ endPoint, token })).unwrap();
            } catch (error) {
                console.error("Error menuID:", error);
            }
        };

        getReportGenerate();
    }, [menuList, dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        // Construct the endpoint dynamically based on report type and file path
        const endPoint = `report/jasper/${downloadReport.reportType}/${downloadReport.fileName}`;
        const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
        const { token } = adminLoginData;

        const dataInfo = {
            groupCode: downloadReport.groupCode,
            depoCode: downloadReport.depoCode,
            fromDate: moment(downloadReport.fromDate).format("DD/MM/YYYY"),
            toDate: moment(downloadReport.toDate).format("DD/MM/YYYY"),
        };

        try {
            const response = await dispatch(reportGenerateAction({ endPoint, dataInfo, token })).unwrap();

            // Process the response as a Blob for file download
            const url = window.URL.createObjectURL(response);
            const link = document.createElement('a');
            link.href = url;

            // Dynamically determine the file extension based on reportType
            let fileExtension = ''; // Default to txt
            switch (downloadReport.reportType) {
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
                    fileExtension = 'txt'; // Default to txt if none is selected
            }

            // Construct the download file name dynamically with the appropriate extension
            const fileName = `${downloadReport.fileName.split('.jrxml')[0]}.${fileExtension}`;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            // Reset the form after successful submission
            setDownloadReport({
                groupCode: "",
                depoCode: "",
                fromDate: "",
                toDate: "",
                reportType: "",
                fileName: ""
            });

        } catch (error) {
            console.error("Error fetching report:", error);
            setErrorMessage("Report generation failed. Please try again.");
            setTimeout(() => {
                setErrorMessage(""); // Clears the error message
            }, 5000);
        }
        finally {
            setLoading(false);
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setDownloadReport((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };



    const handleReportTypeChange = (event) => {
        const selectedType = event.target.value;
        const selectedFile = reportTypes.find(report => report.type === selectedType);
        setDownloadReport((prevFormData) => ({
            ...prevFormData,
            reportType: selectedType,
            fileName: selectedFile ? selectedFile.fileName : ""
        }));
    };


    const isFormValid = () => {
        const { groupCode, depoCode, fromDate, toDate, reportType } = downloadReport;
        return groupCode && depoCode && fromDate && toDate && reportType;
    };

    useEffect(() => {
        const getDepo = async () => {
            const adminLoginData = JSON.parse(localStorage.getItem("adminLogin"));
            if (adminLoginData && adminLoginData.token) {
                const { token } = adminLoginData;
                const endPoint = "report/get/depo-code";
                const dataInfo = 'null'
                try {
                    await dispatch(getReportListing({ endPoint, token, dataInfo }));
                } catch (error) {
                    console.error("Error fetching item list:", error);
                }
            } else {
                console.error("No valid adminLogin data found in localStorage");
            }
        };
        getDepo()
    }, []);

    useEffect(() => {
        const getGroup = async () => {
            const adminLoginData = JSON.parse(localStorage.getItem("adminLogin"));
            if (adminLoginData && adminLoginData.token) {
                const { token } = adminLoginData;
                const endPoint = "report/get/group-code";
                const dataInfo = 'null'
                try {
                    await dispatch(getReportListing1({ endPoint, token, dataInfo }));
                } catch (error) {
                    console.error("Error fetching getGroup list:", error);
                }
            } else {
                console.error("No valid adminLogin data found in localStorage");
            }
        };
        getGroup()
    }, []);

    return (
        <section >
            <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Group Wise Item Control' }} />
            <div className="custome-border pb-4">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <h5>Group Wise Item Control</h5>
                </div>
                {errorMessage && (
                    <div className="alert alert-danger m-3">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit} style={{ boxSizing: "border-box" }} className="px-2 py-4 custom-width mx-auto shadow-sm">
                    <div className="row mx-auto mw-100">
                        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
                            <label htmlFor="groupCode" className="col-form-label" style={{ flex: '0 0 40%' }}>
                                Group Code:
                            </label>
                            <div className="select-container">
                                <select
                                    className="custome-input-height form-control custome-border"
                                    id="groupCode"
                                    name="groupCode"
                                    value={downloadReport.groupCode}
                                    onChange={handleChange}
                                    style={{ flex: '1 1 auto' }}
                                >
                                    <option value="">Select </option>
                                    <option value="0">All</option>
                                    {getReport1?.success && getReport1.success.length > 0 ? (
                                        getReport1.success.map((code, index) => (
                                            <option key={index} value={code.groupCode}>
                                                {code.groupCode} - {code.groupName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No Depo Available</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
                            <label htmlFor="depoCode" className="col-form-label" style={{ flex: '0 0 40%' }}>
                                Depo Code:
                            </label>
                            <div className="select-container">
                                <select
                                    className="custome-input-height form-control custome-border"
                                    id="depoCode"
                                    name="depoCode"
                                    value={downloadReport.depoCode}
                                    onChange={handleChange}
                                    style={{ flex: '1 1 auto' }}
                                >
                                    <option value="">Select</option>
                                    <option value="0">All</option>
                                    {getReport?.success && getReport.success.length > 0 ? (
                                        getReport.success.map((code, index) => (
                                            <option key={index} value={code.depoCode}>
                                                {code.depoCode} - {code.depoDescription}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No Depo Available</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
                            <label htmlFor="fromDate" className="col-form-label" style={{ flex: '0 0 40%' }}>From Date:</label>
                            <input
                                type="date"
                                className="custome-input-height form-control custome-border"
                                id="fromDate"
                                name="fromDate"
                                value={downloadReport.fromDate}
                                onChange={handleChange}
                                style={{ flex: '1 1 auto' }}
                            />
                        </div>
                        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
                            <label htmlFor="toDate" className="col-form-label" style={{ flex: '0 0 40%' }}>To Date:</label>
                            <input
                                type="date"
                                className="custome-input-height form-control custome-border"
                                id="toDate"
                                name="toDate"
                                value={downloadReport.toDate}
                                onChange={handleChange}
                                style={{ flex: '1 1 auto' }}
                            />
                        </div>

                        <div className="form-group col-lg-4 d-flex align-items-center gap-2 mt-3">
                            <label htmlFor="reportType" className="col-form-label" style={{ flex: '0 0 40%' }}>Report Type:</label>
                            <select
                                className="custome-input-height form-select custome-border"
                                id="reportType"
                                name="reportType"
                                value={downloadReport.reportType}
                                onChange={handleReportTypeChange}
                                style={{ flex: '1 1 auto' }}
                            >
                                <option value="">Select </option>
                                {reportTypes.map((report, index) => (
                                    <option key={index} value={report.type}>{report.type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
                        <button type="submit"
                            className="btn btn-sm custome-button-color1 text-white mx-2" disabled={!isFormValid()}>
                            <FaSyncAlt className="me-1" /> {loading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default GroupWiseItemControl;
<div className="row">
<div className="form-group col-md-12 d-flex mt-3 align-items-center">
    <div className="col-sm-2 col-4">
        <label htmlFor="outputFile" className="mr-3 pe-7">
            Output File:
        </label>
    </div>
    <div className="col-sm-10 col-8">
        <div role="group" aria-labelledby="outputFile">
            <div className="form-check form-check-inline">
                <Field
                    style={{ display: 'block' }}
                    type="radio"
                    name="outputFile"
                    value="csv"
                    className="form-check-input"
                    id="csvOption"
                />
                <label className="form-check-label" htmlFor="csvOption">
                    CSV
                </label>
            </div>
            <div className="form-check form-check-inline">
                <Field
                    style={{ display: 'block' }}
                    type="radio"
                    name="outputFile"
                    value="pdf"
                    className="form-check-input"
                    id="pdfOption"
                />
                <label className="form-check-label" htmlFor="pdfOption">
                    PDF
                </label>
            </div>
            <div className="form-check form-check-inline">
                <Field
                    style={{ display: 'block' }}
                    type="radio"
                    name="outputFile"
                    value="xls"
                    className="form-check-input"
                    id="xlsOption"
                />
                <label className="form-check-label" htmlFor="xlsOption">
                    XLS
                </label>
            </div>
        </div>
        {/* Error message if required */}
        <ErrorMessage name="outputFile" component="div" className="invalid-feedback" />
    </div>
</div>
</div>



import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// import { convertToNodes } from '../../../utils/helper';
// import { useToast } from "../../../components/ToastMessage"
// import { addRole, getRoles, clearRole, getMenuRole, createRole } from "../redux/reducer/security/transaction/roleReducer";
// import BreadCrumb from '../../../components/layout/BreadCrumb';
import { addRole, getRoles, clearRole, getMenuRole, createRole } from '../../../../redux/reducer/security/transaction/roleReducer';
import BreadCrumb from '../../../../components/layout/BreadCrumb';
import { GetReportDepoCode } from '../apiService';




function DepoItemList() {
    const { serMessage, roles, serResponse, role_menu_list, serError, isLoading } = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [reportDepoOptions, setReportDepoOptions] = useState({});
    const [checked, setChecked] = useState([]);
    const [depoOptions, setDepoOptions] = useState([]);
    const [itemOptions, setItemOptions] = useState([]);
    const [selectedExapanded, setSelectedExpanded] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const [items, setItems] = useState([]);
    const [menus, setMenus] = useState('');
    const [roleError, setRoleError] = useState("");
    const [roleFormError, setRoleFormError] = useState(false);
    const [formError, setFormError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { 
        GetReportDepoCode(dispatch, setReportDepoOptions, { }); 
    }, []);
    // useEffect(() => {
    //     dispatch(getRoles());
    //     const { nodes, defult } = convertToNodes(role_menu_list);
    //     setItems(nodes)
    //     setChecked(defult) 
    // }, [role_menu_list]);

    // const toggleExpanded = async (roleId) => {
    //     setError(null);
    //     setFormError(false)
    //     if (!roleId) {
    //         setExpanded(false);
    //         setRoleError("Please select a role before expanding the menu.");
    //     } else {
    //         await dispatch(clearRole());
    //         setFormData({ roleId })
    //         await dispatch(getMenuRole({ roleId }));
    //         setRoleError("");
    //         setExpanded(true);
    //     }
    // };

    // const validationSchema = Yup.object({
    //     roleDescription: Yup.string().matches(/^[a-zA-Z0-9]*$/, 'Only alphanumeric characters are allowed'),
    // });

    const initialValues = {
        roleDescription: "",
    };

    //add role function call
    const handleFormSubmit = async (values, { setSubmitting, setErrors, resetForm, setValues }) => {
        //     await dispatch(clearRole());
        //     setFormError(false)
        //     if (!values.roleDescription) {
        //         setErrors({ roleDescription: 'Role Description cannot be empty.' });
        //         setSubmitting(false);
        //         return;
        //     }
        //     setRoleFormError(true)
        //     try {
        //         const action = await dispatch(addRole(values));
        //         if (addRole.fulfilled.match(action)) {
        //             setValues({roleDescription: ""})
        //             await dispatch(getRoles());
        //         }
        //     } catch (error) {
        //         showToast('error', 'Server error!', 'An unexpected error occurred.');
        //     } finally {
        //         setTimeout(async () => {
        //             setRoleFormError(false)
        //             dispatch(clearRole());
        //         }, 5000);
        //     }
    };


    // const handleCheck = (checked) => {
    //     setChecked(checked);
    //     setMenus(checked.join(', '));
    //     if (checked && checked.length > 0) {
    //         setError(null);
    //         setFormError(false)
    //     }
    // };

    const [loading, setLoading] = useState(false);


    // const handleSave = async () => {
    //     if (!menus) {
    //         setFormError(true)
    //         setError('Select At Least One Menu.');
    //         return;
    //     } 
    //     try {
    //         setLoading(true)
    //         await dispatch(createRole({ menus, roleId: formData.roleId }));
    //     } catch (error) {
    //         setLoading(false)
    //         setFormError(false)
    //         showToast('error', 'Server error!', 'An unexpected error occurred.');
    //     } finally {
    //         setTimeout(async () => {
    //             setLoading(false)
    //             setFormError(false)
    //             dispatch(clearRole());
    //         }, 5000);
    //     }
    // };
    return (
        <section>
            <BreadCrumb item={{ label: 'Security', 'sub_label': 'Transaction', active: true, current: 'Depo Wise GRN Register' }} />
            <div className="custome-border pb-4">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <h5>Depo Wise GRN Register</h5>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, touched, errors, setFieldValue, handleChange, handleBlur }) => (
                        <Form className="px-3 py-4 custom-width mx-auto p-2">
                            <div className="row">
                                <div className="form-group col-md-12 d-flex mt-3 align-items-center">
                                    <div className="col-sm-2 col-4">
                                        <label htmlFor="depoCode" className="mr-3 pe-7">
                                            Depo Code:
                                        </label>
                                    </div>
                                    <div className="col-sm-10 col-8">
                                        <Select
                                            className={`custome-input-height wide-input5 ${false ? "is-invalid" : ""}`}
                                            id="depoCode"
                                            name="depoCode"
                                            options={reportDepoOptions}
                                            // onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12 d-flex mt-3 align-items-center">
                                    <div className="col-sm-2 col-4">
                                        <label htmlFor="itemCode" className="mr-3 pe-7">
                                            Item Code:
                                        </label>
                                    </div>
                                    <div className="col-sm-10 col-8">
                                        <Select
                                            className={`custome-input-height wide-input5 ${false ? "is-invalid" : ""}`}
                                            id="itemCode"
                                            name="itemCode"
                                            options={itemOptions}
                                            // onChange={(selectedOption) => handleChangeSelect(selectedOption, 'itemCode')}
                                            menuPortalTarget={document.body}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Output File Selection as Radio Buttons */}
                            <div className="row">
                                <div className="form-group col-md-12 d-flex mt-3 align-items-center">
                                    <div className="col-sm-2 col-4">
                                        <label htmlFor="outputFile" className="mr-3 pe-7">
                                            Report Type:
                                        </label>
                                    </div>
                                    <div className="col-sm-10 col-8">
                                        <div role="group" aria-labelledby="outputFile">
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="csv"
                                                    className="form-check-input"
                                                    id="csvOption"
                                                />
                                                <label className="form-check-label" htmlFor="csvOption">
                                                    CSV
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="pdf"
                                                    className="form-check-input"
                                                    id="pdfOption"
                                                />
                                                <label className="form-check-label" htmlFor="pdfOption">
                                                    PDF
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="xls"
                                                    className="form-check-input"
                                                    id="xlsOption"
                                                />
                                                <label className="form-check-label" htmlFor="xlsOption">
                                                    XLS
                                                </label>
                                            </div>
                                        </div>
                                        {/* Error message if required */}
                                        <ErrorMessage name="outputFile" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12 d-flex mt-3 align-items-center">
                                    <div className="col-sm-2 col-4">
                                        <label htmlFor="outputFile" className="mr-3 pe-7">
                                            Report Type:
                                        </label>
                                    </div>
                                    <div className="col-sm-10 col-8">
                                        <div role="group" aria-labelledby="outputFile">
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="csv"
                                                    className="form-check-input"
                                                    id="csvOption"
                                                />
                                                <label className="form-check-label" htmlFor="csvOption">
                                                    CSV
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="pdf"
                                                    className="form-check-input"
                                                    id="pdfOption"
                                                />
                                                <label className="form-check-label" htmlFor="pdfOption">
                                                    PDF
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    style={{ display: 'block' }}
                                                    type="radio"
                                                    name="outputFile"
                                                    value="xls"
                                                    className="form-check-input"
                                                    id="xlsOption"
                                                />
                                                <label className="form-check-label" htmlFor="xlsOption">
                                                    XLS
                                                </label>
                                            </div>
                                        </div>
                                        {/* Error message if required */}
                                        <ErrorMessage name="outputFile" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                            </div>
                            <div className="row custom-width mx-auto  ">
                                <div className="form-group col-md-12 mt-3 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2" >
                                        {false ? 'Processing...' : <><FaSyncAlt /> Generate Report</>}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>


            </div>


        </section>);
}

export default DepoItemList;
