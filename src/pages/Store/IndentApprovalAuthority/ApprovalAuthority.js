import React, { useEffect, useState } from "react";
import { FaPlus, FaSyncAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SucessMessages from "../../../helperFuc/validationMessages/SucessMessages";
import UpdateMessage from "../../../helperFuc/validationMessages/UpdateMessage";
import ApprovalAuthorityAddEdit from "./ApprovalAuthorityAddEdit";
import { clearErrorMessage, clearIndSearchList, getAddAction, getAllDataAction, postAllDataBodyAction, postAllDataBodySecondAction, putUpdateAction } from "../../../redux/slice/comman/commanSlice";
import { getLocalStorageValue } from "../../../helperFuc/localStorage";
import moment from "moment";
import SearchValidation from "../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../components/layout/BreadCrumb";

const ApprovalAuthority = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.comman.loading);
    const error = useSelector((state) => state.comman.error);
    const getdepartment = useSelector((state) => state.comman.getData);
    const getLoginIds = useSelector((state) => state.comman.getPostBodySecondData);
    const getSearchListing = useSelector((state) => state.comman.getPostBodyData);

    const [searchFormData, setSearchFormData] = useState({
        documentType: "",
        department: "",
    });
    const [editFormData, setEditFormData] = useState({
        documentType: "",
        department: "",
        CREATED_BY: "",
        loginId: "",
        fromDate: "",
        toDate: ""
    });
    
    const [addFormErrors, setAddFormErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [formData, setFormData] = useState({
        documentType: "",
        department: "",
        CREATED_BY: "",
        loginId: "",
        fromDate: "",
        toDate: "",

    });
    const [addMessage, setAddMessage] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
   
    const getDepartmentList = async () => {
        const localStorageData = getLocalStorageValue()
        if (localStorageData && localStorageData.token) {
            const { token } = localStorageData;
            const endPoint = 'api/alldepartment';
            try {
                await dispatch(getAllDataAction({ endPoint, token }));
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        } else {
            console.error('No valid adminLogin data found in localStorage');
        }
    };

    const getloginIdList = async (page = 0) => {
        const localStorageData = getLocalStorageValue()
        if (localStorageData && localStorageData.token) {
            const { token } = localStorageData;
            const endPoint = 'api/alluserlogin';
            const dataInfo = {
                pageNumber: page, // Backend expects 1-based index
                pageSize: 100
            };
            try {
                await dispatch(postAllDataBodySecondAction({ endPoint, token, dataInfo, pageNumber: page, pageSize: 100 }));
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        } else {
            console.error('No valid adminLogin data found in localStorage');
        }
        setCurrentPage(page);
    };

    useEffect(() => {
        getDepartmentList()
        getloginIdList()
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const endPoint = "Indentapprove/search";
        const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
        const { token } = adminLoginData;

        // if (!searchFormData.documentType && !searchFormData.department) {
        //     setShowValidationMessage(true);
        //     return;
        // }
        const department = parseInt(searchFormData.department) || 0;
        const dataInfo = {
            documentType: searchFormData.documentType,
            department: department
        };
        dispatch(postAllDataBodyAction({ endPoint, dataInfo, token }));
    };

    const handleChange = (event, page=0) => {
        const { name, value } = event.target;
        if (value.trim()) {
            setShowValidationMessage(false);
        }
        setSearchFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
        setCurrentPage(page)
    };

    const handlePageChange = (newPage) => {
        getloginIdList( newPage);
    }


    const handleEditPopupOpen = (department, documentType, fromDate, toDate, loginId) => {
        setEditFormData({
            department,
            documentType,
            fromDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : "",
            toDate: toDate ? moment(toDate).format('YYYY-MM-DD') : "",
            loginId
        });
        setEditPopupVisible(true);
    };

    const handleEditPopupClose = () => {
        setEditPopupVisible(false);
    };

    const handleAddPopupOpen = () => {
        setShowValidationMessage(false);
        setAddPopupVisible(true);
    };

    const handleAddPopupClose = () => {
        setAddPopupVisible(false);
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleAddFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateAddForm = () => {
        const errors = {};
        if (!formData.documentType.trim()) {
            errors.documentType = "documentType Code is required";
        }
        if (!formData.department) {
            errors.department = "department is required";
        }
        if (!formData.loginId) {
            errors.loginId = "loginId by is required";
        }
        setAddFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleAddSubmit = async (event) => {
        event.preventDefault();
        if (!validateAddForm()) {
            return;
        }
        const localStorageData = getLocalStorageValue()
        const { token, loginId } = localStorageData;
        const endPoint = "Indentapprove/add";
        const dataInfo = {
            documentType: formData.documentType,
            department: parseInt(formData.department),
            CREATED_BY: parseInt(loginId),
            fromDate: formData.fromDate,
            toDate: formData.toDate,
            loginId: formData.loginId,
            "pageSize": 100,
            "pageNumber": 0,
        };
        try {
            await dispatch(getAddAction({ endPoint, dataInfo, token })).unwrap();
            handleSearchSubmit(event);
            setFormData({
                documentType: "",
                department: "",
                CREATED_BY: "",
                loginId: "",
                fromDate: "",
                toDate: ""
            });
            handleAddPopupClose();
            navigate("/store/indent/approval-authority");
            setAddMessage(true)
            setTimeout(() => {
                setAddMessage(false)
            }, 5000);
        } 
        catch (error) {
            console.error("Error indent approval authority:", error);
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 5000)
        }
    };

    const validateEditForm = () => {
        const errors = {}; 
        if (!editFormData.fromDate.trim()) {
            errors.fromDate = "To Date by is required";
        }
        if (!editFormData.toDate.trim()) {
            errors.toDate = "From Date is required";
        }
        setAddFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEditSubmit = async (event) => {
        if (!validateEditForm()) {
            return;
        }
        const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
        const { token, loginId } = adminLoginData;
        const endPoint = "Indentapprove/update";
        const editDataInfo = {
            documentType: editFormData.documentType,
            department: parseInt(editFormData.department),
            MODIFIED_BY: parseInt(loginId),
            fromDate: editFormData.fromDate,
            toDate: editFormData.toDate,
        };
        try {
            await dispatch(putUpdateAction({ dataInfo: editDataInfo, token, endPoint })).unwrap();
            handleSearchSubmit(event);
            setEditPopupVisible(false);
            setUpdateMessage(true)
            setTimeout(() => {
                setUpdateMessage(false)
            }, 3000);
        }
        catch (error) {
            console.error("Error approve authority:", error);
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 4000)
        };
    };

    useEffect(() => {
        // Cleanup function to dispatch clear action
        return () => {
          dispatch(clearIndSearchList());
        };
      }, [dispatch]);

    

    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Master', active: true, current:'Indent Approval Authority ' }} />
            
                    <div className="custome-border pb-4">
                        <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                            <button onClick={handleAddPopupOpen} type="submit" className="btn btn-sm btn-secondary position-absolute top-0 start-0 m-1">
                                <FaPlus className="me-1" /> Add
                            </button>
                            <h5>Indent Approval Authority</h5>
                        </div>
                        <form onSubmit={handleSearchSubmit} className="px-3 py-4 custom-width mx-auto p-2 shadow-sm">
                            <div className="row">
                                {showValidationMessage && (
                                    <div className="text-danger mt-2 text-center">
                                        At least one field is required for search.
                                    </div>
                                )}
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">
                                    {/* <div className="form-group col-md-4">
                                        <label htmlFor="loginId">Login Id:</label>
                                        <div className="select-container">
                                            <select
                                            
                                                className="form-control custome-border"
                                                name="loginId"
                                                value={formData.loginId}
                                                onChange={handleChange}
                                               
                                               
                                            >
                                                <option value="">Choose...</option>
                                                {getLoginIds.success?.map((user, i) => (
                                                    <option key={i} value={user.loginId}>
                                                        {user.loginId} - {user.nam}
                                                    </option>
                                                ))}
                                            </select>
                                          
                                        </div>
                                    </div> */}
                                    <div className="col-sm-3 col-4">
                                        <label htmlFor="depoCode" className="mr-3">
                                            Document Type:
                                        </label>
                                    </div>
                                    <div className="col-sm-9 col-8">
                                        <input
                                            type="text"
                                            className="custome-input-height form-control custome-border"
                                            id="documentType"
                                            name="documentType"
                                            value={searchFormData.documentType}
                                            onChange={handleChange}
                                            placeholder="Document Type"
                                        />
                                    </div>
                                </div>
                                <div className="form-group col-md-6 d-flex mt-3 align-items-center">

                                    <label htmlFor="department">Department:</label>
                                    <div className="select-container">
                                        <select
                                            className="custome-input-height form-control custome-border "
                                            id="department"
                                            name="department"
                                            value={searchFormData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="">Choose...</option>
                                            {getdepartment?.success?.map((code, index) => (
                                                <option key={index} value={code.id}>
                                                    {code.id} - {code.deptName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap">
                                <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2">
                                    <FaSyncAlt className="me-1" />{loading ? 'Search...' : 'Search'}
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className="pagination d-flex justify-content-center gap-3 mt-3">
            {/* <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
                Previous
            </button>

            <span>Page {currentPage + 1} of</span>
            <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                
            >
                Next
            </button> */}
        </div>
        {getSearchListing?.success?.length <= 0 &&  <>{<SearchValidation/>}</>}
                    {loading && <p>Loading...</p>}
                    {addMessage && <div className="mt-2"><SucessMessages /></div>}
                    {updateMessage && <div className="mt-2"><UpdateMessage /></div>}
                    {getSearchListing?.success?.length > 0 && (
                        <div className="mt-4" >
                            <h6>Search Results</h6>
                            <div style={{ maxHeight: "400px", overflowY: "auto" }}>

                                <table className="table table-hover tttt">
                                    <thead className="table-header-bg text-white">
                                        <tr>
                                            <th className="text-center" scope="col">Action</th>
                                            <th className="text-center" scope="col">Department</th>
                                            <th className="text-center" scope="col">DocumentType</th>
                                            <th className="text-center" scope="col">LoginId</th>
                                            <th className="text-center" scope="col">NGS</th>
                                            <th className="text-center" scope="col">From Date</th>
                                            <th className="text-center" scope="col">To Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getSearchListing.success.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <FaEdit className="icon mr-2" onClick={() => handleEditPopupOpen(item.department, item.documentType, item.fromDate, item.toDate, item.loginId)} />
                                                </td>
                                                <td className="text-center">{item.department}</td>
                                                <td className="text-center">{item.documentType}</td>
                                                <td className="text-center">{item.loginId}</td>
                                                <td className="text-center">{item.ngs}</td>
                                                <td className="text-center">{item.fromDate ? moment(item.fromDate).format('DD-MM-YYYY') : ''}</td>
                                                <td className="text-center">{item.toDate ? moment(item.toDate).format('DD-MM-YYYY') : ''}</td>
                                                {/* <td className="text-center">{item.fromDate ? moment(item.fromDate).format('DD-MM-YYYY') : 'N/A'}</td>
                                                <td className="text-center">{item.toDate ? moment(item.toDate).format('DD-MM-YYYY') : 'N/A'}</td> */}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
          

            {editPopupVisible && (
                <ApprovalAuthorityAddEdit
                    formData={editFormData}
                    handleChange={handleEditFormChange}
                    handleSubmit={handleEditSubmit}
                    onClose={handleEditPopupClose}
                    isEdit={true}
                    addFormErrors={addFormErrors} // Pass form errors to the component
                    disableDepoCode={true}
                    loading={loading}
                    getdepartment={getdepartment}
                    getLoginIds={getLoginIds}
                    error={error}
                    handlePageChange={handlePageChange}
                    setAddFormErrors={setAddFormErrors}
                    setFormData={setFormData}
                />
            )}
            {addPopupVisible && (
                <ApprovalAuthorityAddEdit
                    formData={formData}
                    handleChange={handleAddFormChange}
                    handleSubmit={handleAddSubmit}
                    onClose={handleAddPopupClose}
                    isEdit={false}
                    addFormErrors={addFormErrors} // Pass form errors to the component
                    disableDepoCode={false}
                    loading={loading}
                    getdepartment={getdepartment}
                    getLoginIds={getLoginIds}
                    error={error}
                    handlePageChange={handlePageChange}
                    setAddFormErrors={setAddFormErrors}
                    setFormData={setFormData}
                />
            )}
        </section>
    );
};

export default ApprovalAuthority;
