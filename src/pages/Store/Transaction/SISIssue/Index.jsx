import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb"; 
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow"; 
import { convertDate } from "../../../../utils/helpers";
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper"; 
import { GetTypeReport } from "../../../helperFun";
import { filterRecordData } from "../../../../utils/helper";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";



const Index = () => {
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [totalCount, setTotalCount] = useState(0);
    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [isFilter, setIsFilter] = useState(false);


    //handle searching
    const handleSearchResults = async (p) => {
        setSerMessage('')
        setSearchResult(true)
        const dataInfo = {
            ...(p.sisIssueNo && { sisIssueNo: p.sisIssueNo }),
            ...(p.issueDate && { issueDate: p.issueDate }),
            ...(p.sisReqNo && { sisReqNo: p.sisReqNo }),
            ...(p.depoCode && { depoCode: p.depoCode }),
            ...(p.depoDescription && { depoDescription: p.depoDescription }),
            ...(p.reqDepartment && { reqDepartment: p.reqDepartment }),
            ...(p.departmentName && { departmentName: p.departmentName }),
            pageNo: p.page ? p.page : 0,
            pageSize: 11
        }
        setPagination(dataInfo)
        try {


            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/sis/issue/search/sis-issue' }));
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.content?.length > 0) {
                    setRecordItems(response?.payload?.success?.content)
                    setTotalPagNO(response?.payload?.success?.totalPages)
                    setTotalCount(response?.payload?.success?.totalElements)
                    setIsAdvancedSearch(false)
                } else {
                    setRecordItems([])
                    if (isFilter) { setIsAdvancedSearch(true) }
                }
            }else{ 
                setSerMessage(response?.payload?.Error || 'Unable to filter data.')
            }
        } catch (error) {
            setSerMessage('')
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        }
    }

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


    useEffect(() => {
        setRecordItems([])
        setRecordItems(0)
        setSearchResult(false)
        setFormData(initialData)
        handleSearchResults({})
    }, [])

    const handleAddPopupClose = () => {
        setSuccessReponse('')
        setSerMessage('')
        setAddPopupVisible(false);
        setEditPopupVisible(false);
        setErrors({});
    };


    const handleEditPopupOpen = (item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        handleAddPopupClose()
        setFormData(item)
        setEditPopupVisible(true);
        setAddPopupVisible(false);
    };


    const handleAddPopupOpen = async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        handleAddPopupClose()
        setFormData(initialData)
        setAddPopupVisible(true);
        setEditPopupVisible(false);
    };





    const validateForm = useCallback((callback) => {
        let errors = {};
        if (!formData.sisReqNo) errors.sisReqNo = "Field is required.";
        if (!formData.issueDate) errors.issueDate = "Field is required.";
        if (!formData.issuerDate) errors.issuerDate = "Field is required.";
        if (!formData.storeOfficer) errors.storeOfficer = "Field is required.";
        if (!formData.storeOffiDate) errors.storeOffiDate = "Field No is required.";
        if (!formData.receivedBy) errors.receivedBy = "Field is required.";
        formData?.sisIssueChildList.forEach((item, index) => {
            let itemErrors = {};
            if (!item.issueQtyInNumber) itemErrors.issueQtyInNumber = "Required.";
            if (Object.keys(itemErrors).length > 0) {
                errors[`sisIssueChildList_${index}`] = itemErrors;
            }
        });

        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        if (callback) {
            callback(isValid, errors);
        }
        return isValid;
    }, [formData, setErrors]);




    const handleAddSubmit = useCallback(async (event) => {
        event.preventDefault();
        const dataInfo =
        {
            ...formData,
            issueDate: formData.issueDate,
            issuerDate: formData.issuerDate,
            dateOfReceipt: formData.dateOfReceipt,
            storeOffiDate: formData.storeOffiDate,
            loginId: data?.loginId,

        };

        validateForm(async (isValid, errors) => { 
            if (isValid) {
                let indicatorsPath = '/sis/issue/add/sis-issue';
                if (editPopupVisible) {
                    indicatorsPath = '/sis/issue/update/sis-issue';
                }

                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                     
                    if (submitPostData.fulfilled.match(action)) {
                        handleSearchResults(pagination)
                        if (editPopupVisible) {
                            setSuccessReponse('SIS Issue updated successfully.')
                        } else {
                            setSuccessReponse('SIS Issue created successfully.')
                        }
                        setTimeout(() => {
                            setAddPopupVisible(false);
                            setEditPopupVisible(false);
                        }, 1000);

                    } else {
                        setSerMessage(action?.payload?.error)
                    }
                } catch (error) {
                    setSerMessage(error)
                }  
            } else {
                setSerMessage('Please enter required fields.') 
            }
        });
    }, [formData,data]);






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
                sisreqNo: item.sisReqNo
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


 


    // Filter records 



    const initialValues = {
        sisIssueNo: "",
        issueDate: "",
        sisReqNo: "",
        reqDepartment: "",
        depoCode: "",
        depoDescription: "",
        departmentName: "",
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

    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'SIS Issue' }} />
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
                    <h6>SIS Issue</h6>
                </div>
                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}


                >
                    <SearchInputField label="SIS Issue No" name="sisIssueNo" inputData={initialFilterData.sisIssueNo} onChange={filterHandleChange} />
                    <SearchInputDateField label="Issue Date" name="issueDate" inputData={initialFilterData.issueDate} onChange={filterHandleChange} col="col-md-4" />
                    <SearchInputField label="SIS Req No" name="sisReqNo" inputData={initialFilterData.sisReqNo} onChange={filterHandleChange} />
                    <SearchInputField label="Depo Code" name="depoCode" inputData={initialFilterData.depoCode} onChange={filterHandleChange} />
                    <SearchInputField label="Depo Desc" name="depoDescription" inputData={initialFilterData.depoDescription} onChange={filterHandleChange} />
                    <SearchInputField label="Req Dept" name="reqDepartment" inputData={initialFilterData.reqDepartment} onChange={filterHandleChange} /> 
                    <SearchInputField label="Dept Name" name="departmentName" inputData={initialFilterData.departmentName} onChange={filterHandleChange} /> 

                </AdvancedSearchForm>
            </div>

            <h6>Search Results</h6>
            {
                serMessage && isFilter ? (<div className="alert alert-danger" role="alert">
                    <span className="alert-danger">{serMessage}
                    </span>
                </div>) : null
            }
            {
                successReponse ? (<div className="alert alert-success" role="alert">
                    <span className="alert-success">{successReponse}
                    </span>
                </div>) : null
            }
            <div className="table-container table-responsive tableReponsivecontainer">
                {recordItems?.length > 0 ? (
                    <React.Fragment>
                        <table className="table table-hover tttt tableResponsive">
                            <TableHeader headers={headers} />
                            <tbody>
                                {recordItems?.length > 0 && recordItems?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="d-flex justify-content-center">

                                                <button
                                                    className="btn btn-default btn-sm"
                                                    onClick={() => handleEditPopupOpen(item)}
                                                >
                                                    <FaEdit className="icon" />
                                                </button>
                                                <button
                                                    className="btn btn-default btn-sm"
                                                    onClick={() => printReport(item)}
                                                >
                                                    <FaPrint className="icon" />
                                                </button>
                                            </td>
                                            <TableBodyRow
                                                item={item}
                                                headers={headers}
                                            />
                                        </tr>
                                    </React.Fragment>
                                ))}
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
                <AddEditIndentEntry
                    formData={formData}
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
