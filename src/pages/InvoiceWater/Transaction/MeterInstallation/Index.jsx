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
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import { filterRecordData } from "../../../../utils/helper";
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
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const [isFetchComplete, setIsFetchComplete] = useState(false);

    const handleSearchResults = async (p) => {
        setSearchResult(true)
        setIsFetchComplete(false)

        const dataInfo = {
            ...(p.customerId && { customerId: p.customerId }),
            ...(p.customerName && { customerName: p.customerName }),
            ...(p.meterNo && { meterNo: p.meterNo }),
            ...(p.installationDate && { installationDate: p.installationDate }),
            ...(p.meterMake && { meterMake: p.meterMake }), 
            pageNo: p.page ? p.page : 0,
            pageSize: 8
        }
        setPagination(dataInfo)


        try {

            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/meter/search' }));
            
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.length > 0) {
                    setRecordItems(response?.payload?.success)
                    setTotalPagNO(response?.payload?.success?.totalPages)
                    setTotalCount(response?.payload?.success?.totalElements)
                    setIsAdvancedSearch(false)
                }
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        } finally {
            setIsFetchComplete(true)
            setSuccessReponse('')
            setSerMessage('')
            if (recordItems?.length > 0) {
                setIsAdvancedSearch(false)
            }
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
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
        if (!formData.customerId) errors.customerId = "Field is required."; 
        if (!formData.installationDate) errors.installationDate = "Field is required.";  
        if (!formData.meterNo) errors.meterNo = "Field is required.";  

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
                 

                try {
                    if (editPopupVisible) {
                        const indicatorsPath = '/meter/update';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                     
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Meter installation updated successfully.')
                            setEditPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = '/meter/add';
                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                       
                        if (submitPostData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Meter installation created successfully.')
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




    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);







    /**FITER VALUES */
    const initialValues = { 
        customerId: "",
        customerName: "",
        meterNo: "",
        installationDate: "",
        meterMake: "",  
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

    const handleChangeSelect = useCallback((e, field) => {
        const { value } = e;
        setInitialFilterData((prevFormData) => ({
            ...prevFormData,
            [field]: value
        }));
    }, []);


    return (
        <section>
            <BreadCrumb item={{ label: 'Invoicing-Water', 'sub_label': 'Transaction', active: true, current: 'Meter Installation' }} />
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
                    <h6>Meter Installation</h6>
                </div> 
                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                > 
                    <SearchInputField label="Customer ID" name="customerId" inputData={initialFilterData.customerId} onChange={filterHandleChange} />
                    <SearchInputField label="Customer Name" name="customerName" inputData={initialFilterData.customerName} onChange={filterHandleChange} />
                    
                    <SearchInputField label="Meter NO" name="meterNo" inputData={initialFilterData.meterNo} onChange={filterHandleChange} type="number" max="20" />
                    <SearchInputField label="Meter Make" name="meterMake" inputData={initialFilterData.meterMake} onChange={filterHandleChange} />
                    <SearchInputDateField label="Installation Date" name="installationDate" inputData={initialFilterData.installationDate} onChange={filterHandleChange} col="col-md-4"/>
                     
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
            {!isFetchComplete ? (<SearchLoading /> ) : ( !dataLoading && searchResult && recordItems.length === 0 && <SearchValidation />)}

            {/* {dataLoading ? <SearchLoading /> : (!dataLoading && searchResult && !(recordItems.length > 0) && <SearchValidation />)} */}

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
