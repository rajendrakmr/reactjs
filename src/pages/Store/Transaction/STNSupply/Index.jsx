import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb"; 
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { changeKeyName, headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow"; 
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import { GetTypeReport } from "../../../helperFun";
import { filterRecordData } from "../../../../utils/helper";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";



const Index = () => {
    const { data } = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 }); 
    const [formData, setFormData] = useState({});
    const [totalCount, setTotalCount] = useState(0);


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
            ...(p.stnSupplyNo && { stnSupplyNo: p.stnSupplyNo }),
            ...(p.stnSupplyDate && { stnSupplyDate: p.stnSupplyDate }),
            ...(p.stnIndentNo && { stnIndentNo: p.stnIndentNo }),
            ...(p.indentingDivision && { indentingDivision: p.indentingDivision }),
            ...(p.indentingDivisionName && { indentingDivisionName: p.indentingDivisionName }),
            ...(p.supplyingDivision && { supplyingDivision: p.supplyingDivision }),
            ...(p.departmentName && { departmentName: p.departmentName }),
            ...(p.stnIssuedByEmpCode && { stnIssuedByEmpCode: p.stnIssuedByEmpCode }),
            pageNo: p.page ? p.page : 0,
            pageSize: 8
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/stn/supply/search/stn' }));
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
        setFormData(initialData)
        handleSearchResults({})
    }, [])




    const handleEditPopupOpen = (item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        const data = changeKeyName(item)
        setFormData(data)
        setAddPopupVisible(false);
        setEditPopupVisible(true);
    };


    const handleAddPopupOpen = async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setFormData(initialData) 
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



    const validateForm = useCallback((callback) => {
        let errors = {};
        if (!formData.stnIndentNo) errors.stnIndentNo = "Field is required.";
        if (!formData.stnIssuedDate) errors.stnIssuedDate = "Field is required.";
        if (!formData.stnSupplyDate) errors.stnSupplyDate = "Field is required.";
        if (!formData.priceStoreLedgerIPostDate) errors.priceStoreLedgerIPostDate = "Field is required.";
        if (!formData.stnReceivedBy) errors.stnReceivedBy = "Field is required.";
        if (!formData.stnReceivedDate) errors.stnReceivedDate = "Field is required.";
        if (!formData.priceStoreLedgerRPostBy) errors.priceStoreLedgerRPostBy = "Field is required.";
        if (!formData.priceStoreLedgerIPostBy) errors.priceStoreLedgerIPostBy = "Field is required.";
        if (!formData.priceStoreLedgerRPostDate) errors.priceStoreLedgerRPostDate = "Field is required.";

        formData?.stnSupplyChildList.forEach((item, index) => {
            let itemErrors = {};
            if (!item.issueQtyInNumber) itemErrors.issueQtyInNumber = "Required.";
            if (Object.keys(itemErrors).length > 0) {
                errors[`stnSupplyChildList_${index}`] = itemErrors;
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
            stnIssuedBy: data?.loginId,
            loginId: data?.loginId
        };
        validateForm(async (isValid, errors) => { 
            if (isValid) {
                try {
                    if (editPopupVisible) {
                        const indicatorsPath = '/stn/supply/update/stn';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('STN Supply updated successfully.')
                            setEditPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = '/stn/supply/add/stn';
                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPostData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('STN Supply created successfully.')
                            setAddPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }

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
        stnSupplyNo: "",
        stnSupplyDate: "",
        stnIndentNo: "",
        indentingDivision: "",
        indentingDivisionName: "",
        supplyingDivision: "",
        supplyingDivisionName: "",
        stnIssuedByEmpCode: "",
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
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'STN Supply' }} />
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
                    <h6>STN Supply</h6>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}


                >
                    <SearchInputField label="STN Supply No" name="stnSupplyNo" inputData={initialFilterData.stnSupplyNo} onChange={filterHandleChange} />
                    <SearchInputDateField label="STN Supply Date" name="stnSupplyDate" inputData={initialFilterData.stnSupplyDate} onChange={filterHandleChange} col="col-md-4" />
                    <SearchInputField label="STN Indent No" name="stnIndentNo" inputData={initialFilterData.stnIndentNo} onChange={filterHandleChange} />
                    <SearchInputField label="Indent Div" name="indentingDivision" inputData={initialFilterData.indentingDivision} onChange={filterHandleChange} />
                    <SearchInputField label="Indent Div Name" name="indentingDivisionName" inputData={initialFilterData.indentingDivisionName} onChange={filterHandleChange} />
                    <SearchInputField label="Supply Div" name="supplyingDivision" inputData={initialFilterData.supplyingDivision} onChange={filterHandleChange} />
                    <SearchInputField label="Supply Div Name" name="supplyingDivisionName" inputData={initialFilterData.supplyingDivisionName} onChange={filterHandleChange} />
                    <SearchInputField label="STN Issued By" name="stnIssuedByEmpCode" inputData={initialFilterData.stnIssuedByEmpCode} onChange={filterHandleChange} />
                     

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
