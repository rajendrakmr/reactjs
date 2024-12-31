import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaSyncAlt, FaEdit, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import { Formik, Form } from "formik";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
// import SearchInputField from "../../../../components/searchComponent/SearchInputField";
import SearchSelectField from "../../../../components/searchComponent/SearchSelectField";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import { filterRecordData } from "../../../../utils/helper";


const Index = () => {
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [totalCount, setTotalCount] = useState(0);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);
    const [dcOptions, setDCOptions] = useState([]);
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

    //handle searching
    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.depoCode && { depoCode: p.depoCode }),
            ...(p.itemCode && { itemCode: p.itemCode }),
            ...(p.debitCreditFlag && { debitCreditFlag: p.debitCreditFlag }),
            pageNo: p.page || 0,
            pageSize: 15
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/stock/search' }));
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
        setDCOptions([
            { value: '', label: 'ALL' },
            { value: 'C', label: 'C - Credit' },
            { value: 'D', label: 'D - Debit' }
        ])
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
        setShowValidationMessage(false);
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
        if (!formData.depoCode) errors.depoCode = "Field is required.";
        if (!formData.itemCode) errors.itemCode = "Field is required.";
        if (!formData.adjustedQty) errors.adjustedQty = "Field is required.";
        if (!formData.debitCreditFlag) errors.debitCreditFlag = "Field is required.";


        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;
        if (callback) {
            callback(isValid, errors);
        }

        return isValid;
    };




    const handleAddSubmit = useCallback(async (event) => {
        event.preventDefault();
        validateForm(async (isValid, errors) => {
            if (isValid) {
                try {
                    if (editPopupVisible) {
                        const dataInfo =
                        {
                            ...formData,
                            tranType: editPopupVisible ? "U" : "I",
                            ModifiedBy: data?.loginId

                        };
                        const indicatorsPath = '/stock/updated';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse(action?.payload?.success)
                            setTimeout(() => {
                                setAddPopupVisible(false);
                                setEditPopupVisible(false);
                            }, 1000);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const dataInfo =
                        {
                            ...formData,
                            tranType: editPopupVisible ? "U" : "I",
                            loginId: data?.loginId

                        };
                        const indicatorsPath = '/stock/created';
                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPostData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Data created successfully.')
                            setTimeout(() => {
                                setAddPopupVisible(false);
                                setEditPopupVisible(false);
                            }, 1000);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    }


                } catch (error) {
                    setSerMessage(error)
                } finally {
                    setTimeout(() => {
                        setSuccessReponse('')
                        setSerMessage('')
                    }, 7000);
                }
            } else {
                setSerMessage('Please enter required fields.')
                setTimeout(() => {
                    setSuccessReponse('')
                    setSerMessage('')
                }, 2000);
            }
        });
    }, [formData, data]);




    const initialValues = {
        debitCreditFlag: "",
        depoCode: "", 
        itemCode: "", 
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

    const handleChangeSelect = useCallback((e, field) => {
        const { value } = e;
        setInitialFilterData((prevFormData) => ({
            ...prevFormData,
            [field]: value
        }));
    }, []);



    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Stock Adjustment Entry' }} />
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
                    <h6>Stock Adjustment Entry</h6>
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
                    <SearchInputField label="Item Code" name="itemCode" inputData={initialFilterData.itemCode} onChange={filterHandleChange} />
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'debitCreditFlag')}
                        id="debitCreditFlag"
                        name="debitCreditFlag"
                        value={initialFilterData.debitCreditFlag}
                        options={dcOptions}
                        label="Debit/Credit"
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
            {
                serMessage ? (<div className="alert alert-danger" role="alert">
                    <span className="alert-danger">{serMessage}
                    </span>
                </div>) : null
            }
            <div>
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
                                                <td className="text-center">
                                                    {item.binNumber}-{item.locationBinDesc}
                                                </td>
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
