import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter, FaPrint } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../components/pagination/Pagination";
import AddEditIndentEntry from "./AddEditEntry";
import SearchValidation from "../../../../helperFuc/validationMessages/SearchValidation";
import BreadCrumb from "../../../../components/layout/BreadCrumb";
import SearchLoading from "../../../../helperFuc/validationMessages/SearchLoading";
import TableHeader from "../../../../components/table/TableHeader";
import { headers, changeKeyName } from "./tableHeader";
import TableBodyRow from "../../../../components/table/TableBodyRow";
import { getCookie } from "../../../../utils/cookieService";
import { fetchGetPreData, searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import { GetTypeReport, statusOptions } from "../../../helperFun";
import { filterRecordData } from "../../../../utils/helper"; 
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import SelectFormInput from "../../../../components/formComponent/SelectFormField";
import { GetConsumer } from "../../CommonApiService";



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
    const [errors, setErrors] = useState({});
    const [editPopupVisible, setEditPopupVisible] = useState(false);
    const [addPopupVisible, setAddPopupVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [serMessage, setSerMessage] = useState('');
    const [successReponse, setSuccessReponse] = useState('');
    const [totalCount, setTotalCount] = useState(0)
    const [isFilter, setIsFilter] = useState(false);
    const [consumerOptions, setConsumerOptions] = useState([]);
    const [isFetchComplete, setIsFetchComplete] = useState(false);

    const handleSearchResults = async (p) => { 
        setSearchResult(true) 
        setIsFetchComplete(false)
        const dataInfo = {
            ...(p.phoneNo && { phoneNo: p.phoneNo }),
            ...(p.gstn && { gstn: p.gstn }),
            ...(p.customerId && { customerId: p.customerId }),
            ...(p.customerName && { customerName: p.customerName }),
            ...(p.commerPurpose && { commerPurpose: p.commerPurpose }), 
            pageNo: p.page || 0,
            pageSize: 15
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo: dataInfo, indicatorsPath: '/customer/license/search' }));
            const isFormFilter = filterRecordData(dataInfo);
            setIsFilter(isFormFilter ? true : false)
            if (searchPostGetAction.fulfilled.match(response)) {
                if (response?.payload?.success?.length > 0) {
                    setRecordItems(response?.payload?.success) 
                    setIsAdvancedSearch(false)
                } else {
                    setRecordItems([])
                    if (isFilter) { setIsAdvancedSearch(true) }
                }
            } else {
                setSerMessage(response?.payload?.Error || 'Unable to filter data.')
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsFetchComplete(true)
            setSuccessReponse('')
            setSerMessage('')
        }
    }

    useEffect(() => {
        setRecordItems([])
        setRecordItems(0)
        setSearchResult(false)
        handleSearchResults({})
        GetConsumer(dispatch,setConsumerOptions)
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
        const respoDat = changeKeyName(item)
        const dataInfo =
        {
            ...respoDat, 
            isActive:respoDat?.hisActive,
            customerLicenseFeeChildren: respoDat?.customerLicenseFeeChildren.map(row => ({
                ...row,
                srlNo: row.addSrlNo
            })),
            customerBGList: respoDat?.customerBGList.map(row => ({
                ...row,
                srlNo: row.bgSrlNo
            })), 
        };
        setFormData(dataInfo)
        setEditPopupVisible(true);
        setAddPopupVisible(false);
    };


    const handleAddPopupOpen = useCallback(async () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setFormData({
            ...initialData,
            
        })
        setAddPopupVisible(true);
        setEditPopupVisible(false);
    }, [data]);

    const handleAddPopupClose = () => {
        setSuccessReponse('')
        setSerMessage('')
        setErrors({});
        setAddPopupVisible(false);
        setEditPopupVisible(false);

    };

  
    const validateForm = (callback) => {
        let errors = {};
        
       
        if(formData.gstn){
            if(!formData.isGSTN){
                errors.gstn = `Invalid GSTN no ${formData.gstn}.`;
            }else{
                errors.gstn =""
            }
        }
        

        if(formData.mailId){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.mailId)) {
                errors.mailId = `Invalid Email ID `;
            }else{
                errors.mailId = '';
            }  
        }

        if (!formData.customerName) errors.customerName = "Field is required.";
        if (!formData.customerId) errors.customerId = "Field is required.";
        if (!formData.commerPurpose) errors.commerPurpose = "Field is required.";
        formData.customerLicenseFeeChildren.forEach((item, index) => {
            let itemErrors = {};
            if (!item.addressType) itemErrors.addressType = "Field is required.";
            if (!item.address1) itemErrors.address1 = "Field is required.";
            if (!item.pinCode) itemErrors.pinCode = "Field is required.";
            if (!item.stateCd) itemErrors.stateCd = "Field is required."; 
            if (Object.keys(itemErrors).length > 0) {
                errors[`customerLicenseFeeChildren_${index}`] = itemErrors;
            }
        });

        formData.customerBGList.forEach((item, index) => {
            let itemErrors = {};
            if (!item.bgNo) itemErrors.bgNo = "Field is required.";  
            if (Object.keys(itemErrors).length > 0) {
                errors[`customerBGList_${index}`] = itemErrors;
            }
        });
 
        setErrors(errors);
        const isValid = Object.keys(errors).length == 0;
        if (callback) {
            callback(isValid, errors);
        }

        return isValid;
    };


    const  isObjectEmpty=(obj)=> {
        return Object.values(obj).every(value => value === "");
    } 
    
    const handleAddSubmit = useCallback(async (event) => {
        event.preventDefault();
        const dataInfo = {
            ...formData,
            loginId: data?.loginId,
            customerLicenseFeeChildren: formData.customerLicenseFeeChildren.every(isObjectEmpty)
                ? []
                : formData.customerLicenseFeeChildren.map(row => ({
                    ...row,
                    customerId: formData?.customerId,
                    gstn: formData?.gstn,
                    isActive: "Y",
                    isActive: row.defaultFlagShipAdd=="Y"?"Y":"N"
                })),
            customerBGList: formData.customerBGList.every(isObjectEmpty)
                ? []
                : formData.customerBGList.map(row => ({
                    ...row,
                    customerId: formData?.customerId
                })),
        };  
      
        validateForm(async (isValid, errors) => { 
            if (isValid) { 
                try { 
                    if (editPopupVisible) {
                        const indicatorsPath = '/customer/license/update';
                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))
                       
                        if (submitPutData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Success: Customer for Licence Fee updated.')
                            setEditPopupVisible(false);
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = '/customer/license/add';
                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))
                        
                        if (submitPostData.fulfilled.match(action)) {
                            handleSearchResults(pagination)
                            setSuccessReponse('Success: Customer for Licence Fee created.')
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
                setTimeout(() => {
                    setSuccessReponse('')
                    setSerMessage('')
                }, 5000);
            }
        });
    }, [formData, data]);






    const hasError = useCallback((name) => {
        return !!errors[name];
    }, [errors]);


    
     


    // Advanced filter records

    const initialValues = {
        phoneNo: "",
        gstn: "",
        customerId: "",
        customerName: "",
        commerPurpose: "", 
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
            <BreadCrumb item={{ label: 'Invoicing-Water', 'sub_label': 'Transaction', active: true, current: 'Customer for Licence Fee Master' }} />
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
                    <h6>Customer for Licence Fee Master</h6>
                </div>

                <AdvancedSearchForm
                    isAdvancedSearch={isAdvancedSearch}
                    filterHandleChange={filterHandleChange}
                    resetSearch={resetSearch}
                    handleSearch={handleSearch}
                    isFilter={isFilter}
                    dataLoading={dataLoading}
                >
                    <SearchInputField label="Customer ID" name="customerId" inputData={initialFilterData.customerId} onChange={filterHandleChange} type="str"/>
                    <SearchInputField label="Customer Name" name="customerName" inputData={initialFilterData.customerName} onChange={filterHandleChange} type="str" />
                    <SelectFormInput
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, 'commerPurpose')}
                        id="commerPurpose"
                        name="commerPurpose"
                        value={initialFilterData.commerPurpose}
                        options={statusOptions}
                        label="Comm. Purpose"
                        col="col-md-4"
                    />
                    <SearchInputField label="GSTN" type="str" name="gstn" inputData={initialFilterData.gstn} onChange={filterHandleChange} />
                    <SearchInputField label="Phone No" name="phoneNo" inputData={initialFilterData.phoneNo} onChange={filterHandleChange} max="11" type="number" />
                    
                </AdvancedSearchForm>

            </div>

            <h6>Search Results</h6>
            {
                serMessage && isFilter ? (<div className="alert alert-danger" role="alert">
                    <span className="alert-danger">{serMessage}
                    </span>
                </div>) : null
            }
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
                                            <td className="d-flex justify-content-center">

                                                <button
                                                    className="btn btn-default btn-sm"
                                                    onClick={() => handleEditPopupOpen(item)}
                                                >
                                                    <FaEdit className="icon" />
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
                  {!isFetchComplete ? (<SearchLoading /> ) : ( !dataLoading && searchResult && recordItems.length === 0 && <SearchValidation />)}

 
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
