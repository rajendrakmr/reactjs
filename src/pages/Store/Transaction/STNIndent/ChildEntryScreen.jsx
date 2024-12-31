import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlus, FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';
import TableRequired from '../../../../components/TableRequired';
import { GetItemCode } from './apiService'; 
import { customSelectOption } from '../../../../utils/helper';
import SelectCellField from '../../../../components/table/form/SelectCellField';

const ChildIndentEntryScreen = ({ formData, stnIndentChildList, setFormData, errors, setErrors, isEdit, itemCodeOptions, setItemCodeOptions, jobCodeOptions }) => {
 
  const dispatch = useDispatch();

  const [itemPgNo, setItemPgNo] = useState(1);
  const [isItemLoading, setIsItemLoading] = useState(false); 


  const handleAddRow = () => {
    const newRow = {
      stnIndentSrlNo: "",
      jobCode: "",
      jobDesc: "",
      itemCode: "",
      folioNo: null,
      itemDescription: "",
      unitCode: "",
      unitDescription: "",
      binNumber: null,
      earlierBalanceStock: 0,
      reqQtyInNumber: null,
      qtyTakenOnStn: 0,
      finalBalanceStock: 0,
      remarks: "",
      indentBinBalance: 0
    };
    setFormData(prevData => ({
      ...prevData,
      stnIndentChildList: [...prevData.stnIndentChildList, newRow]
    }));
  };

  useEffect(() => {
    if (isEdit) {
      stnIndentChildList.forEach((row) => {
        if (row.itemCode) {
          const payload = {
            depoCode: formData?.indentingDivision,
            itemCode: row?.itemCode,
            pageNumber: 1,
            pageSize: 10,
          };
          GetItemCode(dispatch, setItemCodeOptions, payload);
        }
      });
    }
  }, [formData]);


  const handleRemoveParent = (parentIndex) => {
    const updatedIndentItemList = stnIndentChildList.filter((_, index) => index !== parentIndex);
    setFormData(prevData => ({
      ...prevData,
      stnIndentChildList: updatedIndentItemList
    }));
  };





  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`stnIndentChildList_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`stnIndentChildList_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);




  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { value, items } = e;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.stnIndentChildList];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
        ...items,
        earlierBalanceStock: items?.stockQuantity
      };
      return { ...prevData, stnIndentChildList: updatedIndentItemList };
    });


    if (field == 'itemCode') {
      const { items } = e;
      setFormData(prevData => {
        const updatedIndentItemList = [...prevData.stnIndentChildList];
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          folioNo: items.folioNo,
          itemDescription: items.itemDescription,
          unitCode: items.unitCode,
          unitDesc: items.unitDescription,
        };
        return { ...prevData, stnIndentChildList: updatedIndentItemList };
      });

    }

    if (field == 'jobCode') {
      const { items } = e;
      setFormData(prevData => {
        const updatedIndentItemList = [...prevData.stnIndentChildList];
        updatedIndentItemList[parentIndex] = {
          ...updatedIndentItemList[parentIndex],
          jobCode: items.jobCode,
          jobDesc: items.jobDescription,
        };
        return { ...prevData, stnIndentChildList: updatedIndentItemList };
      });

    }




    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `stnIndentChildList_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });



  }, [setFormData]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.stnIndentChildList];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };
      return { ...prevData, stnIndentChildList: updatedIndentItemList };
    });
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `stnIndentChildList_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });
  }, [setFormData]);



  // On scroll listing:

  const onMoreItemScroll = useCallback(async (item, pageNumber) => {
    setIsItemLoading(true)
    const payload = { depoCode: item?.indentingDivision, pageNumber: pageNumber + 1, pageSize: 10 }
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
                <th>Unit Code</th>
                <th>Unit Desc.</th>
                <th>Bin Number</th>
                <th>Balance Qty</th>
                <th>Req Qty<TableRequired /></th>
                <th>Job Code<TableRequired /></th>
                <th>Indent Bin Balance</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody className="child_item">
              {stnIndentChildList && stnIndentChildList.length > 0 && stnIndentChildList.map((row, parentIndex) => (
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
                      options={itemCodeOptions}
                      selectedValue={row.itemCode}
                      handleChangeSelect={handleChangeSelect}
                      onMoreScroll={() => onMoreItemScroll(formData, itemPgNo)}
                      isLoading={isItemLoading}
                      setSelectError={setSelectError}
                      pgNo={itemPgNo}
                      cName='wide-input3'
                    />


                    {/* <InputCellField value={row.itemDescription} onChange={(e) => handleChange(e, parentIndex, 'itemDescription')} name="itemDescription" errorMsg={setError(parentIndex, 'itemDescription')} className="wide-input4" disabled={true} /> */}
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input0" type="number" disabled={true} />
                    <InputCellField value={row.unitDescription} onChange={(e) => handleChange(e, parentIndex, 'unitDescription')} name="unitDescription" errorMsg={setError(parentIndex, 'unitDescription')} className="wide-input2" disabled={true} />
                    <InputCellField value={row.binNumber} onChange={(e) => handleChange(e, parentIndex, 'binNumber')} name="binNumber" errorMsg={setError(parentIndex, 'binNumber')} className="wide-input0" type="number" max="9" disabled={true} />
                    <InputCellField value={row.earlierBalanceStock} onChange={(e) => handleChange(e, parentIndex, 'earlierBalanceStock')} name="earlierBalanceStock" errorMsg={setError(parentIndex, 'earlierBalanceStock')} className="wide-input0" disabled={true} type="number" max="9" />
                    <InputCellField value={row.reqQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'reqQtyInNumber')} name="reqQtyInNumber" errorMsg={setError(parentIndex, 'reqQtyInNumber')} className="wide-input0" type="number" max="9" />


                    <SelectCellField
                      parentIndex={parentIndex}
                      field="jobCode"
                      options={jobCodeOptions}
                      selectedValue={row.jobCode}
                      handleChangeSelect={handleChangeSelect} 
                      customSelectOption={customSelectOption}
                      setSelectError={setSelectError}
                      cName='wide-input3' 
                    />

                    {/* <InputCellField value={row.jobDesc} onChange={(e) => handleChange(e, parentIndex, 'jobDesc')} name="jobDesc" className="wide-input2" disabled={true} /> */}
                    <InputCellField value={row.indentBinBalance} onChange={(e) => handleChange(e, parentIndex, 'indentBinBalance')} name="indentBinBalance" errorMsg={setError(parentIndex, 'indentBinBalance')} className="wide-input1" type="number" max="9" />

                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" className="wide-input2" errorMsg={setError(parentIndex, 'remarks')} />

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
  if (prevProps.errors !== nextProps.errors) {
    return false;
  }
  if (prevProps.stnIndentChildList.length !== nextProps.stnIndentChildList.length) {
    return false;
  }
  if (prevProps.itemCodeOptions.length !== nextProps.itemCodeOptions.length) {
    return false;
  }
  if (prevProps.jobCodeOptions.length !== nextProps.jobCodeOptions.length) {
    return false;
  }


  return true;
};



export default React.memo(ChildIndentEntryScreen, areEqual); 