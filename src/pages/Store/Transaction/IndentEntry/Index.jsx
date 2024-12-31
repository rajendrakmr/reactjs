import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter, FaEye, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { getCookie } from "../../../../utils/cookieService";
import { getPreDefData } from "../../../../redux/reducer/store/transaction/IndentReducer";
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import { filterRecordData } from "../../../../utils/helper";
import { GetTypeReport } from "../../../helperFun";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";
import moment from "moment";



const Index = () => {
    const { data } = useSelector((state) => state.auth);
    const createdBy = getCookie('userInfo')?.loginId;
    const dispatch = useDispatch();
    const { dataRecords, dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);





    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setPagination((prevPagination) => {
            const updatedPagination = { ...prevPagination, page: newPage };
            handleSearchResults(updatedPagination);
            return updatedPagination;
        });
    }

    const changeFilter = () => {
        setIsAdvancedSearch(!isAdvancedSearch);
    }




    const initialData = {
        minDate: moment().format('DD/MM/YYYY'),
        indentEdit: "S",
        routingDetail: "",
        deptIndentNo: "",
        purposeOfProcurement: "",
        consigneeName: "SM (IT)",
        placeOfDelivery: "DPL",
        deptIndentDate: moment().format('DD/MM/YYYY'),
        proposeddateOfDelivery: "",
        indentorDesignation: "",
        indentorDepartment: "",
        indentorDesignationName: "",
        indentorDepartmentName: "",
        rejectionReason: "",
        groupNo: "",
        subGroupNo: "",
        groupName: "",
        subGroupName: "",
        indentStatus: "S",
        loginId: createdBy,
        selectedLoginId: "",
        indentItemChildList: [
            // {
            //     depoCode: "",
            //     itemCode: "",
            //     jobCode: "",
            //     unitCode: "",
            //     lastPoNo: "",
            //     depoDescription: "",
            //     lastPoDate: "",
            //     lastPoRate: "",
            //     quantity: "",
            //     outstandingIndentNo: "",
            //     outstandingIndentDate: "",
            //     outstandingPoNo: "",
            //     outstandingPoDate: "",
            //     specialInstruction: "",
            //     remarks: "",
            //     modeOfTender: "",
            //     vendorDetails: "",
            //     indentItemChildOfChildList: [
            //         {
            //             balanceStock: "",
            //             cpSi: "",
            //             cpLast3Yr: "",
            //             cpLast1Yr: "",
            //             reorderLevel: ""
            //         }
            //     ]
            // }
        ],
        indentRefChildren: [
            {
                refType: "",
                refNo: "",
                refDate: "",
                refDesc: "",
                refIsActive: "Y",
                refUpdDate: "",
                refUpdFile: ""
            }
        ],
        routingDetailsModuleList: [{}]
    };

    const [errors, setErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [isFilter, setIsFilter] = useState(false);

    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.indentNo && { indentNo: p.indentNo }),
            ...(p.deptIndentNo && { deptIndentNo: p.deptIndentNo }),
            ...(p.deptIndentDate && { deptIndentDate: p.deptIndentDate }),
            ...(p.indentorDesignation && { indentorDesignation: p.indentorDesignation }),
            ...(p.indentorDepartment && { indentorDepartment: p.indentorDepartment }),
            ...(p.indentStatus && { indentStatus: p.indentStatus }),
            pageNo: p.page ? p.page : 0,
            pageSize: 8,
            createdBy: data?.loginId
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo, indicatorsPath: '/indent/search' }));
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.content?.length > 0) {
                    setRecordItems(response?.payload?.success?.content)
                    setTotalPagNO(response?.payload?.success?.totalPages)
                    setTotalCount(response?.payload?.success?.totalElements)
                    setIsAdvancedSearch(false)
                } else {
                    setRecordItems([])
                }
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        } finally {
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (!recordItems?.length > 0 && isFilter) {
                setIsAdvancedSearch(true)
            }

        }
    }




    useEffect(() => {
        setRecordItems([])
        setRecordItems(0)
        setSearchResult(false)
        handleSearchResults({})
    }, [])




    const handleEditPopupOpen = (item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        const editItem = {
            ...item,
            ...(!item.indentRefChildren.length > 0 && {
                indentRefChildren: [
                    {
                        refType: "",
                        refNo: "",
                        refDate: "",
                        refDesc: "",
                        refIsActive: "Y",
                        refUpdDate: "",
                        refUpdFile: "",
                        filePreview: null
                    }
                ]
            })

        }
        // console.log('editItemeditItem',editItem)

        setFormData(editItem)
        setAddPopupVisible(false);
        setEditPopupVisible(true);
    };



    const handleAddPopupOpen = async () => {
        setFormData(initialData)
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setAddPopupVisible(true);
        setEditPopupVisible(false);
        const resp1 = await dispatch(getPreDefData({ dataInfo: { createdBy: data?.loginId, retType: "E" }, indicatorsPath: '/indent/get/desig-dept' }))
        if (getPreDefData.fulfilled.match(resp1)) {
            setFormData(prev => ({ ...prev, indentorDesignation: resp1.payload.success }));
        }
        const resp2 = await dispatch(getPreDefData({ dataInfo: { createdBy: data?.loginId, retType: "D" }, indicatorsPath: '/indent/get/desig-dept' }))
        if (getPreDefData.fulfilled.match(resp2)) {
            setFormData(prev => ({ ...prev, indentorDepartment: resp2.payload.success }));
        }


        const resp3 = await dispatch(getPreDefData({ dataInfo: { createdBy: data?.loginId, retType: "E" }, indicatorsPath: '/stn/indent/get/stnindentedby' }))
        if (getPreDefData.fulfilled.match(resp3)) {
            setFormData(prev => ({ ...prev, designation: resp3.payload.success }));
        }
        const resp4 = await dispatch(getPreDefData({ dataInfo: { createdBy: data?.loginId, retType: "D" }, indicatorsPath: '/stn/indent/get/stnindentedby' }))
        if (getPreDefData.fulfilled.match(resp4)) {
            setFormData(prev => ({ ...prev, department: resp4.payload.success }));
        }


    };

    const handleAddPopupClose = () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setAddPopupVisible(false);
        setEditPopupVisible(false);

    };



    const handleAddFormChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);






    const validateForm = (callback) => {
        let errors = {};
        // if (!formData.deptIndentNo) errors.deptIndentNo = "Field is required.";
        if (!formData.deptIndentDate) errors.deptIndentDate = "Field is required.";
        if (!formData.indentorDesignation) errors.indentorDesignation = "Field is required.";
        if (!formData.selectedLoginId) errors.selectedLoginId = "Field is required.";
        if (!formData.groupNo) errors.groupNo = "Field is required.";
        if (!formData.subGroupNo) errors.subGroupNo = "Field is required.";


        if (formData.indentItemChildList.length ===0) {
            let itemErrors = {};
            itemErrors.depoCode = "Field is required.";
            if (Object.keys(itemErrors).length > 0) {
                errors[`indentItemChildList_0}`] = itemErrors;
            }
        } else {

            formData.indentItemChildList.forEach((item, index) => {
                let itemErrors = {};
                if (!item.depoCode) itemErrors.depoCode = "Field is required.";
                if (!item.itemCode) itemErrors.itemCode = "Field is required.";
                if (!item.quantity) itemErrors.quantity = "Field is required.";
                if (!item.unitCode) itemErrors.unitCode = "Field is required.";
                item.indentItemChildOfChildList.forEach((childItem, childIndex) => {
                    let childItemErrors = {};
                    if (Object.keys(childItemErrors).length > 0) {
                        itemErrors[`indentItemChildOfChildList_${childIndex}`] = childItemErrors;
                    }
                });

                if (Object.keys(itemErrors).length > 0) {
                    errors[`indentItemChildList_${index}`] = itemErrors;
                }
            });

        }


        formData.indentRefChildren.forEach((ref, refIndex) => {
            let refErrors = {};
            if (Object.keys(refErrors).length > 0) {
                errors[`indentRefChildren_${refIndex}`] = refErrors;
            }
        });

        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        if (callback) {
            callback(isValid, errors);
        }

        return isValid;
    };





    const handleAddSubmit = useCallback(async (event) => {
        event.preventDefault();
        const dataInfo = {
            ...formData,
            indentStatus: formData.indentStatus === "T" ? "S" : formData.indentStatus,
            loginId: data?.loginId

        };
        if (editPopupVisible) {
            dataInfo.indentNo = formData.indentNo;
            dataInfo.loginId = data?.loginId;
        }
        validateForm(async (isValid, errors) => {
            console.log('errorserrorserrors', errors, formData)
            formData.indentRefChildren.forEach((ref, refIndex) => {
                let refErrors = {};
                const isAnyFieldFilled = ref.refNo || ref.refDate;
                if (ref.refUpdFile) {
                    if (!ref.refNo) refErrors.refNo = "Field is required.";
                    if (!ref.refDate) refErrors.refDate = "Field is required.";
                }
                if (isAnyFieldFilled) {
                    if (!ref.refNo) refErrors.refNo = "Field is required.";
                    if (!ref.refDate) refErrors.refDate = "Field is required.";
                }
                if (Object.keys(refErrors).length > 0) {
                    errors[`indentRefChildren_${refIndex}`] = refErrors;
                    isValid = false;
                }
            });


            if (isValid) {
                let indicatorsPath = '/indent/add';
                if (editPopupVisible) {
                    indicatorsPath = '/indent/update';
                }

                try {

                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))

                    if (submitPostData.fulfilled.match(action)) {
                        if (action?.payload?.success) {
                            handleSearchResults(pagination)
                            if (editPopupVisible) {
                                setSuccessReponse('Indent updated successfully.')
                            } else {
                                setSuccessReponse('Indent save successfully.')
                            }
                            setTimeout(() => {
                                setAddPopupVisible(false);
                                setEditPopupVisible(false);
                            }, 1000);
                        } else {
                            setSerMessage(action?.payload?.error || "Something went wrong.")
                        }
                    } else {
                        setSerMessage(action?.payload?.error || "Something went wrong.")
                    }
                } catch (error) {
                    setSerMessage(error)
                }
            } else {
                setSerMessage('Please enter required fields.')
            }
        });
    }, [formData, data]);






    const initialValues = {
        indentNo: "",
        indentStatus: "",
        deptIndentNo: "",
        deptIndentDate: "",
        indentorDesignation: "",
        indentorDepartment: "",
        pageNo: 0,
        pageSize: 10
    };



    const [initialFilterData, setInitialFilterData] = useState(initialValues);

    const filterHandleChange = useCallback((e) => {
        const { name, value } = e.target;
        setInitialFilterData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, [setInitialFilterData]);

    const handleSearch = useCallback(async (e) => {
        e.preventDefault()
        setSearchResult(true)
        await handleSearchResults(initialFilterData)
    }, [initialFilterData]);

    const resetSearch = useCallback(async (e) => {
        e.preventDefault()
        setInitialFilterData(initialValues)
        setSearchResult(true)
        await handleSearchResults({})
    }, []);

    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);




    /**********************PRINT RECORDS */

    const MenuItem = useSelector(state => state.menu);
    const baseUrl = `${window.location.pathname}`;
    const [repotTypeOption, setReportTypeOption] = useState([]);
    const [isDownload, setIsDownload] = useState(false)
    useEffect(() => {
        const currentMenu = MenuItem?.menuList.Store?.Transaction?.find(report => report.menuLinkName === baseUrl);
        if (currentMenu?.dcpyViewSecurityMenyKey?.menuId) {
            const payload = currentMenu?.dcpyViewSecurityMenyKey?.menuId;
            GetTypeReport(dispatch, setReportTypeOption, payload);
        }
    }, [MenuItem]);


    const printReport = useCallback(async (item) => {
        const fileExtension = 'PDF';
        setIsDownload(true)
        const fileUrl = repotTypeOption[0]?.fileName
        const filepath = fileUrl.split('.jrxml')[0];
        const endPoint = `/report/jasper/${fileExtension}/${fileUrl}`;
        try {
            const dataInfo = {
                indentNo: item.indentNo
            };
            const action = await dispatch(submitPostData({ dataInfo: dataInfo, indicatorsPath: endPoint, responseType: true }));
            if (action?.payload) {
                const response = new Blob([action.payload], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${filepath}.${fileExtension}`;
                document.body.appendChild(link);
                link.click();
                window.open(url, '_blank');
                document.body.removeChild(link);
                setTimeout(() => window.URL.revokeObjectURL(url), 100);
            } else {
            }
        } catch (error) {
        } finally {
            setIsDownload(false)
        }
    }, [repotTypeOption])


    const indentStatusOption = [
        { value: '', label: 'All' },
        { value: 'S', label: 'Routed' },
        { value: 'T', label: 'Return to Indentor' },
        { value: 'A', label: 'Approved' },
        { value: 'R', label: 'Rejected' }
    ]

    const handleChangeSelect = useCallback((e, field) => {
        const { value } = e;
        setInitialFilterData((prevFormData) => ({
            ...prevFormData,
            [field]: value
        }));
    }, []);
    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Indent Entry' }} />
            <div className="custome-border ">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <div className="position-absolute top-0 start-0 m-1 d-flex gap-2">
                        <button
                            onClick={handleAddPopupOpen}
                            type="button"
                            className="btn btn-sm btn-secondary"
                        >
                            <FaPlus className="me-1" /> Add
                        </button>
                        <button
                            onClick={changeFilter}
                            type="button"
                            style={{ backgroundColor: '#c15065', color: '#fff' }}
                            className="btn btn-sm"
                        >
                            <FaFilter className="me-1" /> Advanced Search
                        </button>

                    </div>
                    <h6>Indent Entry</h6>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >
                    <SearchInputField label="Indent No" name="indentNo" inputData={initialFilterData.indentNo} onChange={filterHandleChange} />
                    <SearchInputField label="Dept. Indent No" name="deptIndentNo" inputData={initialFilterData.deptIndentNo} onChange={filterHandleChange} />
                    <SearchInputField label="Indentor Desig" name="indentorDesignation" inputData={initialFilterData.indentorDesignation} onChange={filterHandleChange} />

                    <SearchInputField label="Indentor Dept" name="indentorDepartment" inputData={initialFilterData.indentorDepartment} onChange={filterHandleChange} />
                    <SearchInputDateField label="Dept. Indent Date" name="deptIndentDate" inputData={initialFilterData.deptIndentDate} onChange={filterHandleChange} col="col-md-4" />
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'indentStatus')}
                        id="indentStatus"
                        name="indentStatus"
                        value={initialFilterData.indentStatus}
                        options={indentStatusOption}
                        label="Status"
                        col="col-md-4"
                    />
                </AdvancedSearchForm>

            </div>
            <h6>Search Results</h6>
            {
                successReponse ? (<div className="alert alert-success" role="alert">
                    <span className="alert-success">{successReponse}
                    </span>
                </div>) : null
            }

            <div className="table-container table-responsive tableReponsivecontainer">


                {recordItems.length > 0 ? (
                    <React.Fragment>
                        <table className="table table-hover tttt tableResponsive">
                            <TableHeader headers={headers} />
                            <tbody>
                                {recordItems.length > 0 && dataRecords.success.content?.map((item, index) => {

                                    return (<React.Fragment key={index}>
                                        <tr>
                                            <td className="text-center">
                                                <td className="d-flex">
                                                    <button
                                                        className="btn btn-default btn-sm mr-2"
                                                        onClick={() => handleEditPopupOpen({
                                                            ...item,
                                                            // indentEdit: item.indentStatus === "T" ? "S" : item.indentStatus
                                                        })}
                                                        aria-label={editPopupVisible ? "Edit item" : "View item"}
                                                    >
                                                        {editPopupVisible ? <FaEdit className="icon" /> : <FaEye className="icon" />}
                                                    </button>

                                                    {item.indentStatus === "T" && (
                                                        <button
                                                            className="btn btn-default btn-sm"
                                                            onClick={() => handleEditPopupOpen({
                                                                ...item,
                                                                indentEdit: item.indentStatus === "T" ? "S" : item.indentStatus
                                                            })}
                                                            aria-label="Edit item"
                                                        >
                                                            <FaEdit className="icon" />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-default btn-sm"
                                                        onClick={() => printReport(item)}
                                                    >
                                                        <FaPrint className="icon" />
                                                    </button>
                                                </td>
                                            </td>

                                            <td className="text-center">
                                                <span className={`btn-default ${item.indentStatus === "A" ? "badge bg-success" :
                                                    item.indentStatus === "R" ? "badge bg-danger" :
                                                        item.indentStatus === "S" ? "badge bg-warning" :
                                                            item.indentStatus === "T" ? "badge bg-info" :
                                                                "badge bg-secondary"
                                                    }`}>
                                                    {
                                                        item.indentStatus === "A" ? "Approved" :
                                                            item.indentStatus === "R" ? "Rejected" :
                                                                item.indentStatus === "S" ? "Routed" :
                                                                    item.indentStatus === "T" ? "Returned" :
                                                                        ""

                                                    }
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                {item.groupNo}/{item.groupName}
                                            </td>
                                            <td className="text-center">
                                            {item.subGroupNo}/{item.subGroupName}
                                            </td>
                                            <TableBodyRow
                                                item={item}
                                                headers={headers}
                                            />
                                        </tr>
                                    </React.Fragment>)

                                })}
                            </tbody>
                        </table>
                    </React.Fragment>

                ) :
                    null

                }

            </div>

            {isDownload && (<SearchLoading />)}

            {dataLoading ? <SearchLoading /> : (!dataLoading && searchResult && !(recordItems.length > 0) && <SearchValidation />)}

            {(totalPageNo > 1 && recordItems.length > 0) && (
                <div className="paginator_container">
                    <Pagination
                        totalCount={totalCount}
                        currentPage={currentPage}
                        totalPages={totalPageNo}
                        handlePageChange={handlePageChange}
                    />
                </div>
            )}



            {(addPopupVisible || editPopupVisible) && (
                <AddEditEntry
                    formData={formData}
                    handleChange={handleAddFormChange}
                    handleSubmit={handleAddSubmit}
                    onClose={handleAddPopupClose}
                    isEdit={editPopupVisible ? true : false}
                    errors={errors}
                    setErrors={setErrors}
                    hasError={hasError}
                    setFormData={setFormData}
                    isLoading={isSubmit}
                    errorMessage={serMessage}
                    successReponse={successReponse}
                />
            )}


        </section>
    );
};
export default Index;
