import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaSyncAlt, FaEdit, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";

import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow"; 
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import { filterRecordData } from "../../../../utils/helper";


const Index = () => {
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [showValidationMessage, setShowValidationMessage] = useState(false);

    const [analysisHeadOption, setAnalysisHeadOption] = useState([]); 
    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);



    const [errors, setErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    const [isFetchComplete, setIsFetchComplete] = useState(false);
 
    //handle searching
    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.depoCode && { depoCode: p.depoCode }),
            ...(p.depoDesc && { depoDesc: p.depoDesc }),
            ...(p.itemCode && { itemCode: p.itemCode }),
            ...(p.itemDesc && { itemDesc: p.itemDesc }),
            ...(p.aliasDepoCode && { aliasDepoCode: p.aliasDepoCode }),
            ...(p.aliasItemDesc && { aliasItemDesc: p.aliasItemDesc }),
            ...(p.aliasDepoDesc && { aliasDepoDesc: p.aliasDepoDesc }),
            ...(p.aliasItemCode && { aliasItemCode: p.aliasItemCode }),
            pageNo: p.page ? p.page : 0,
            pageSize: 10
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/api/item-alias/search' }));
            
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (searchPostGetAction.fulfilled.match(response) && response?.payload?.success?.content.length > 0) {
                setRecordItems(response?.payload.success.content)
                setTotalPagNO(response?.payload?.success?.content.totalPages)
                setIsAdvancedSearch(false)
            } else {
                setRecordItems([])
                if (isFilter) { setIsAdvancedSearch(true) }
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        }finally{
            setIsFetchComplete(true) 
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
        handleSearchResults({})
        setAnalysisHeadOption([{ value: 'ABC', label: 'ABC' }, { value: 'FSN', label: 'FSN' }])
    }, [])




    const handleEditPopupOpen = (item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({}); 
        setFormData(item)
        setEditPopupVisible(true);
    };


    const handleAddPopupOpen = async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({}); 
        setFormData(initialData) 
        setAddPopupVisible(true);
        
    };

    const handleAddPopupClose = () => {
        setAddPopupVisible(false);
        setEditPopupVisible(false);
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setSuccessReponse('')
        setSerMessage('')
    };



    const validateForm = (callback) => {
        let errors = {};
        if (!formData.depoCode) errors.depoCode = "DepoCode is required.";
        if (!formData.depoDesc) errors.depoDesc = "DepoName is required.";
        if (!formData.itemCode) errors.itemCode = "itemCode is required.";
        if (!formData.itemDesc) errors.itemDesc = "itemDesc is required.";
        if (!formData.aliasDepoCode) errors.aliasDepoCode = "Alias Depo Code is required.";
        if (!formData.aliasDepoDesc) errors.aliasDepoDesc = "aliasDepoDesc is required.";
        if (!formData.aliasItemCode) errors.aliasItemCode = "aliasItemCode is required.";
        if (!formData.aliasItemDesc) errors.aliasItemDesc = "aliasItemDesc is required.";
        if (!formData.activeFlag) errors.activeFlag = "activeFlag is required.";
        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        if (callback) {
            callback(isValid, errors);
        }

        return isValid;
    };




    const handleAddSubmit = useCallback(async (event) => {
        event.preventDefault();
        const dataInfo =
        {
            ...formData,
            loginId: data?.loginId,
        };
        if (editPopupVisible) {
            dataInfo.isActive = formData.activeFlag
        }
        validateForm(async (isValid, errors) => {
            if (isValid) {

                try {

                    if (editPopupVisible) {
                        const indicatorsPath = '/api/item-alias/update';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Data updated successfully.')
                            setEditPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = '/api/item-alias/add';
                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPostData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Data created successfully.')
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
                setTimeout(() => {
                    setSuccessReponse('')
                    setSerMessage('')
                }, 5000);
            }
        });
    }, [formData,data]);




    const initialValues = {
        depoCode: "",
        depoDesc: "",
        itemCode: "",
        itemDesc: "",
        aliasDepoCode: "",
        aliasDepoName: "",
        aliasItemCode: "",
        aliasItemDesc: ""
    };


    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);


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
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Master', active: true, current: 'Item Alias' }} />
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
                    <h5>Item Alias</h5>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >
                    <SearchInputField label="Depot Code" name="depoCode" inputData={initialFilterData.depoCode} onChange={filterHandleChange} />
                    <SearchInputField label="Depot Desc" name="depoDesc" inputData={initialFilterData.depoDesc} onChange={filterHandleChange} />
                    <SearchInputField label="Item Code" name="itemCode" inputData={initialFilterData.itemCode} onChange={filterHandleChange} />
                    <SearchInputField label="Item Desc" name="itemDesc" inputData={initialFilterData.itemDesc} onChange={filterHandleChange} />

                    <SearchInputField label="Alias Depot Code" name="aliasDepoCode" inputData={initialFilterData.aliasDepoCode} onChange={filterHandleChange} />
                    <SearchInputField label="Alias Depot Desc" name="aliasDepoDesc" inputData={initialFilterData.aliasDepoDesc} onChange={filterHandleChange} />
                    <SearchInputField label="Alias Item Code" name="aliasItemCode" inputData={initialFilterData.aliasItemCode} onChange={filterHandleChange} />
                    <SearchInputField label="Alias Item Desc" name="aliasItemDesc" inputData={initialFilterData.aliasItemDesc} onChange={filterHandleChange} />



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
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-default btn-sm"
                                                    onClick={() => handleEditPopupOpen(item)}
                                                >
                                                    <FaEdit className="icon mr-2" />
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <span
                                                    className={item.activeFlag === "Y" ? "badge bg-success" : "badge bg-danger"}
                                                >
                                                    {item.activeFlag === "Y" ? "Active" : "Inactive"}
                                                </span>
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

                        {totalPageNo > 1 && (
                            <div className="paginator_container">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPageNo}
                                    handlePageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </React.Fragment>

                ) :
                    null
                }

            </div>
            {!isFetchComplete ? (<SearchLoading /> ) : ( !dataLoading && searchResult && recordItems.length === 0 && <SearchValidation />)}

            {/* {dataLoading ? <SearchLoading /> : (!dataLoading && searchResult && !(recordItems.length > 0) && <SearchValidation />)} */}


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
                    analysisHeadOption={analysisHeadOption}
                />
            )}


        </section>
    );
};
export default Index;
