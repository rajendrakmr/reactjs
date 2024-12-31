import React, { useCallback } from 'react';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';



const ChildEntryScreen = ({ formData, setFormData, errors, setErrors }) => { 
  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`stnSupplyChildList_${parentIndex}`] || '';
    }
    return errors;
  }, [errors]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    let numericValue = value;
    setFormData(prevData => {
      if (!prevData || !prevData.stnSupplyChildList) {
        return prevData;
      }
      const updatedIndentItemList = [...prevData.stnSupplyChildList];
      let amount = updatedIndentItemList[parentIndex]?.amount || 0;
      let finalStock = updatedIndentItemList[parentIndex]?.finalBalanceStock ?? 0;

      if (field == "issueQtyInNumber" || field == "supplyBinBalance") {
        numericValue = Number(value)
      }
      if (field === "issueQtyInNumber") {
        const stockQuantity = updatedIndentItemList[parentIndex]?.reqQtyInNumber || 0;

        if (numericValue > stockQuantity) {
          updatedIndentItemList[parentIndex] = {
            ...updatedIndentItemList[parentIndex],
            [field]: 0,
            amount: 0,
            finalBalanceStock: stockQuantity,
          };
          setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            const errorKey = `stnSupplyChildList_${parentIndex}`;
            if (!updatedErrors[errorKey]) {
              updatedErrors[errorKey] = {};
            }
            updatedErrors[errorKey][field] = `Maximum issue qty should be ${stockQuantity}.`;
            return updatedErrors;
          });

        } else {
          setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            const errorKey = `stnSupplyChildList_${parentIndex}`;
            if (updatedErrors[errorKey]) {
              delete updatedErrors[errorKey][field];
              if (Object.keys(updatedErrors[errorKey]).length === 0) {
                delete updatedErrors[errorKey];
              }
            }
            return updatedErrors;
          });
          amount = updatedIndentItemList[parentIndex].rate * numericValue;
          finalStock = stockQuantity - numericValue;
          updatedIndentItemList[parentIndex] = {
            ...updatedIndentItemList[parentIndex],
            [field]: numericValue,
            amount: amount,
            finalBalanceStock: finalStock,
          };
        }
        return { ...prevData, stnSupplyChildList: updatedIndentItemList };
      }else{
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          [field]: numericValue, 
        };
        return { ...prevData, stnSupplyChildList: updatedIndentItemList };
      }


      return prevData;
    });
  }, [formData, setFormData]);




  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th>Item Code</th>
                <th>Item Description</th>
                <th>Unit Code</th>
                <th>Unit Desc.</th>
                <th>STN Indent Qty</th>
                <th>STN Issue Qty<TableRequired /></th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Supply Bin Balance</th>
                <th>Remarks</th>
              </tr>
            </thead>
            {formData?.stnSupplyChildList.length > 0 && <tbody className="child_item">
              {formData?.stnSupplyChildList.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <InputCellField value={row.itemCode} onChange={(e) => handleChange(e, parentIndex, 'itemCode')} name="itemCode" errorMsg={setError(parentIndex, 'itemCode')} className="wide-input1" type="number" disabled={true} />
                    <InputCellField value={row.itemDescription} onChange={(e) => handleChange(e, parentIndex, 'itemDesc')} name="itemDesc" errorMsg={setError(parentIndex, 'itemDesc')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input" type="number" disabled={true} />
                    <InputCellField value={row.unitDescription} onChange={(e) => handleChange(e, parentIndex, 'unitDesc')} name="unitDesc" errorMsg={setError(parentIndex, 'unitDesc')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.reqQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'reqQtyInNumber')} name="reqQtyInNumber" errorMsg={setError(parentIndex, 'reqQtyInNumber')} className="wide-input1" type="number" max="10" disabled={true} />
                    <InputCellField value={row.issueQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'issueQtyInNumber')} name="issueQtyInNumber" errorMsg={setError(parentIndex, 'issueQtyInNumber')} className="wide-input1" type="number" max="9" />
                    <InputCellField value={row.rate} onChange={(e) => handleChange(e, parentIndex, 'rate')} name="rate" className="wide-input0" disabled={true} />
                    <InputCellField value={row.amount} onChange={(e) => handleChange(e, parentIndex, 'amount')} name="amount" errorMsg={setError(parentIndex, 'amount')} className="wide-input0" disabled={true} />
                    <InputCellField value={row.supplyBinBalance} onChange={(e) => handleChange(e, parentIndex, 'supplyBinBalance')} name="supplyBinBalance" errorMsg={setError(parentIndex, 'supplyBinBalance')} className="wide-input1" type="number" max="10" />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input3" />

                  </tr>
                </React.Fragment>
              ))}
            </tbody>}

          </table>
        </div>

      </div>
    </div>
  );
};



const areEqual = (prevProps, nextProps) => {
  return (prevProps.formData.stnSupplyChildList === nextProps.formData.stnSupplyChildList && prevProps.errors === nextProps.errors);
};




export default React.memo(ChildEntryScreen, areEqual); 