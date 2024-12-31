import React, { useEffect, useState, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
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
import { searchGetAction, submitPostData } from "../../../../redux/reducer/commonApiSlice";
 


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


            const response = await dispatch(searchGetAction({ dataInfo: {}, indicatorsPath: '/adv/sis/return/get-records' }));

            if (searchGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.length > 0) {
                    setRecordItems(response?.payload?.success)
                    setIsAdvancedSearch(false)
                }
            }
        } catch (error) {
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
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
        handleSearchResults({})
    }, [])



    const handleEditPopupOpen = useCallback((item) => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        const updatedItem = {
            ...item,
            returnedBy: data?.loginId,
            returnedByName: data?.empName,
            ...item?.advsisIssueReturnDTO[0],
            isUpdate: item?.advsisIssueReturnDTO[0]?.advSisReturnNo ? true : false
        };

        setFormData(updatedItem)
        setAddPopupVisible(false);
        setEditPopupVisible(true);

    },[data]);

 
    const handleAddPopupClose = () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setAddPopupVisible(false);
        setEditPopupVisible(false);
        
    };



    const validateForm = (callback) => {
        let errors = {};
        if (!formData.returnDate) errors.returnDate = "Field is required.";
        if (!formData.advSisReturnQty) errors.advSisReturnQty = "Field is required.";


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
            advSisReturnQty: parseFloat(formData.advSisReturnQty) || 0,
            challanQtyNumber: parseFloat(formData.challanIssueQty) || 0,
        };

        validateForm(async (isValid, errors) => {
            if (isValid) {
                let indicatorsPath = '/adv/sis/return/add-record';

                try {
                    const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath })) 
                    if (submitPostData.fulfilled.match(action)) {
                        handleSearchResults(pagination)
                        if (formData.isUpdate) {
                            setSuccessReponse('Advanced SIS return updated successfully.')
                        } else {
                            setSuccessReponse('Advanced SIS return created successfully.')
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
        challanIssueNo: "",
        challanIssueDate: "",
        challanNo: "",
        deptChallanNo: "",
        depoCode: "",
        depoDesc: "",
        pageNo: 0,
        pageSize: 10
    };


    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);



    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Advanced SIS Return' }} />
            <div className="custome-border ">
                <div className="align-items-center primary-light-bg text-white p-1 text-bold text-center position-relative">
                    <div className="position-absolute top-0 start-0 m-1 d-flex gap-2">
                        {/* <button
                            onClick={handleAddPopupOpen}
                            type="button"
                            className="btn btn-sm btn-secondary"
                            disabled={true}
                        >
                            <FaPlus className="me-1" /> Add
                        </button>
                        <button
                        disabled={true}
                            onClick={changeFilter}
                            type="button"
                            style={{ backgroundColor: '#c15065', color: '#fff' }}
                            className="btn btn-sm"
                        >
                            <FaFilter className="me-1" /> Advanced Search
                        </button> */}
                    </div>
                    <h5>Advanced SIS Return</h5>
                </div>

                {/* {isAdvancedSearch && (<Formik
                    initialValues={initialValues}
                    onSubmit={handleSearch}
                >
                    {({ }) => (
                        <div className="form-container">
                            <Form style={{ boxSizing: "border-box" }} className="py-4 mx-auto shadow-sm">
                                <div className="row mx-auto mw-100">
                                    {showValidationMessage && (
                                        <div className="text-danger mt-2 text-center">
                                            At least one field is required for search.
                                        </div>
                                    )}
                                    <SearchInputField label="Challan Issue No" name="challanIssueNo" />
                                    <SearchInputField label="Challan Issue Date" name="deptIndentDate" type="date" />
                                    <SearchInputField label="Challan No" name="challanNo" />
                                    <SearchInputField label="Dept. Challan No" name="deptChallanNo" />
                                    <SearchInputField label="Depo Code" name="depoCode" />
                                    <SearchInputField label="Depo Desc" name="depoDesc" />
                                    <div className="d-flex justify-content-end gap-4 mt-3 flex-wrap">
                                        <button type="submit" className="btn btn-sm custome-button-color1 text-white mx-2">
                                            <FaSyncAlt className={dataLoading ? "spn" : ""} /> Search
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>)} */}
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
