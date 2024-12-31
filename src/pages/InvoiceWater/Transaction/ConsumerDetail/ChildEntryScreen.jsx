import React, { useCallback } from 'react'; 
import { FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField'; 
import TableRequired from '../../../../components/TableRequired'; 
import SelectCellField from '../../../../components/table/form/SelectCellField';

const ChildEntryScreen = ({ challanIssueChildren, setFormData, formData, orderCodeOptions, errors, setErrors, isEdit, jobCodeOptions }) => {
  

  //add row item
  const handleAddRow = () => {
    const newRow = {
      challansrlNo: null,
      ordItmSrlNo: null,
      jobCode: "",
      jobDesc: null,
      itemCode: "1232",
      itemDesc: "12333332",
      folioNo: null,
      challanQtyInNumber: null,
      unitCode: "",
      unitDescription: "",
      discrepancyNoted: "",
      qtyFinallyAccepted: null,
      location: "",
      remarks: ""
    };

    setFormData(prevData => ({
      ...prevData,
      challanDetails: [...prevData.challanDetails, newRow]
    }));
  };


 


  const handleRemoveParent = (parentIndex) => {
    const updatedIndentItemList = challanIssueChildren.filter((_, index) => index !== parentIndex);
    setFormData(prevData => ({
      ...prevData,
      challanDetails: updatedIndentItemList
    }));
  };



  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`challanDetails_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`challanDetails_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);




  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { items ,value} = e;
    const setData ={}
    if(field =="itemCode"){ 
      setData.ordItmSrlNo = items.ordItmsrlNo
      // setData.itemCode =items.ordItemCode?items.ordItemCode:null
      // setData.itemDesc =items.itemDesc?items.itemDesc:"" 
      setData.unitDiscription =items.unitDiscription
      setData.unitCode =items.unitCode
      
    
    }
    
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.challanDetails];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        ...setData,
        [field]:value
      };
      return { ...prevData, challanDetails: updatedIndentItemList };
    });

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `challanDetails_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });



  }, [setFormData]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.challanDetails];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };
      return { ...prevData, challanDetails: updatedIndentItemList };
    });
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `challanDetails_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });
  }, [setFormData]);










  return (
    <div className="container-fluid p-0">
      <div className="w-100 m-0 p-0">
        <div className="table-responsive scroll-container" style={{ maxHeight: "40vh", overflowY: "auto" }}>
          <table className="table table-bordered">
            <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th></th>
                {/* <th>Ord Item Sr No<TableRequired /></th> */}
                <th>Item Code <TableRequired /></th>
                <th>Unit Code</th>
                <th>Job Code<TableRequired /></th>
                <th>Challan Qty<TableRequired /></th>
                <th>Discrepancy Noted</th>
                <th>Qty Final</th>
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
                      options={orderCodeOptions}
                      selectedValue={row.itemCode}
                      handleChangeSelect={handleChangeSelect}
                      setSelectError={setSelectError}
                      isEdit={isEdit}
                      cName='wide-input3'
                    />
                    {/* <InputCellField value={`${row?.itemCode} ${row?.itemDesc}`} onChange={(e) => handleChange(e, parentIndex, 'itemCode')} name="itemCode" errorMsg={setError(parentIndex, 'itemCode')} className="wide-input3" disabled={true} /> */}
                    <InputCellField value={`${row?.unitCode} ${row?.unitDescription}`} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input1" disabled={true} />
                    <SelectCellField
                      parentIndex={parentIndex}
                      field="jobCode"
                      options={jobCodeOptions}
                      selectedValue={row.jobCode}
                      handleChangeSelect={handleChangeSelect}
                      setSelectError={setSelectError}
                      isEdit={isEdit}
                      cName='wide-input3'
                    />
                    <InputCellField value={row.challanQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'challanQtyInNumber')} name="challanQtyInNumber" errorMsg={setError(parentIndex, 'challanQtyInNumber')} className="wide-input0" type="number" max="10" />


                    <InputCellField value={row.discrepancyNoted} onChange={(e) => handleChange(e, parentIndex, 'discrepancyNoted')} name="discrepancyNoted" className="wide-input3" />
                    <InputCellField value={row.qtyFinallyAccepted} onChange={(e) => handleChange(e, parentIndex, 'qtyFinallyAccepted')} name="qtyFinallyAccepted" errorMsg={setError(parentIndex, 'qtyFinallyAccepted')} className="wide-input0" type="number" max="10" />
                    <InputCellField value={row.location} onChange={(e) => handleChange(e, parentIndex, 'location')} name="location" errorMsg={setError(parentIndex, 'location')} className="wide-input3" />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input3" />

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
  return (prevProps.orderCodeOptions === nextProps.orderCodeOptions && prevProps.jobCodeOptions === nextProps.jobCodeOptions && prevProps.challanIssueChildren === nextProps.challanIssueChildren && prevProps.errors === nextProps.errors && prevProps.itemOptions === nextProps.itemOptions);
};




export default React.memo(ChildEntryScreen, areEqual); 