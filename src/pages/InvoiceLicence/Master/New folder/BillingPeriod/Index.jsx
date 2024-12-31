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
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import { filterRecordData } from "../../../../utils/helper";
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
    const [isFetchComplete, setIsFetchComplete] = useState(false);

    //handle searching
    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.billPeriodName && { billPeriodName: p.billPeriodName })
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/billing-period/search' }));
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (searchPostGetAction.fulfilled.match(response) && response?.payload?.success.length > 0) {
                setRecordItems(response?.payload.success)
                setTotalPagNO(response?.payload?.success?.totalPages)
                setIsAdvancedSearch(false)
            } else {
                setRecordItems([])
                if (isFilter) { setIsAdvancedSearch(true) }
            }
        } catch (error) {
        }finally{
            setIsFetchComplete(true)
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
    };



    const validateForm = (callback) => {
        let errors = {};
        if (!formData.billPeriodName) errors.billPeriodName = "Field is required.";
       
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
            let indicatorsPath = '/billing-period/add';
            if (editPopupVisible) {
                indicatorsPath = '/billing-period/update';
            }
            if (isValid) {

                try {



                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))

                    if (submitPostData.fulfilled.match(action)) {
                        if (action?.payload?.success) {
                            handleSearchResults(pagination)
                            if (editPopupVisible) {
                                setSuccessReponse('Billing Period updated successfully.')
                            } else {
                                setSuccessReponse('Billing Period save successfully.')
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
                setTimeout(() => {
                    setSuccessReponse('')
                    setSerMessage('')
                }, 5000);
            }
        });
    }, [formData, data]);






    const initialValues = {
        billPeriodName: "",
        // billPeriodCode: ""
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



    return (
        <section>
            <BreadCrumb item={{ label: 'Invoicing - Water', 'sub_label': 'Master', active: true, current: 'Billing Period Master' }} />
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
                    <h5>Billing Period Master</h5>
                </div>
                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >
                   
                    <SearchInputField label="Billing Period" name="billPeriodName" inputData={initialFilterData.billPeriodName} onChange={filterHandleChange} />
                    {/* <SearchInputDateField label="Supply Date" name="supplyDate" inputData={initialFilterData.supplyDate} onChange={filterHandleChange} />  */}

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
                                                    className={item.isActive === "Y" ? "badge bg-success" : "badge bg-danger"}
                                                >
                                                    {item.isActive === "Y" ? "Active" : "Inactive"}
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
                />
            )}


        </section>
    );
};
export default Index;
