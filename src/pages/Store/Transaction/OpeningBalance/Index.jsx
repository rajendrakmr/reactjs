import React, { useState, useCallback, useEffect } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddEditEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { getCookie } from "../../../../utils/cookieService";
import { searchGetAction, submitGetData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import ConfirmationModal from "../../../../components/ConfirmationModal";



const Index = () => {
    const createdBy = getCookie('userInfo');
    const dispatch = useDispatch();
    const { dataRecords, dataLoading, isUpdating,isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    // const [isSubmit, setIsSubmit] = useState(false)
    
    const [errors, setErrors] = useState({});
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [recordItems, setRecordItems] = useState([]);

    const changeFilter = () => {
        setIsAdvancedSearch(!isAdvancedSearch);
    }

    const initialData = {
        empCode: createdBy?.NGS,
        loginId: createdBy?.loginId,
        empName: createdBy?.empName,
        currentYear: ""
    };




    const handleSearchResults = async (payload) => {
        setSearchResult(true) 
        try {
            const response = await dispatch(searchGetAction({ dataInfo: {}, indicatorsPath: '/opening/balance/get/showpage' }));
            if (searchGetAction.fulfilled.match(response)) {
                setRecordItems(response?.payload?.success)
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
        } finally { 
        }
    }


    useEffect(() => {
        setRecordItems([])
        setRecordItems(0) 
        setSearchResult(false)
        handleSearchResults({})
    }, [])



    const handleAddPopupOpen = async () => {
        setErrors({});
        setFormData(initialData)
        setAddPopupVisible(true);
        setErrorMessage('')
        setSuccessMessage('')
    };

    const handleAddPopupClose = () => {
        setAddPopupVisible(false);
        setSuccessReponse('')
        setErrors({});
        setErrorMessage('')
        setSuccessMessage('')
    };






    const validateForm = (callback) => {
        let errors = {};
        if (!formData.currentYear) errors.currentYear = "Current Year field is required.";
        else if (!/^\d{4}$/.test(formData.currentYear)) {
            errors.currentYear = "Current Year must be in YYYY format.";
        }
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
                const indicatorsPath = `/opening/balance/generate/${formData.currentYear}/${formData.loginId}`;
                try {
                    const action = await dispatch(submitGetData({ dataInfo: {}, indicatorsPath: indicatorsPath }))
                    if (submitGetData.fulfilled.match(action)) {
                        setSuccessMessage(action?.payload?.success)
                        handleSearchResults({})
                        setAddPopupVisible(false);
                    } else {
                        setErrorMessage(action?.payload?.error)
                    }
                    
                } catch (error) {
                    setErrorMessage('Internal server error.')
                }  
            } else {
                setErrorMessage('Please enter required fields.')
                 
            }
        });
    },[formData]);

    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);

    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState(null);

    const handleStatusChange = useCallback((status) => {
        setShowModal(true);
        setNewStatus(status);
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };



    const handleConfirm = useCallback(async () => {
        if (!newStatus) {
            setErrorMessage("No status found.");
            return;
        }

        const indicatorsPath = `/opening/balance/showpage/generated-to-confirm`;
        try {
            const dataInfo = { date: newStatus?.balanceAsOn };
            const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }));
            if (submitPutData.fulfilled.match(action)) {
                if (action?.payload?.success) {
                    setSuccessMessage(action?.payload?.success);
                    handleSearchResults({});
                    setShowModal(false);
                } else {
                    setErrorMessage(action?.payload?.error);
                }
            } else {
                setErrorMessage(action?.payload?.error);
            }
        } catch (error) {
            setErrorMessage("Internal server error.");
        } finally {
            setTimeout(() => {
                setErrorMessage('');
                setSuccessMessage('');
            }, 5000);
        }
    }, [newStatus]);



    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Opening Balance Generation' }} />
            <div className="custome-border">
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
                            disabled={true}
                            type="button"
                            style={{ backgroundColor: '#c15065', color: '#fff' }}
                            className="btn btn-sm"
                        >
                            <FaFilter className="me-1" /> Advanced Search
                        </button>
                        {/* {
                                     <button
                                        style={{ backgroundColor: '#953285', color: '#fff' }}
                                        type="submit"
                                        onClick={() => handleSearchResults({})}
                                        className="btn btn-sm "
                                    >
                                        <FaSyncAlt className={dataLoading && !isAdvancedSearch ? "spn" : ""} /> Search
                                        
                                    </button>
                                } */}
                    </div>
                    <h5>Opening Balance Generation</h5>
                </div>
            </div>

            <h6>Search Results</h6>
            {
                successMessage ? (<div className="alert alert-success" role="alert">
                    <span className="alert-success">{successMessage}
                    </span>
                </div>) : null
            }

            <div className="table-container table-responsive tableReponsivecontainer">
                {recordItems?.length > 0 ? (
                    <React.Fragment>
                        <table className="table table-hover tttt tableResponsive">
                            <TableHeader headers={headers} />
                            <tbody>
                                {recordItems?.length > 0 && dataRecords.success?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr>


                                            <td className="text-center">
                                                <select
                                                    className={`btn-default ${item.statusCd !== 'Confirmed' ? 'text-dark' : 'text-success'}`}
                                                    value={item.statusCd}
                                                    onChange={(e) => { handleStatusChange(item) }}
                                                    disabled={item.statusCd === 'Confirmed'}
                                                >
                                                    <option selected={item.statusCd === 'Confirmed'} value="Confirmed" >Confirmed</option>
                                                    <option selected={item.statusCd === 'Generated'} value="Generated">Generated</option>
                                                </select>
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
            <ConfirmationModal
                show={showModal}
                handleClose={handleClose}
                isLoading={isUpdating}
                handleConfirm={handleConfirm}
                errorMessage={errorMessage}
            />

            {(addPopupVisible) && (
                <AddEditEntry
                    formData={formData}
                    handleSubmit={handleAddSubmit}
                    onClose={handleAddPopupClose}
                    isEdit={false ? true : false}
                    errors={errors}
                    setErrors={setErrors}
                    hasError={hasError}
                    setFormData={setFormData}
                    isLoading={isSubmit}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    successReponse={successReponse}
                />
            )}


        </section>
    );
};
export default Index;
