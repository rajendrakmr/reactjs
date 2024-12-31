import React, { useState, useCallback } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';

import InputDateCellField from '../../../../components/table/form/InputDateCellField';
import ChildEntryScreen from './ChildEntryScreen';

const ChildIndentEntryScreen = ({ indentItemChildList, setFormData, errors, setErrors, hasError, isEdit, formData }) => {


  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [isChildVisible, setIsChildVisible] = useState(false)
  const [currentChild, setCurrentChild] = useState({})
  const [indexNo, setIndexNo] = useState(null)

  const handleAddRow = () => {
    setIndexNo()
    setIsChildVisible(true)

    const newRow = {
      depoCode: "",
      itemCode: "",
      jobCode: "",
      unitCode: "",
      Pg: "",
      lastPoDate: "",
      lastPoRate: "",
      quantity: "",
      outstandingIndentNo: "",
      outstandingIndentDate: "",
      outstandingPoNo: "",
      outstandingPoDate: "",
      specialInstruction: "",
      remarks: "",
      modeOfTender: "",
      vendorDetails: "",
      indentItemChildOfChildList: [
        {
          balanceStock: "",
          cpSi: "",
          cpLast3Yr: "",
          cpLast1Yr: "",
          reorderLevel: ""
        }
      ]
    };
    setCurrentChild(newRow)
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.indentItemChildList];
      updatedIndentItemList.push({
        ...newRow,
      });
      return { ...prevData, indentItemChildList: updatedIndentItemList };
    });
  };


  const closeChild = () => { setIsChildVisible(false) }
  const childEdit = (row, index) => {
    setCurrentChild(row, index)
    setIndexNo(index)
    setIsChildVisible(true)
  }




  //remove parent sub added child
  const handleRemoveParent = (parentIndex) => {
    const newRow = {
      depoCode: "",
      itemCode: "",
      jobCode: "",
      unitCode: "",
      Pg: "",
      lastPoDate: "",
      lastPoRate: "",
      quantity: "",
      outstandingIndentNo: "",
      outstandingIndentDate: "",
      outstandingPoNo: "",
      outstandingPoDate: "",
      specialInstruction: "",
      remarks: "",
      modeOfTender: "",
      vendorDetails: "",
      indentItemChildOfChildList: [
        {
          balanceStock: "",
          cpSi: "",
          cpLast3Yr: "",
          cpLast1Yr: "",
          reorderLevel: ""
        }
      ]
    };

    setFormData((prevData) => {
      const { indentItemChildList } = prevData;
      const updatedIndentItemList = indentItemChildList.length > 1 ? indentItemChildList.filter((_, index) => index !== parentIndex) : [];

      return {
        ...prevData,
        indentItemChildList: updatedIndentItemList
      };
    });
  };




  const toggleItemConsumption = (index) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  const getError = useCallback((parentIndex, childIndex, field) => {
    if (parentIndex !== undefined && childIndex !== undefined) {
      const parentErrors = errors[`indentItemChildList_${parentIndex}`];
      return parentErrors?.[`indentItemChildOfChildList_${childIndex}`] || '';
    }

    if (parentIndex !== undefined && field !== undefined) {
      return errors[`indentItemChildList_${parentIndex}`]?.[field] || '';
    }

    return errors[`indentItemChildList_${parentIndex}`] || '';
  }, [errors]);

  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`indentItemChildList_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);




  const handleChildOfChildInputChange = (e, parentIndex, childIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemChildList = [...prevData.indentItemChildList];
      const updatedChildOfChildList = [...updatedIndentItemChildList[parentIndex].indentItemChildOfChildList];

      updatedChildOfChildList[childIndex] = {
        ...updatedChildOfChildList[childIndex],
        [field]: value
      };

      updatedIndentItemChildList[parentIndex] = {
        ...updatedIndentItemChildList[parentIndex],
        indentItemChildOfChildList: updatedChildOfChildList
      };

      return {
        ...prevData,
        indentItemChildList: updatedIndentItemChildList
      };
    });
  };


  const validateItems = () => {
    let errors = [];

    indentItemChildList.forEach((item, index) => {
      let itemErrors = {};
      if (!item.depoCode) itemErrors.depoCode = "Depo Code is required.";
      if (!item.itemCode) itemErrors.itemCode = "Item Code is required.";
      if (!item.quantity) itemErrors.quantity = "Quantity is required.";
      if (!item.unitCode) itemErrors.unitCode = "Unit Code is required.";

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors; // Save errors for this row
      }
    });

    return errors;
  };

  const errorsChecker = validateItems();

  // Check if there are any errors
  const hasErrors = Object.keys(errors).some(key => {
    if (key.startsWith('indentItemChildList_')) {
      return Object.keys(errors[key]).length > 0;
    }
    return false;
  })




  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                <th>Depo<TableRequired /></th>
                <th>Item<TableRequired /></th>
                <th>Unit<TableRequired /></th>
                <th>Quantity<TableRequired /></th>
                <th>Last PO No </th>
                <th>Last PO Date</th>
                <th>Last PO Rate</th>
                <th>Outstanding Indent No </th>
                <th>Outstanding Indent Date </th>
                <th>Outstanding PO No </th>
                <th>Outstanding PO Date </th>
                <th>Special Instruction </th>
                <th>Mode of Tender</th>
                <th>Vendor Details</th>
                {/* <th>Remarks</th> */}
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody className="child_item">
              {indentItemChildList.length > 0 ? (
                indentItemChildList.map((row, parentIndex) => (
                  <React.Fragment key={parentIndex}>
                    <tr>
                      <td className="d-flex justify-content-around wide-input1">
                        <FaTimes
                          className="text-danger"
                          style={isEdit ? { cursor: 'not-allowed', opacity: 0.5 } : {}}
                          onClick={() => {
                            if (!isEdit) {
                              const confirmRemoval = window.confirm("Are you sure want to remove item?");
                              if (confirmRemoval) {
                                handleRemoveParent(parentIndex);
                              }
                            }
                          }}
                        />

                        {<FaEdit className="icon ml-2 pl-3" onClick={() => childEdit(row, parentIndex)} />}
                        {expandedRowIndex === parentIndex ? (
                          <FaChevronCircleUp onClick={() => toggleItemConsumption(parentIndex)} />
                        ) : (
                          <FaChevronCircleDown onClick={() => toggleItemConsumption(parentIndex)} />
                        )}
                      </td>
                      <td>{row.depoCode}{row.depoName ? ' - ' + row.depoName : ''}</td>
                      <td>{row.itemCode}{row.itemDescription ? ' - ' + row.itemDescription : ''}</td>
                      <td>{row.unitCode}{row.unitDesc ? ' - ' + row.unitDesc : ''}</td>
                      <td>{row.quantity}</td>
                      <td>{row.lastPoNo}</td>
                      <td>{row.lastPoDate}</td>
                      <td>{row.lastPoRate}</td>
                      <td>{row.outstandingIndentNo}</td>
                      <td>{row.outstandingIndentDate}</td>
                      <td>{row.outstandingPoNo}</td>
                      <td>{row.outstandingPoDate}</td>
                      <td>{row.specialInstruction}</td>
                      <td>{row.modeOfTender}</td>
                      <td>{row.vendorDetails}</td>
                    </tr>
                    {expandedRowIndex === parentIndex && (
                      <tr style={{ backgroundColor: '#32ab9b' }}>
                        <td colSpan="5" className="hiddenRow">
                          <table className="table table-striped">
                            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#0a4230' }}>
                              <tr>
                                <th></th>
                                <th>Balance Stock</th>
                                <th>CP from Inception</th>
                                <th>CP Last 1 Year</th>
                                <th>CP Last 3 Years</th>
                                <th>Reorder Level</th>
                              </tr>
                            </thead>
                            <tbody className="child_item">
                              {row.indentItemChildOfChildList.map((childRow, childIndex) => (
                                <tr key={childIndex} >
                                  <td></td>
                                  <InputCellField value={childRow.balanceStock} onChange={(e) => handleChildOfChildInputChange(e, parentIndex, childIndex, 'balanceStock')} name="balanceStock" errorMsg={getError(parentIndex, childIndex)} className="wide-input1" disabled={true} />
                                  <InputCellField value={childRow.cpSi} onChange={(e) => handleChildOfChildInputChange(e, parentIndex, childIndex, 'cpSi')} name="cpSi" errorMsg={getError(parentIndex, childIndex)} className="wide-input1" disabled={true} />
                                  <InputCellField value={childRow.cpLast1Yr} onChange={(e) => handleChildOfChildInputChange(e, parentIndex, childIndex, 'cpLast1Yr')} name="cpLast1Yr" errorMsg={getError(parentIndex, childIndex)} className="wide-input1" disabled={true} />
                                  <InputCellField value={childRow.cpLast3Yr} onChange={(e) => handleChildOfChildInputChange(e, parentIndex, childIndex, 'cpLast3Yr')} name="cpLast3Yr" errorMsg={getError(parentIndex, childIndex)} className="wide-input1" disabled={true} />
                                  <InputCellField value={childRow.reorderLevel} onChange={(e) => handleChildOfChildInputChange(e, parentIndex, childIndex, 'reorderLevel')} name="reorderLevel" errorMsg={getError(parentIndex, childIndex)} className="wide-input1" disabled={true} />
                                </tr>
                              ))
                              }
                            </tbody>
                            <tr>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="15" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    No items added yet
                  </td>
                </tr>

              )}

              {hasErrors && <tr>
                <td colSpan="15" style={{ textAlign: 'center', verticalAlign: 'middle',border:"none" }}>
                  <span className="text-danger" style={{ fontSize: "11px", marginTop: "0" }}>Please fill item details mandotory field before proceeding.</span>
                </td>
              </tr>}

            </tbody>
          </table>
        </div>
        {
          !isEdit && <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
            <FaPlus className="me-1" /> Add Row
          </button>
        }


        {isChildVisible && <ChildEntryScreen isEdit={isEdit} isParentIndex={indexNo} formData={formData} setFormData={setFormData} rowItem={currentChild} hasError={hasError} errors={errors} setErrors={setErrors} onClose={closeChild}> </ChildEntryScreen>}


      </div>
    </div>
  );
};





const areEqual = (prevProps, nextProps) => {

  if (prevProps.errors !== nextProps.errors) {
    return false;
  }
  if (prevProps.indentItemChildList.length !== nextProps.indentItemChildList.length) {
    return false;
  }

  for (let i = 0; i < prevProps.indentItemChildList.length; i++) {
    const prevItem = prevProps.indentItemChildList[i];
    const nextItem = nextProps.indentItemChildList[i];

    if (
      prevItem.depoCode !== nextItem.depoCode ||
      prevItem.depoDescription !== nextItem.depoDescription ||
      prevItem.itemCode !== nextItem.itemCode ||
      prevItem.jobCode !== nextItem.jobCode ||
      prevItem.unitCode !== nextItem.unitCode ||
      prevItem.lastPoNo !== nextItem.lastPoNo ||
      prevItem.lastPoDate !== nextItem.lastPoDate ||
      prevItem.lastPoRate !== nextItem.lastPoRate ||
      prevItem.quantity !== nextItem.quantity ||
      prevItem.outstandingIndentNo !== nextItem.outstandingIndentNo ||
      prevItem.outstandingIndentDate !== nextItem.outstandingIndentDate ||
      prevItem.outstandingPoNo !== nextItem.outstandingPoNo ||
      prevItem.outstandingPoDate !== nextItem.outstandingPoDate ||
      prevItem.specialInstruction !== nextItem.specialInstruction ||
      prevItem.remarks !== nextItem.remarks ||
      prevItem.modeOfTender !== nextItem.modeOfTender ||
      prevItem.vendorDetails !== nextItem.vendorDetails ||
      !compareChildOfChildList(prevItem.indentItemChildOfChildList, nextItem.indentItemChildOfChildList)
    ) {
      return false;
    }
  }

  return true;
};


const compareChildOfChildList = (prevList, nextList) => {
  if (prevList.length !== nextList.length) {
    return false;
  }

  for (let i = 0; i < prevList.length; i++) {
    const prevChild = prevList[i];
    const nextChild = nextList[i];

    if (
      prevChild.balanceStock !== nextChild.balanceStock ||
      prevChild.cpSi !== nextChild.cpSi ||
      prevChild.cpLast3Yr !== nextChild.cpLast3Yr ||
      prevChild.cpLast1Yr !== nextChild.cpLast1Yr ||
      prevChild.reorderLevel !== nextChild.reorderLevel
    ) {
      return false;
    }
  }

  return true;
};


export default React.memo(ChildIndentEntryScreen, areEqual); 