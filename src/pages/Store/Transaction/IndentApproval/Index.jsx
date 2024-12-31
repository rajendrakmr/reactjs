import React, { useState, useEffect, useCallback } from "react";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { getCookie } from "../../../../utils/cookieService";
import { searchPostGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
import ConfirmationModal from "./ConfirmationModal";
import { apAuth } from "./apiService";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";



const Index = () => {

    const { data } = useSelector((state) => state.auth);
    const createdBy = getCookie('userInfo')?.loginId;
   
    const dispatch = useDispatch();
    const { dataRecords, dataLoading, isSubmit } = useSelector((state) => state.commonApi);
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
    const [authData, setAuthData] = useState({});

    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.indentStatus && { indentStatus: p.indentStatus }),
            loginId: createdBy
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo, indicatorsPath: '/indent/get/routing-aproval' }));
            if (searchPostGetAction.fulfilled.match(response) && response?.payload?.Success?.length > 0) {
                setRecordItems(response.payload.Success)
                setIsAdvancedSearch(false)
            } else {
                setRecordItems([])
                if (isFilter) { setIsAdvancedSearch(true) }
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
        apAuth(dispatch, setAuthData, data?.NGS)
    }, [])









    const handleAddPopupClose = () => {
        handleSearchResults({})
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
        // if (!formData.deptIndentNo) errors.deptIndentNo = "Field is required.";
        if (!formData.deptIndentDate) errors.deptIndentDate = "Field is required.";
        if (!formData.indentorDesignation) errors.indentorDesignation = "Field is required.";



        formData.indentItemChildList.forEach((item, index) => {
            let itemErrors = {};
            if (!item.depoCode) itemErrors.depoCode = "Field is required.";
            if (!item.itemCode) itemErrors.itemCode = "Field is required.";
            // if (!item.jobCode) itemErrors.jobCode = "Field is required.";
            if (!item.quantity) itemErrors.quantity = "Field is required.";
            if (!item.unitCode) itemErrors.unitCode = "Field is required.";
            item.indentItemChildOfChildList.forEach((childItem, childIndex) => {
                let childItemErrors = {};
                if (Object.keys(childItemErrors).length > 0) {
                    itemErrors[`indentItemChildOfChildList_${childIndex}`] = childItemErrors;
                }
            });

            if (Object.keys(itemErrors).length > 0) {
                errors[`indentItemChildList_${index}`] = itemErrors;
            }
        });

        formData.indentRefChildren.forEach((ref, refIndex) => {
            let refErrors = {};
            if (Object.keys(refErrors).length > 0) {
                errors[`indentRefChildren_${refIndex}`] = refErrors;
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
            loginId: data?.loginId,
            selectedLoginId: (formData.indentStatus === "S" || formData.indentStatus === "T") ? formData.selectedLoginId : data?.loginId,
            routingDetailsModuleList: [{}]
        };

        validateForm(async (isValid, errors) => {
            if (formData.indentStatus === "R" && !formData.rejectionReason) {
                errors.rejectionReason = "Please mention your reason for rejection.";
                isValid = false;
            }
            if (formData.indentStatus === "S" && !formData.selectedLoginId) {
                errors.selectedLoginId = "Please select route details.";
                isValid = false;
            }
            if (isValid) {
                const indicatorsPath = '/indent/update';
                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                //    console.log('actionaction update indent"',action)
                    if (submitPostData.fulfilled.match(action)) { 
                        const updateMessage = formData.indentStatus === 'S' 
                        ? "Indent Routed successfully" 
                        : formData.indentStatus === 'R' 
                        ? "Indent Rejected successfully" 
                        : formData.indentStatus === 'A' 
                        ? "Indent Approved successfully" 
                        : "Returned to indentor successfully";
                        // const updateMessage = formData.indentStatus === 'S' ? "Indent Routed" : formData.indentStatus === 'R' ? 'Indent Rejected' : formData.indentStatus === 'A' ? 'Indent Approved' : 'Returned to indentor';
                        setSuccessReponse(updateMessage)
                        setAddPopupVisible(false);
                        setEditPopupVisible(false);
                        handleSearchResults({})

                    } else {
                        setSerMessage(action?.payload?.Error)
                    }
                } catch (error) {
                    setSerMessage(error)
                } 
            }
        });
    }, [formData, data]);








    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);

    const [statusItem, setStatusItem] = useState({ indentStatus: "A" });


    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState(null);

    const handleStatusChange = useCallback(async (item) => {
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: { indentNo: item.indentNo }, indicatorsPath: '/indent/search' }));
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.content?.length > 0) {
                    const indentData = response?.payload?.success?.content[0];
                    setFormData({ ...indentData, indentStatus: item.indentStatus })
                    setEditPopupVisible(true);
                }
            }
        }
        catch {
            // setSerMessage('Error')
        }
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleConfirm = useCallback(async () => {
        if (!newStatus) {
            return;
        }
    }, [newStatus]);



    const initialValues = {
        indentStatus: "",
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

    // const [indentOption,setIndentOption]=useState([
    //     {
    //         value: 'A', label: "Approved",
    //         value: 'R', label: "Rejected",
    //         value: 'S', label: "Routed",
    //         value: 'T', label: "Return Tos Indentor"
    //     }
    // ])

    const indentStatusOption = [
        { value: '', label: 'All' },
        { value: 'S', label: 'Routed' },
        { value: 'T', label: 'Return to Indentor' },
        { value: 'A', label: 'Approved' },
        { value: 'R', label: 'Rejected' }
    ]



    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Indent Routing/Approval' }} />
            <div className="custome-border ">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <div className="position-absolute top-0 start-0 m-1 d-flex gap-2">
                        <button
                            onClick={changeFilter}
                            type="button"
                            style={{ backgroundColor: '#c15065', color: '#fff' }}
                            className="btn btn-sm"
                        >
                            <FaFilter className="me-1" /> Advanced Search
                        </button>

                    </div>
                    <h6>Indent Routing/Approval</h6>
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
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'indentStatus')}
                        id="indentStatus"
                        name="indentStatus"
                        value={initialFilterData.indentStatus}
                        options={indentStatusOption}
                        label="Indent Status"
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


                {recordItems.length > 0 ? (
                    <React.Fragment>
                        <table className="table table-hover tttt tableResponsive">
                            <TableHeader headers={headers} />
                            <tbody>
                                {recordItems.length > 0 && dataRecords.Success?.map((item, index) => {

                                    return (<React.Fragment key={index}>
                                        <tr>
                                            <td className="text-center">
                                                <a href="javacript:void(0)"
                                                >
                                                    {item.indentNo}
                                                </a>
                                            </td>

                                            <td className="text-center">
                                                <select
                                                    className={`btn-default ${item.indentStatus === "A" ? "badge bg-success" :
                                                        item.indentStatus === "R" ? "badge bg-danger" :
                                                            item.indentStatus === "S" ? "" :
                                                                item.indentStatus === "T" ? "badge bg-info" :
                                                                    "badge bg-secondary"
                                                        }`}
                                                    value={(item.indentStatus === 'A' || item.indentStatus === 'R' || item.indentStatus === 'T') ? item.indentStatus : 0}
                                                    onChange={(e) => { setStatusItem({ ...item, indentStatus: e.target.value }); handleStatusChange({ ...item, indentStatus: e.target.value, currentStatus: e.target.value }); }}
                                                    disabled={item.indentStatus === 'A' || item.indentStatus === 'R' || item.indentStatus === 'T'}
                                                >

                                                    <option value="0" selected> Select  </option>
                                                    {
                                                        authData.success === "Y" &&
                                                        (
                                                            <>
                                                                <option value="A" selected> Approved  </option>
                                                                <option value="R" selected>  Rejected </option>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        authData.success !== "Y" &&
                                                        (
                                                            <>
                                                                <option value="S" >  Routed </option>
                                                            </>
                                                        )
                                                    }



                                                    <option value="T" selected> Return to Indentor  </option>
                                                </select>
                                            </td>
                                            <TableBodyRow
                                                item={item}
                                                headers={headers}
                                            />
                                        </tr>
                                    </React.Fragment>)

                                })}
                            </tbody>
                        </table>
                    </React.Fragment>

                ) :
                    null

                }

            </div>
            <ConfirmationModal
                show={showModal}
                handleClose={handleClose}
                handleConfirm={handleConfirm}
                message="Are you sure?"
                errorMessage={serMessage}
                loading={false}
                item={statusItem}
            />


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
            )}


        </section>
    );
};
export default Index;
