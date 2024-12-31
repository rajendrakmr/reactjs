import React, { useEffect, useState, useCallback } from "react";
import { FaPlus,  FaEdit, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb"; 
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow"; 
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import { filterRecordData } from "../../../../utils/helper";



const Index = () => {
    const { data } = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 }); 



    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);

    const [isFilter, setIsFilter] = useState(false);





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
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [totalCount, setTotalCount] = useState(0);

    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.depoCode && { depoCode: p.depoCode }),
            ...(p.challanIssueNo && { challanIssueNo: p.challanIssueNo }),
            ...(p.deptChallanNo && { deptChallanNo: p.deptChallanNo }),
            ...(p.challanNo && { challanNo: p.challanNo }),
            ...(p.challanIssueDate && { challanIssueDate: p.challanIssueDate }),
            pageNo: p.page ? p.page : 0,
            pageSize: 8
        }
        setPagination(dataInfo)
        try {


            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/challan/issue/search' }));
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
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
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
        setFormData(item)
        setAddPopupVisible(false);
        setEditPopupVisible(true);
    };


    const handleAddPopupOpen = async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setFormData({...initialData,issuerName:data?.empName}) 
        setAddPopupVisible(true);
        setEditPopupVisible(false);
    };

    const handleAddPopupClose = () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setAddPopupVisible(false);
        setEditPopupVisible(false);
        
    };



    const validateForm = (callback) => {
        let errors = {};
        if (!formData.challanIssueDate) errors.challanIssueDate = "Field is required.";
        if (!formData.challanNo) errors.challanNo = "Field is required.";
        if (!formData.issuerDate) errors.issuerDate = "Field is required.";
        if (!formData.storeOfficer) errors.storeOfficer = "Field is required.";
        if (!formData.storeOffiDate) errors.storeOffiDate = "Field is required.";
        if (!formData.receivedBy) errors.receivedBy = "Field is required.";
        formData.challanIssueChildren.forEach((item, index) => {
            let itemErrors = {};
            if (!item.itemCode) itemErrors.itemCode = "field is required.";
            if (!item.challanIssueQty) itemErrors.challanIssueQty = "field is required.";
            if (Object.keys(itemErrors).length > 0) {
                errors[`challanIssueChildren_${index}`] = itemErrors;
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
        const dataInfo =
        {
            ...formData,  
            loginId: data?.loginId, 

        };

        validateForm(async (isValid, errors) => {
            if (isValid) {
                let indicatorsPath = '/challan/issue/add';
                if (editPopupVisible) {
                    indicatorsPath = '/challan/issue/update';
                }

                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                    
                    if (submitPostData.fulfilled.match(action)) {
                        handleSearchResults(pagination)
                        if (editPopupVisible) {
                            setSuccessReponse('Advanced SIS updated successfully.')
                        } else {
                            setSuccessReponse('Advanced SIS created successfully.')
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




    /**FITER VALUES */
    const initialValues = {
        deptIndentDate: "",
        challanIssueNo: "",
        challanIssueDate: "",
        challanNo: "",
        deptChallanNo: "",
        depoCode: "",
        depoDesc: "",
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
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Advanced SIS' }} />
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
                    <h5>Advanced SIS</h5>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >

                    <SearchInputField label="Advanced SIS No" name="challanIssueNo" inputData={initialFilterData.challanIssueNo} onChange={filterHandleChange} />
                    <SearchInputField label="Challan No" name="challanNo" inputData={initialFilterData.challanNo} onChange={filterHandleChange} />
                    <SearchInputField label="Dept. Challan No" name="deptChallanNo" inputData={initialFilterData.deptChallanNo} onChange={filterHandleChange} />
                    <SearchInputField label="Depot Code" name="depoCode" inputData={initialFilterData.depoCode} onChange={filterHandleChange} />

                    <SearchInputField label="Depo Desc" name="depoDesc" inputData={initialFilterData.depoDesc} onChange={filterHandleChange} />
                    <SearchInputDateField label="Advanced SIS Date" col="col-md-4" name="deptIndentDate" inputData={initialFilterData.deptIndentDate} onChange={filterHandleChange} />

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
                                            <td>
                                                <button
                                                    className="btn btn-default btn-sm"
                                                    onClick={() => handleEditPopupOpen(item)}
                                                >
                                                    <FaEdit className="icon mr-2" />
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
