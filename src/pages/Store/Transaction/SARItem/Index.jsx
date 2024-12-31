import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { getCookie } from "../../../../utils/cookieService";
import { convertDate } from "../../../../utils/helpers";
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import { filterRecordData } from "../../../../utils/helper";



const Index = () => {
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const createdBy = getCookie('userInfo')?.loginId;
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [totalCount, setTotalCount] = useState(0); 
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


    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.supplyNo && { supplyNo: p.supplyNo }),
            ...(p.inspectionNo && { inspectionNo: p.inspectionNo }),
            ...(p.supplyDate && { supplyDate: p.claimDate }),
            ...(p.claimNo && { claimNo: p.claimNo }),
            pageNo: p.page || 0,
            pageSize: 8
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/SupplyRejectedItem/search' }));
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.content?.length > 0) {
                    setRecordItems(response?.payload?.success?.content)
                    setTotalPagNO(response?.payload?.success?.totalPages)
                    setTotalCount(response?.payload?.success?.totalElements)
                    setIsAdvancedSearch(false)
                }else{
                    setRecordItems([])
                    if (isFilter) { setIsAdvancedSearch(true) }
                }
            }
        } catch (error) {
            console.log(error)
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
        setFormData({
            ...item,
            checkItemQty: 0,
            checksetItemQty: item.qtySupplied
        })
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
        setSuccessReponse('')
        setSerMessage('')
        setErrors({}); 
        setAddPopupVisible(false);
        setEditPopupVisible(false);  
    };



    const validateForm = (callback) => {
        let errors = {};
        if (!formData.supplyDate) errors.supplyDate = "Field is required.";
        if (!formData.claimNo) errors.claimNo = "Field is required.";
        if (!formData.qtySupplied) errors.qtySupplied = "Field is required.";

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
                let indicatorsPath = '/SupplyRejectedItem/add';
                if (editPopupVisible) {
                    indicatorsPath = '/SupplyRejectedItem/update';
                }

                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                    if (submitPostData.fulfilled.match(action)) {
                        handleSearchResults(pagination)
                        if (editPopupVisible) {
                            setSuccessReponse('Data updated successfully.')
                        } else {
                            setSuccessReponse('Data created successfully.')
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




    const initialValues = {
        claimNo: "",
        inspectionNo: "",
        supplyDate: "",
        supplyNo: "",
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

    const handleChangeSelect = async (e, setValue, field) => {
        const { value } = e;
        setValue(field, value);
    };


    return (
        <section>
            <div className="col-12 mt-5">

                <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Supply Against Rejected Item' }} />
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
                        <h5>Supply Against Rejected Item</h5>
                    </div>

                    <AdvancedSearchForm
                        isAdvancedSearch={isAdvancedSearch}
                        filterHandleChange={filterHandleChange}
                        resetSearch={resetSearch}
                        handleSearch={handleSearch}
                        isFilter={isFilter}
                        dataLoading={dataLoading}
                    >
                        <SearchInputField label="Supply No" name="supplyNo" inputData={initialFilterData.supplyNo} onChange={filterHandleChange} />
                        <SearchInputField label="Claim No" name="claimNo" inputData={initialFilterData.claimNo} onChange={filterHandleChange} />
                        <SearchInputDateField label="Supply Date" name="supplyDate" inputData={initialFilterData.supplyDate} onChange={filterHandleChange} />
                        <SearchInputField label="Inspection No" name="inspectionNo" inputData={initialFilterData.inspectionNo} onChange={filterHandleChange} />

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

            </div>




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
