import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField'; 
import TableRequired from '../../../../components/TableRequired';
import { initialData } from './helper'; 
import { GetItemCode } from './apiService';
import SelectCellField from '../../../../components/table/form/SelectCellField';

const ChildEntryScreen = ({ challanIssueChildren, setFormData,formData, errors, setErrors, isEdit, itemOptions, setItemCodeOptions }) => {
  const dispatch = useDispatch();

  const [itemPgNo, setItemPgNo] = useState(1);
  const [isItemLoading, setIsItemLoading] = useState(false);

  //add row item
  const handleAddRow = () => {
    const newRow = initialData.challanIssueChildren[0];

    setFormData(prevData => ({
      ...prevData,
      challanIssueChildren: [...prevData.challanIssueChildren, newRow]
    }));
  };

 


  const handleRemoveParent = (parentIndex) => {
    const updatedIndentItemList = challanIssueChildren.filter((_, index) => index !== parentIndex);
    setFormData(prevData => ({
      ...prevData,
      challanIssueChildren: updatedIndentItemList
    }));
  };



  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`challanIssueChildren_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`challanIssueChildren_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);




  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { items } = e;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.challanIssueChildren];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        itemCode: items.itemCode,
        itemDesc: items.itemDescription,
        folioNo: items.folioNo,
        unitCode: items.unitCode,
        unitDesc: items.unitDescription,
        balanceStock: items.balanceQty,
        rate: items.wtAvgRate
      };
      return { ...prevData, challanIssueChildren: updatedIndentItemList };
    });

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `challanIssueChildren_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });



  }, [setFormData]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.challanIssueChildren];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };
      return { ...prevData, challanIssueChildren: updatedIndentItemList };
    });
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `challanIssueChildren_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });
  }, [setFormData]);





 


  const onMoreItemScroll = useCallback(async (item, pageNumber) => {
    setIsItemLoading(true)
    const payload = { depoCode: item?.depoCode, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetItemCode(dispatch, setItemCodeOptions, payload, true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                <th>Item Code  <TableRequired /></th> 
                <th>Issue Qty</th>
                <th>Balance Qty.</th>
                <th>Unit Code</th>
                <th>Unit Desc.</th>
                <th>Requistion Qty  <TableRequired /></th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Location</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody className="child_item">
              {challanIssueChildren.length > 0 && challanIssueChildren.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <td>
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

                    </td>

                    <SelectCellField
                      parentIndex={parentIndex}
                      field="itemCode"
                      options={itemOptions}
                      selectedValue={row.itemCode}
                      handleChangeSelect={handleChangeSelect}
                      onMoreScroll={() => onMoreItemScroll(formData, itemPgNo)}
                      isLoading={isItemLoading}
                      setSelectError={setSelectError}
                      pgNo={itemPgNo}
                      isEdit={isEdit}
                      cName='wide-input3'
                    /> 
                    <InputCellField value={row.challanQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'challanQtyInNumber')} name="challanQtyInNumber" errorMsg={setError(parentIndex, 'challanQtyInNumber')} className="wide-input0" type="number" disabled={true} />
                    <InputCellField value={row.balanceStock} onChange={(e) => handleChange(e, parentIndex, 'balanceStock')} name="balanceStock" errorMsg={setError(parentIndex, 'balanceStock')} className="wide-input0" disabled={true} />
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input" type="number" disabled={true} />
                    <InputCellField value={row.unitDesc} onChange={(e) => handleChange(e, parentIndex, 'unitDesc')} name="unitDesc" errorMsg={setError(parentIndex, 'unitDesc')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.requistionQty} onChange={(e) => handleChange(e, parentIndex, 'requistionQty')} name="requistionQty" errorMsg={setError(parentIndex, 'requistionQty')} className="wide-input1" type="number" max="10" />


                    <InputCellField value={row.rate} onChange={(e) => handleChange(e, parentIndex, 'rate')} name="rate" className="wide-input0" disabled={true} />
                    <InputCellField value={row.amount} onChange={(e) => handleChange(e, parentIndex, 'amount')} name="amount" errorMsg={setError(parentIndex, 'amount')} className="wide-input0" disabled={true} />
                    <InputCellField value={row.location} onChange={(e) => handleChange(e, parentIndex, 'location')} name="location" errorMsg={setError(parentIndex, 'location')} className="wide-input1" type="number" disabled={true} />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input5"   />

                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <button className="custome-background-color1 addIconStyle" onClick={handleAddRow}>
          <FaPlus className="me-1" /> Add Row
        </button>
      </div>
    </div>
  );
};



const areEqual = (prevProps, nextProps) => {
  return (prevProps.challanIssueChildren === nextProps.challanIssueChildren && prevProps.errors === nextProps.errors && prevProps.itemOptions === nextProps.itemOptions);
};




export default React.memo(ChildEntryScreen, areEqual); 