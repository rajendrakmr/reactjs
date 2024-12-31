import React, { useCallback } from 'react';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';

const ChildEntryScreen = ({ challaItemSrNos, formData, setFormData, errors, setErrors, isEdit }) => {

  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`challaItemSrNos_${parentIndex}`] || '';
    }
    return errors;
  }, [errors]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    let numericValue = value;
    setFormData(prevData => {
      if (!prevData || !prevData.challaItemSrNos) {
        return prevData;
      }
      const updatedIndentItemList = [...prevData.challaItemSrNos]; 
      if (field === "qtyAccepted" || field === "qtyRejected") {
        numericValue = Number(value);
      
        const stockQuantity = updatedIndentItemList[parentIndex]?.challanQtyInNumber || 0;
        let acceptedQty = updatedIndentItemList[parentIndex]?.qtyAccepted || 0;
        let rejectedQty = updatedIndentItemList[parentIndex]?.qtyRejected || 0;
      
        if (field === "qtyAccepted") {
          // Validate that acceptedQty does not exceed stockQuantity
          if (numericValue > stockQuantity) {
            setErrors(prevErrors => {
              const updatedErrors = { ...prevErrors };
              const errorKey = `challaItemSrNos_${parentIndex}`;
              if (!updatedErrors[errorKey]) {
                updatedErrors[errorKey] = {};
              }
              updatedErrors[errorKey][field] = `Maximum qty should be ${stockQuantity}.`;
              return updatedErrors;
            }); 
            updatedIndentItemList[parentIndex] = {
              ...updatedIndentItemList[parentIndex],
              qtyAccepted: 0,
            };
            return { ...prevData, challaItemSrNos: updatedIndentItemList }; // Return early
          } else { 
            acceptedQty = numericValue;
            rejectedQty = stockQuantity - acceptedQty;  
          }
        } else if (field === "qtyRejected") {
          rejectedQty = numericValue;
          acceptedQty = stockQuantity - rejectedQty;  
        }
       
        setErrors(prevErrors => {
          const updatedErrors = { ...prevErrors };
          const errorKey = `challaItemSrNos_${parentIndex}`;
          if (updatedErrors[errorKey]) {
            delete updatedErrors[errorKey][field];
            if (Object.keys(updatedErrors[errorKey]).length === 0) {
              delete updatedErrors[errorKey];
            }
          }
          return updatedErrors;
        });
      
        // Calculate amount and final balance stock
        const amount = updatedIndentItemList[parentIndex].rate * acceptedQty;
        const finalStock = stockQuantity - acceptedQty; 
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          qtyAccepted: acceptedQty,
          qtyRejected: rejectedQty,
          amount: amount,
          finalBalanceStock: finalStock,
        };
      
        return { ...prevData, challaItemSrNos: updatedIndentItemList };
      }
      


      else {
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          [field]: numericValue,
        };
        return { ...prevData, challaItemSrNos: updatedIndentItemList };
      }


      return prevData;
    });
  }, [formData, setFormData]);



  const handleCheckboxChange = (e, parentIndex, row) => {
    const { checked } = e.target;
    const updatedChallaItemSrNos = [...challaItemSrNos];
    updatedChallaItemSrNos[parentIndex] = { ...updatedChallaItemSrNos[parentIndex], ...row, isChildSerial: checked };
    if (!checked) {
      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        const errorKey = `challaItemSrNos_${parentIndex}`;
        if (updatedErrors[errorKey]) {
          delete updatedErrors[errorKey].ordItmSrlNo;
          delete updatedErrors[errorKey].qtyRejected;
          delete updatedErrors[errorKey].qtyAccepted;
          if (Object.keys(updatedErrors[errorKey]).length === 0) {
            delete updatedErrors[errorKey];
          }
        }
        return updatedErrors;
      });
    }

    setFormData(prev => {
      return {
        ...prev,
        challaItemSrNos: updatedChallaItemSrNos
      };
    });

  };

  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                <th>Item Code</th>
                <th>Item Desc.</th>
                <th>Unit Code</th>
                <th>Challan Qty</th>
                <th>Qty Accepted <TableRequired /></th>
                <th>Qty Rejected <TableRequired /></th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody className="child_item">
              {formData?.challaItemSrNos?.length > 0 && formData?.challaItemSrNos?.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        disabled={isEdit}
                        className={`custome-input-height  custome-borde`}
                        name='isChildSerial'
                        checked={row.isChildSerial}
                        onChange={(e) => handleCheckboxChange(e, parentIndex, row)}
                      />
                    </td> 
                    <InputCellField value={row.itemCode} onChange={(e) => handleChange(e, parentIndex, 'itemCode')} name="itemCode" errorMsg={setError(parentIndex, 'itemCode')} className="wide-input1" disabled={true} />
                    <InputCellField value={row.itemDescription} onChange={(e) => handleChange(e, parentIndex, 'itemDescription')} name="itemDescription" className="wide-input5" disabled={true} />
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input" type="number" disabled={true} />
                    <InputCellField value={row.challanQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'challanQtyInNumber')} name="challanQtyInNumber" errorMsg={setError(parentIndex, 'challanQtyInNumber')} className="wide-input" type="number" max="10" disabled={true} />
                    <InputCellField value={row.qtyAccepted} onChange={(e) => handleChange(e, parentIndex, 'qtyAccepted')} name="qtyAccepted" errorMsg={setError(parentIndex, 'qtyAccepted')} className="wide-input" type="number" max="10" />
                    <InputCellField value={row.qtyRejected} onChange={(e) => handleChange(e, parentIndex, 'qtyRejected')} name="qtyRejected" errorMsg={setError(parentIndex, 'qtyRejected')} className="wide-input" type="number" max="10" disabled={true} />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input5" />
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
  return (prevProps.formData.challaItemSrNos === nextProps.formData.challaItemSrNos && prevProps.errors === nextProps.errors);
};




export default React.memo(ChildEntryScreen, areEqual); 