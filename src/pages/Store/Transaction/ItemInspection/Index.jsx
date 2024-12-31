import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaFilter } from "react-icons/fa";
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
import { searchPostGetAction, submitPostData, submitPutData } from "../../../../redux/reducer/commonApiSlice";
import { initialData } from "./helper";
import AdvancedSearchForm from "../../../../components/SearchFields/AdvancedSearchForm";
import SearchInputField from "../../../../components/SearchFields/SearchInputField";
import SearchInputDateField from "../../../../components/SearchFields/SearchInputDateField";
import { filterRecordData } from "../../../../utils/helper";



const Index = () => {
    const { data } = useSelector((state) => state.auth);
    const createdBy = getCookie('userInfo')?.loginId;
    const dispatch = useDispatch();
    const { dataRecords, dataLoading, isSubmit } = useSelector((state) => state.commonApi);
    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [pagination, setPagination] = useState({ page: 0 });
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [totalPageNo, setTotalPagNO] = useState(0);
    const [recordItems, setRecordItems] = useState([]);
    const [itemInsRecord, setItemInsRecord] = useState([]);


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

    const [isFilter, setIsFilter] = useState(false);




    const handleSearchResults = async (p) => {
        setSearchResult(true)
        const dataInfo = {
            ...(p.depoCode && { depoCode: p.depoCode }),
            ...(p.itemCode && { itemCode: p.itemCode }),
            ...(p.itemDescription && { itemDescription: p.itemDescription }),
            ...(p.depoDescription && { depoDescription: p.depoDescription }),
            ...(p.chalanNo && { chalanNo: p.chalanNo }),
            ...(p.challanQtyInNumber && { challanQtyInNumber: p.challanQtyInNumber }),
            ...(p.inspectionNo && { inspectionNo: p.inspectionNo }),
            ...(p.inspectionDate && { inspectionDate: p.inspectionDate }),
            pageNo: p.page ? p.page : 0,
            pageSize: 8,
        }
        setPagination(dataInfo)
        try {
            const response = await dispatch(searchPostGetAction({ dataInfo, indicatorsPath: '/item/inspection/search-item' }));
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
            console.log('error', 'Server error!', 'An unexpected error occurred.', error);
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
        setFormData({
            ...item,
            challaItemSrNos: [
                {
                    ...item,
                    isChildSerial: true,
                }
            ]
        });

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
        if (!formData.inspectionDate) errors.inspectionDate = "Field is required.";
        if (!formData.challanNo) errors.challanNo = "Field is required.";

        formData.challaItemSrNos.forEach((item, index) => {
            let itemErrors = {};
            if (!item.qtyAccepted) itemErrors.qtyAccepted = "Field is required.";
            if (item.isChildSerial) {
                if (!item.qtyAccepted) itemErrors.qtyAccepted = "Field is required.";
            }

            if (Object.keys(itemErrors).length > 0) {
                errors[`challaItemSrNos_${index}`] = itemErrors;
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
        let dataInfo = {}
        if (editPopupVisible) {
            const child = formData?.challaItemSrNos[0];
            dataInfo = {
                challanDate: formData.challanDate,
                poDate: formData.poDate,
                inspectionDate: formData.inspectionDate,
                challanNo: formData.challanNo,
                inspectionNo: formData.inspectionNo,
                challanSerialNumber: child.challanSrlNo,
                discrepancyNoted: formData.discrepancyNoted,
                ...child,
                itemCode: child.itemCode,
                qtyRejected: child.qtyRejected,
                qtyAccepted: child.qtyAccepted,
                remarks: child.remarks,
                loginId: data?.loginId

            }
        } else {
            dataInfo = formData?.challaItemSrNos
                .filter(item => item.isChildSerial === true)
                .map(item => ({
                    ...item,
                    challanDate: formData.challanDate,
                    poDate: formData.poDate,
                    inspectionDate: formData.inspectionDate,
                    challanNo: formData.challanNo,
                    poNo: formData.poNo,
                    vendorCode: formData.vendorCode,
                    vendorName: formData.vendorName,
                    depoCode: formData.depoCode,
                    depoDescription: formData.depoDescription,
                }))
        }


        validateForm(async (isValid, errors) => {
            console.log('errors', errors, dataInfo.length)
            if (!dataInfo.length > 0 && !editPopupVisible) {
                console.log('dataInfo', dataInfo.length)
                setSerMessage('Please select at least challan serial.')
                isValid = false
            }
            console.log('serrrr ', serMessage)

            if (isValid) {


                try {
                    if (editPopupVisible) {
                        const indicatorsPath = `/item/inspection/update-item`;

                        const action = await dispatch(submitPutData({ dataInfo, indicatorsPath: indicatorsPath }))

                        if (submitPutData.fulfilled.match(action)) {
                            if (action?.payload?.success) {
                                handleSearchResults(pagination)
                                setSuccessReponse('Data updated successfully.')
                                setTimeout(() => {
                                    setAddPopupVisible(false);
                                    setEditPopupVisible(false);
                                }, 1000);
                            } else {
                                setSerMessage(action?.payload?.error)
                            }
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    } else {
                        const indicatorsPath = `/item/inspection/add-item/${data?.loginId}`;

                        const action = await dispatch(submitPostData({ dataInfo, indicatorsPath: indicatorsPath }))

                        if (submitPostData.fulfilled.match(action)) {
                            if (action?.payload?.success) {
                                handleSearchResults(pagination)
                                setSuccessReponse('Data created successfully.')
                                setTimeout(() => {
                                    setAddPopupVisible(false);
                                    setEditPopupVisible(false);
                                }, 1000);
                            } else {
                                setSerMessage(action?.payload?.error)
                            }
                        } else {
                            setSerMessage(action?.payload?.error)
                        }
                    }

                } catch (error) {
                    setSerMessage(error)
                }
            } else {
                if (!dataInfo.length > 0 && !editPopupVisible) {
                    setSerMessage('Please select at least one item.')

                } else {
                    setSerMessage('Please enter required fields.')
                }
            }
        });
    }, [formData, data]);







    /**FITER VALUES */

    const initialValues = {
        depoCode: "",
        itemCode: "",
        itemDescription: "",
        depoDescription: "",
        chalanNo: "",
        inspectionNo: "",
        inspectionDate: "",
        challanQtyInNumber: "",
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



    return (
        <section>
            <BreadCrumb item={{ label: 'Store', 'sub_label': 'Transaction', active: true, current: 'Item Inspection' }} />
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
                    <h5>Item Inspection</h5>
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
                    <SearchInputField label="Depot Desc" name="depoDescription" inputData={initialFilterData.depoDescription} onChange={filterHandleChange} />
                    <SearchInputField label="Inspection No" name="inspectionNo" inputData={initialFilterData.inspectionNo} onChange={filterHandleChange} />
                    <SearchInputDateField label="Inspection Date" col="col-md-4" name="inspectionDate" inputData={initialFilterData.inspectionDate} onChange={filterHandleChange} />
                    <SearchInputField label="Challan No" name="chalanNo" inputData={initialFilterData.chalanNo} onChange={filterHandleChange} />

                    <SearchInputField label="Item Code" name="itemCode" inputData={initialFilterData.itemCode} onChange={filterHandleChange} />
                    <SearchInputField label="Item Desc" name="itemDescription" inputData={initialFilterData.itemDescription} onChange={filterHandleChange} />
                    <SearchInputField label="Challan Qty No" name="challanQtyInNumber" inputData={initialFilterData.challanQtyInNumber} onChange={filterHandleChange} />

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
                        <table className="table">
                            <TableHeader headers={headers} />

                            <tbody>

                                {recordItems.length > 0 && dataRecords.success.content?.map((item, index) => (
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
                    setItemInsRecord={setItemInsRecord}
                    itemInsRecord={itemInsRecord}
                />
            )}


        </section>
    );
};
export default Index;
