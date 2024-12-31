import React, { useCallback, useState } from 'react';
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';

import InputDateCellField from '../../../../components/table/form/InputDateCellField';
import TableRequired from '../../../../components/TableRequired';
import ChildModalEntryScreen from './ChildModalEntryScreen';

const BGChildEntryScreen = ({ customerBGList, formData, hasError, setFormData, errors, setErrors, isEdit }) => {

    const [isChildVisible, setIsChildVisible] = useState(false)
    const [currentChild, setCurrentChild] = useState({})
    const [indexNo, setIndexNo] = useState(null)
    const handleAddRow = () => {
        setIsChildVisible(true)
        const newRow = {
            ...(isEdit && { srlNo: null }),
            agreementEffectiveFrom: "",
            validityPeriod: "",
            validUpto: "",
            bgNo: "",
            bgDate: "",
            issuingBank: "",
            bankBranchName: "",
            bgValue: "",
            bgValidityFrom: "",
            bgValidityTo: "",
            dateOfCommunication: "",
            commRefNumber: "",
            commRefDate: ""
        };
        setFormData(prevData => ({
            ...prevData,
            customerBGList: [...prevData.customerBGList, newRow]
        }));
    };


    const handleEditPopupOpen = (item,index) => {
        setIsChildVisible(true)
        setCurrentChild(item)
        setIndexNo(index)
    }





    const handleRemoveParent = (parentIndex) => {
        const updatedIndentItemList = customerBGList.filter((_, index) => index !== parentIndex);
        setFormData(prevData => ({
            ...prevData,
            customerBGList: updatedIndentItemList
        }));
    };



    const setError = useCallback((parentIndex, field) => {
        if (parentIndex !== undefined && field !== undefined) {
            return errors[`customerBGList_${parentIndex}`] || '';
        }

        return errors;
    }, [errors]);








    const handleChange = useCallback((e, parentIndex, field) => {
        const { value } = e.target;
        setFormData(prevData => {
            const updatedIndentItemList = [...prevData.customerBGList];
            updatedIndentItemList[parentIndex] = {
                ...updatedIndentItemList[parentIndex],
                [field]: value,
            };
            return { ...prevData, customerBGList: updatedIndentItemList };
        });
        setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            const errorKey = `customerBGList_${parentIndex}`;
            if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
                delete updatedErrors[errorKey][field];
            }
            return updatedErrors;
        });
    }, [setFormData]);


    const getError = (parentIndex) => {
        return errors[`customerBGList_${parentIndex}`] || '';
    };


    const closeChild = () => { setIsChildVisible(false) }


    return (
        <div className="container-fluid p-0">
            <div className="w-100 m-0 p-0">
                <div className="table-responsive scroll-container" >
                    <table className="table table-bordered">
                        <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                <th></th>
                                <th>Agrmt. Effective From</th>
                                <th>Validity Period</th>
                                <th>Valid Upto</th>
                                <th>BG No<TableRequired /></th>
                                <th>BG Date</th>
                                <th>Issuing Bank</th>
                                <th>Branch Name</th>
                                <th>BG Value</th>
                                <th>BG Valid Form</th>
                                <th>BG Valid To</th>
                                <th>Date of Comm.</th>
                                <th>Comm. Ref No</th>
                                <th>Comm. Ref Date</th>
                            </tr>
                        </thead>
                        <tbody className="child_item">
                            {customerBGList.length > 0 && customerBGList?.map((row, parentIndex) => (
                                <React.Fragment key={parentIndex}>
                                    <tr>
                                        <td className="d-flex justify-content-center space-between">

                                            {/* <button
                                            className="btn btn-default btn-sm"
                                            // onClick={() => handleEditPopupOpen(item)}
                                        >
                                            <FaEdit className="icon" />
                                        </button> */}
                                            <FaTimes
                                                className="text-danger crossDel"
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to remove?")) {
                                                        handleRemoveParent(parentIndex);
                                                    }
                                                }}
                                            />


                                            <FaEdit className="icon mr-2" onClick={() => handleEditPopupOpen(row,parentIndex)} />
                                            {/* <button
                                            className="btn btn-default btn-sm"
                                            onClick={() => printReport(item)}
                                        >
                                            <FaPrint className="icon" />
                                        </button> */}
                                        </td>
                                        {/* <td>
                                            {parentIndex !== 0 ? (
                                                <FaTimes
                                                    className="text-danger crossDel"
                                                    onClick={() => handleRemoveParent(parentIndex)}
                                                />
                                            ) : (
                                                <FaTimes
                                                    className="text-muted crossDel-disabled"
                                                    style={{ cursor: 'not-allowed', opacity: 0.5 }}
                                                    onClick={() => { }}
                                                />
                                            )}
                                            <FaTimes
                                                className="text-danger crossDel"
                                                onClick={() => handleRemoveParent(parentIndex)}
                                            />
                                             

                                        </td> */}
                                        <td>{row.agreementEffectiveFrom}</td>
                                        <td>{row.validityPeriod}</td>
                                        <td>{row.validUpto}</td>
                                        <td>{row.bgNo}</td>
                                        <td>{row.bgDate}</td>
                                        <td>{row.issuingBank}</td>
                                        <td>{row.bankBranchName}</td>
                                        <td>{row.bgValue}</td>
                                        <td>{row.bgValidityFrom}</td>
                                        <td>{row.bgValidityTo}</td>
                                        <td>{row.dateOfCommunication}</td>
                                        <td>{row.commRefNumber}</td>
                                        <td>{row.commRefDate}</td>
                                    </tr>

                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
                    <FaPlus className="me-1" /> Add Row
                </button>
                {isChildVisible && <ChildModalEntryScreen isEdit={isEdit} isParentIndex={indexNo} formData={formData} setFormData={setFormData} rowItem={currentChild} hasError={hasError} errors={errors} setErrors={setErrors} onClose={closeChild}> </ChildModalEntryScreen>}

            </div>
        </div>
    );
};



const areEqual = (prevProps, nextProps) => {
    return (prevProps.customerBGList === nextProps.customerBGList && prevProps.errors === nextProps.errors && prevProps.stateOptions === nextProps.stateOptions && prevProps.itemOptions === nextProps.itemOptions);
};




export default React.memo(BGChildEntryScreen, areEqual); 