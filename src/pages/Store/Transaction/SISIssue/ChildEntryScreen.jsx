import React, { useCallback } from 'react';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';

const ChildEntryScreen = ({ formData, setFormData, errors, setErrors }) => { 
  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`sisIssueChildList_${parentIndex}`] || '';
    }
    return errors;
  }, [errors]);
  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    let numericValue = value;
    setFormData(prevData => {
      if (!prevData || !prevData.sisIssueChildList) {
        return prevData;
      }
      const updatedIndentItemList = [...prevData.sisIssueChildList];
      let amount = updatedIndentItemList[parentIndex]?.amount || 0;
      let finalStock = updatedIndentItemList[parentIndex]?.finalBalanceStock ?? 0;

      if (field == "issueQtyInNumber" || field == "binBalance" ) {
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
            const errorKey = `sisIssueChildList_${parentIndex}`;
            if (!updatedErrors[errorKey]) {
              updatedErrors[errorKey] = {};
            }
            updatedErrors[errorKey][field] = `Maximum issue qty should be ${stockQuantity}.`;
            return updatedErrors;
          });

        } else {
          setErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            const errorKey = `sisIssueChildList_${parentIndex}`;
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
        return { ...prevData, sisIssueChildList: updatedIndentItemList };
      }else{
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          [field]: numericValue, 
        };
        return { ...prevData, sisIssueChildList: updatedIndentItemList };
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
                <th>Unit Description</th>
                <th>Req Qty</th>
                <th>Issue Qty<TableRequired /></th>
                <th>Bin Balance</th>
                <th>Balance Qty.</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody className="child_item">
              {formData?.sisIssueChildList?.length > 0 && formData?.sisIssueChildList.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <InputCellField value={row.itemCode} onChange={(e) => handleChange(e, parentIndex, 'itemCode')} name="itemCode" errorMsg={setError(parentIndex, 'itemCode')} className="wide-input1" type="number" disabled={true} />
                    <InputCellField value={row.itemDescription} onChange={(e) => handleChange(e, parentIndex, 'itemDesc')} name="itemDesc" errorMsg={setError(parentIndex, 'itemDesc')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input" type="number" disabled={true} />
                    <InputCellField value={row.unitDescription} onChange={(e) => handleChange(e, parentIndex, 'unitDesc')} name="unitDesc" errorMsg={setError(parentIndex, 'unitDesc')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.reqQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'reqQtyInNumber')} name="reqQtyInNumber" errorMsg={setError(parentIndex, 'reqQtyInNumber')} className="wide-input0" type="number" disabled={true} />
                    <InputCellField value={row.issueQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'issueQtyInNumber')} name="issueQtyInNumber" errorMsg={setError(parentIndex, 'issueQtyInNumber')} className="wide-input0" type="number" max="9" />
                    <InputCellField value={row.binBalance} onChange={(e) => handleChange(e, parentIndex, 'binBalance')} name="binBalance" errorMsg={setError(parentIndex, 'binBalance')} className="wide-input0" type="number" max="9" />
                    <InputCellField value={row.balanceStock} onChange={(e) => handleChange(e, parentIndex, 'balanceStock')} name="balanceStock" errorMsg={setError(parentIndex, 'balanceStock')} className="wide-input0" disabled={true} type="number" max="9" />
                    <InputCellField value={row.rate ? row.rate : 0} onChange={(e) => handleChange(e, parentIndex, 'rate')} name="rate" className="wide-input0" disabled={true} />
                    <InputCellField value={row.amount ? row.amount : 0} onChange={(e) => handleChange(e, parentIndex, 'amount')} name="amount" errorMsg={setError(parentIndex, 'amount')} className="wide-input0" disabled={true} />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input4" />
                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};



const areEqual = (prevProps, nextProps) => {
  return (prevProps.formData.sisIssueChildList === nextProps.formData.sisIssueChildList && prevProps.errors === nextProps.errors);
};

 
export default React.memo(ChildEntryScreen, areEqual); 