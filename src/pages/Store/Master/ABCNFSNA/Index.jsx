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
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import { filterRecordData } from "../../../../utils/helper";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";


const Index = () => {
    const createdBy = getCookie('userInfo')?.loginId;
    const dispatch = useDispatch();
    const { dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [analysisHeadOption, setAnalysisHeadOption] = useState([]);
    const [analysisTypeOption, setAnalysisTypeOption] = useState([]);
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
            ...(p.analysisHead && { analysisHead: p.analysisHead }),
            ...(p.analysisType && { analysisType: p.analysisType }),
            pageNo: p.page ? p.page : 0,
            pageSize: 10
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/api/orgThresholdValues/search' }));
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
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        }finally{
            setIsFetchComplete(true) 
        }
    }




    useEffect(() => {
        setRecordItems([])
        setRecordItems(0)
        setSearchResult(false)
        handleSearchResults({})
        setAnalysisHeadOption([{ value: 'ABC', label: 'ABC' }, { value: 'FSN', label: 'FSN' }])
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
        if (!formData.analysisHead) errors.analysisHead = "Analysis Head is required.";
        if (!formData.analysisType) errors.analysisType = "Analysis Type is required.";
        if (!formData.desc) errors.desc = "Description is required.";
        if (!formData.paramName) errors.paramName = "Param Name is required.";
        if (!formData.paramValueInPer) errors.paramValueInPer = "Parameter Value in % required.";

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
            loginId: createdBy,
            ...formData,
        };

        validateForm(async (isValid, errors) => {
            if (isValid) {

                try {

                    if (editPopupVisible) {
                        const indicatorsPath = '/api/orgThresholdValues/update';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Data updated successfully.')
                            setEditPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = '/api/orgThresholdValues/add';
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
    }, [formData]);






    const initialValues = {
        analysisType: "",
        analysisHead: "",
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
        if (field == "analysisHead") {
            if (value == "ABC") {
                setAnalysisTypeOption([{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }])
            } else {
                setAnalysisTypeOption([{ value: 'F', label: 'F' }, { value: 'S', label: 'S' }, { value: 'N', label: 'N' }])
            }
        }
        setInitialFilterData((prevFormData) => ({
            ...prevFormData,
            [field]: value
        }));
    }, []);

    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);




    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Master', active: true, current: 'ABC and FSN Analysis' }} />
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
                    <h5>ABC and FSN Analysis</h5>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'analysisHead')}
                        id="analysisHead"
                        name="analysisHead"
                        value={initialFilterData.analysisHead}
                        options={analysisHeadOption}
                        label="Analysis Head"
                        col="col-md-4"
                    />
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'analysisType')}
                        id="analysisType"
                        name="analysisType"
                        value={initialFilterData.analysisType}
                        options={analysisTypeOption}
                        label="Analysis Head"
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
                    analysisHeadOption={analysisHeadOption}
                />
            )}


        </section>
    );
};
export default Index;
