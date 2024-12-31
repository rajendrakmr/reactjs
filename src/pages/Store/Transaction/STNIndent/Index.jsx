import React, { useState, useEffect, useCallback } from "react";
import { FaPlus,FaEdit, FaFilter, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb"; 
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow"; 
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
    const { dataRecords, dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);

    const [errors, setErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [isFilter, setIsFilter] = useState(false);

    const handleSearchResults = async (p) => {
        setSearchResult(true)
        setSerMessage('')
        const dataInfo = {
            ...(p.empCode && { empCode: p.empCode }),
            ...(p.stnIndentNo && { stnIndentNo: p.stnIndentNo }),
            ...(p.stnIndentedDate && { stnIndentedDate: p.stnIndentedDate }),
            ...(p.indentingDivision && { indentingDivision: p.indentingDivision }),
            ...(p.supplyingDivision && { supplyingDivision: p.supplyingDivision }),
            ...(p.indentingDivisionName && { indentingDivisionName: p.indentingDivisionName }),
            pageNo: p.page ? p.page : 0,
            pageSize: 14
        }

        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo, indicatorsPath: '/stn/indent/search/stn-indent' }));
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
            } else {
                setSerMessage(response?.payload?.Error || 'Unable to filter data.')
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        } finally {
            if (recordItems?.length > 0) {
                setIsAdvancedSearch(false)
            }
        }
    }

    useEffect(() => {
        setRecordItems([])
        setRecordItems(0)
        setSearchResult(false)
        handleSearchResults({})
    }, [])
 


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





    const handleEditPopupOpen = (item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setFormData(item)
        setEditPopupVisible(true);
        setAddPopupVisible(false); 
    };



    const handleAddPopupOpen = async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setFormData(initialData)
        setShowValidationMessage(false);
        setAddPopupVisible(true);
        setEditPopupVisible(false);
    };

    const handleAddPopupClose = () => {
        setAddPopupVisible(false);
        setEditPopupVisible(false);
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
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
        if (!formData.indentingDivision) errors.indentingDivision = "Field is required.";
        if (!formData.supplyingDivision) errors.supplyingDivision = "Field is required.";
        if (!formData.groupNo) errors.groupNo = "Field is required.";
        if (!formData.subGroupNo) errors.subGroupNo = "Field is required.";
        if (!formData.stnIndentedDate) errors.stnIndentedDate = "Field is required.";

        formData.stnIndentChildList.forEach((item, index) => {
            let itemErrors = {};
            if (!item.itemCode) itemErrors.itemCode = "Field is required.";
            if (!item.reqQtyInNumber) itemErrors.reqQtyInNumber = "Field is required.";
            if (!item.jobCode) itemErrors.jobCode = "Field is required.";
            if (Object.keys(itemErrors).length > 0) {
                errors[`stnIndentChildList_${index}`] = itemErrors;
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
            empCode:data?.NGS,
            stnIndentedBy:data?.loginId,
            loginId: data?.loginId
        };

        validateForm(async (isValid, errors) => {
            if (isValid) {
                let indicatorsPath = '/stn/indent/add/stn-indent';
                if (editPopupVisible) {
                    indicatorsPath = '/stn/indent/update/stn-indent';
                }

                try {

                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                    if (submitPostData.fulfilled.match(action)) {
                        if (action?.payload?.success) {
                            handleSearchResults(pagination)
                            if (editPopupVisible) {
                                setSuccessReponse('STN Indent updated successfully.')
                            } else {
                                setSuccessReponse('STN Indent created successfully.')
                            }
                            setTimeout(() => {
                                setAddPopupVisible(false);
                                setEditPopupVisible(false);
                            }, 1000);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
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






    const initialValues = {
        stnIndentNo: "",
        stnIndentedDate: "",
        empCode: "",
        indentingDivisionName: "",
        indentingDivision: "",
        supplyingDivisionName: "",
        supplyingDivision: "",
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
                stnindentNo: item.stnIndentNo
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







    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'STN Indent' }} />
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
                    <h6>STN Indent</h6>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}


                >
                    <SearchInputField label="STN Indent NO" name="stnIndentNo" inputData={initialFilterData.stnIndentNo} onChange={filterHandleChange} />
                    <SearchInputDateField label="STN Indent Date" name="stnIndentedDate" inputData={initialFilterData.stnIndentedDate} onChange={filterHandleChange} col="col-md-4" />
                    <SearchInputField label="Indent Div." name="indentingDivision" inputData={initialFilterData.indentingDivision} onChange={filterHandleChange} />
                    <SearchInputField label="Indent Div. Name" name="indentingDivisionName" inputData={initialFilterData.indentingDivisionName} onChange={filterHandleChange} />
                    <SearchInputField label="Supply Div." name="supplyingDivision" inputData={initialFilterData.supplyingDivision} onChange={filterHandleChange} />
                    <SearchInputField label="Supply Div. Name" name="supplyingDivisionName" inputData={initialFilterData.supplyingDivisionName} onChange={filterHandleChange} />
                    <SearchInputField label="STN Indent By" name="empCode" type="number" max="10" inputData={initialFilterData.empCode} onChange={filterHandleChange} />


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
                {recordItems.length > 0 ? (
                    <React.Fragment>
                        <table className="table table-hover tttt tableResponsive">
                            <TableHeader headers={headers} />
                            <tbody>
                                {recordItems.length > 0 && dataRecords.success.content?.map((item, index) => (
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








            {
                (addPopupVisible || editPopupVisible) && (
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
                )
            }


        </section >
    );
};
export default Index;
