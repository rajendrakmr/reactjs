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
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import { filterRecordData } from "../../../../utils/helper";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";
import { GetConnection } from "./apiService";




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
    const [connectionOptions, setConnectionOptions] = useState([]);


    useEffect(() => {
        GetConnection(dispatch, setConnectionOptions)
    }, []);



    const currentUser = getCookie('userInfo');


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
            ...(p.connectionTypeCode && { connectionTypeCode: p.connectionTypeCode }),
            ...(p.readingTakenBy && { readingTakenBy: p.readingTakenBy }),
            pageNo: p.page ? p.page : 0,
            pageSize: 8
        }
        setPagination(dataInfo)


        try {

            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/periodic-reading/search' }));
            
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.content?.length > 0) {
                    setRecordItems(response?.payload?.success?.content)
                    setTotalPagNO(response?.payload?.success?.totalPages)
                    setTotalCount(response?.payload?.success?.totalElements)
                    setIsAdvancedSearch(false)
                }
               
            } else { 
                setRecordItems([])
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
        if (!formData.connectionTypeCode) errors.connectionTypeCode = "Field is required.";
        if (!formData.readingDate) errors.readingDate = "Field is required.";
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
            customerId: formData?.customerId,
            readingNgs: currentUser?.NGS,
            connectionTypeCode: formData?.connectionTypeCode,
            meterNo: formData?.meterNo,
            readingDate: formData?.readingDate,
            lastReading: formData?.lastReading,
            currentReading: formData?.currentReading,
            arrearAmt: formData?.arrearAmt,
            refundAmt: formData?.refundAmt,
            noOfMonths: formData?.noOfMonths,
            monthsInChar: formData?.monthsInChar,
            remarks: formData?.remarks,
            loginId: data?.loginId,

        };

        validateForm(async (isValid, errors) => {
            if (isValid) {
                let indicatorsPath = '/periodic-reading/add';
                if (editPopupVisible) {
                    dataInfo.srlNo = formData.srlNo
                    indicatorsPath = '/periodic-reading/update';
                }

                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))

                    if (submitPostData.fulfilled.match(action)) {
                        handleSearchResults(pagination)
                        if (editPopupVisible) {
                            setSuccessReponse('Periodic Meter Reading updated successfully.')
                        } else {
                            setSuccessReponse('Periodic Meter Reading created successfully.')
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
    }, [formData, data]);

    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);


    /**FITER VALUES */
    const initialValues = {
        customerId: "",
        customerName: "",
        meterNo: "",
        connectionTypeCode: "",
        readingTakenBy: "",
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
            <BreadCrumb item={{ label: 'Invoicing-Water', 'sub_label': 'Transaction', active: true, current: 'Periodic Meter Reading' }} />
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
                    <h5>Periodic Meter Reading</h5>
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
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'connectionTypeCode')}
                        id="connectionTypeCode"
                        name="connectionTypeCode"
                        value={initialFilterData.connectionTypeCode}
                        options={connectionOptions}
                        label="Connection Type"
                        col="col-md-4"
                    />
                    <SearchInputDateField label="Reading Date" name="readingDate" inputData={initialFilterData.readingDate} onChange={filterHandleChange} col="col-md-4" />
                    <SearchInputField label="Meter NO" name="meterNo" inputData={initialFilterData.meterNo} onChange={filterHandleChange} />
                    <SearchInputField label="Reading Taken By" name="readingTakenBy" inputData={initialFilterData.readingTakenBy} onChange={filterHandleChange} />



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

            {/* isFetchComplete
            {(dataLoading && !isFetchComplete) ? <SearchLoading /> : (!dataLoading && searchResult && !(recordItems.length > 0) && <SearchValidation />)} */}

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
