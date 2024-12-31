import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import InputCellField from '../../../../components/table/form/InputCellField';
import Select from "react-select";
import TableRequired from '../../../../components/TableRequired';
import { initialData } from './helper';
import { customSelectOption } from '../../../../utils/helper';
import { GetItemCode } from './apiService';

const ChildEntryScreen = ({ sisRequisitionChildList, formData, setFormData, errors, setErrors, isEdit, jobCodeOptions }) => {
  const dispatch = useDispatch();
  const [itemOptions, setItemOptions] = useState([])
  const [itemPgNo, setItemPgNo] = useState(1);
  const [isItemLoading, setIsItemLoading] = useState(false);
  //add row item
  const handleAddRow = () => {
    const newRow = initialData.sisRequisitionChildList[0];
    setFormData(prevData => ({
      ...prevData,
      sisRequisitionChildList: [...prevData.sisRequisitionChildList, newRow]
    }));
  };


  const pageEdit = async () => {
    for (const item of sisRequisitionChildList) {
      if (item.itemCode) {
        const payload = { depoCode: formData?.depoCode, itemCode: item?.itemCode, pageNumber: 1, pageSize: 10 };
        await GetItemCode(dispatch, setItemOptions, payload, false)
      }
    }
  };

  useEffect(() => { 
    if (isEdit) {
      pageEdit()
    } 
  }, []);


  const handleRemoveParent = (parentIndex) => {
    const updatedIndentItemList = sisRequisitionChildList.filter((_, index) => index !== parentIndex);
    setFormData(prevData => ({
      ...prevData,
      sisRequisitionChildList: updatedIndentItemList
    }));
  };



  const setError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`sisRequisitionChildList_${parentIndex}`] || '';
    }

    return errors;
  }, [errors]);


  const setSelectError = useCallback((parentIndex, field) => {
    if (parentIndex !== undefined && field !== undefined) {
      return errors[`sisRequisitionChildList_${parentIndex}`]?.[field] || '';
    }
    return errors;
  }, [errors]);




  const handleChangeSelect = useCallback(async (e, parentIndex, field) => {
    const { items, value } = e;
    const setItem = {};
    if (field == 'jobCode') {
      await GetItemCode(dispatch, setItemOptions, { depoCode: items?.depoCode, pageNumber: 1, pageSize: 10 }, false)
      setItem.jobDesc = items?.jobDescription
      setItem.jobCode = value
    }
    if (field == 'itemCode') {
      setItem.itemDescription = items?.itemDescription
      setItem.itemCode = value
    }
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.sisRequisitionChildList];
      updatedIndentItemList[parentIndex] = {
        ...items,
        ...updatedIndentItemList[parentIndex],
        ...setItem
      };
      return { ...prevData, sisRequisitionChildList: updatedIndentItemList };
    });

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `sisRequisitionChildList_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });



  }, [setFormData]);


  const handleChange = useCallback((e, parentIndex, field) => {
    const { value } = e.target;
    setFormData(prevData => {
      const updatedIndentItemList = [...prevData.sisRequisitionChildList];
      updatedIndentItemList[parentIndex] = {
        ...updatedIndentItemList[parentIndex],
        [field]: value,
      };
      return { ...prevData, sisRequisitionChildList: updatedIndentItemList };
    });
    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      const errorKey = `sisRequisitionChildList_${parentIndex}`;
      if (updatedErrors[errorKey] && updatedErrors[errorKey][field]) {
        delete updatedErrors[errorKey][field];
      }
      return updatedErrors;
    });
  }, [setFormData]);



  const onMoreItemScroll = useCallback(async (itemRow, pageNumber) => {
    
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: itemRow?.depoCode, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetItemCode(dispatch, setItemOptions, payload, true)
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
                <th>Job Code<TableRequired /></th>
                <th>Job Desc</th>
                <th>Item Code<TableRequired /></th>
                <th>Item Desc</th>
                <th>Unit Code</th>
                <th>Unit Desc.</th>
                <th>Requistion Quantity<TableRequired /></th>
                <th>Chargable Head</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {sisRequisitionChildList.length > 0 && sisRequisitionChildList?.map((row, parentIndex) => (
                <React.Fragment key={parentIndex}>
                  <tr>
                    <td>
                      {parentIndex !== 0 && (
                        <button className="btn-danger" onClick={() => handleRemoveParent(parentIndex)}>
                          <FaTimes />
                        </button>
                      )}
                    </td>

                    <td className="custom-dropdown-container">
                      <Select
                        className={`custome-input-height wide-input1 ${setSelectError(parentIndex, 'itemCode') ? "is-invalid" : ""}`}
                        id="jobCode"
                        name="jobCode"
                        options={jobCodeOptions}
                        value={jobCodeOptions.find(option => option.value == row.jobCode)}
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, parentIndex, 'jobCode')}
                        menuPortalTarget={document.body}
                        styles={customSelectOption}
                      />
                      {setSelectError(parentIndex, 'jobCode') && (
                        <span className="text-danger">
                          {setSelectError(parentIndex, 'jobCode')}
                        </span>
                      )}
                    </td>
                    <InputCellField value={row.jobDesc} onChange={(e) => handleChange(e, parentIndex, 'jobDesc')} name="jobDesc" errorMsg={setError(parentIndex, 'jobDesc')} className="wide-input4" disabled={true} />
                    <td className="custom-dropdown-container">

                      <Select
                        className={`custome-input-height wide-input1 ${setSelectError(parentIndex, 'itemCode') ? "is-invalid" : ""}`}
                        id="itemCode"
                        name="itemCode"
                        onMenuScrollToBottom={() => onMoreItemScroll(row, itemPgNo)}
                        options={itemOptions}
                        isLoading={isItemLoading}
                        value={itemOptions.find(option => option.value == row.itemCode)}
                        onChange={(selectedOption) => handleChangeSelect(selectedOption, parentIndex, 'itemCode')}
                        menuPortalTarget={document.body}
                        styles={customSelectOption}
                      />

                      {setSelectError(parentIndex, 'itemCode') && (
                        <span className="text-danger">
                          {setSelectError(parentIndex, 'itemCode')}
                        </span>
                      )}
                    </td>
                    <InputCellField value={row.itemDescription} onChange={(e) => handleChange(e, parentIndex, 'itemDescription')} name="itemDescription" errorMsg={setError(parentIndex, 'itemDescription')} className="wide-input4" disabled={true} />
                    <InputCellField value={row.unitCode} onChange={(e) => handleChange(e, parentIndex, 'unitCode')} name="unitCode" errorMsg={setError(parentIndex, 'unitCode')} className="wide-input" type="number" max="5" disabled={true} />
                    <InputCellField value={row.unitDescription} onChange={(e) => handleChange(e, parentIndex, 'unitDescription')} name="unitDescription" errorMsg={setError(parentIndex, 'unitDescription')} className="wide-input4" disabled={true} />
                    <InputCellField value={row.reqQtyInNumber} onChange={(e) => handleChange(e, parentIndex, 'reqQtyInNumber')} name="reqQtyInNumber" errorMsg={setError(parentIndex, 'reqQtyInNumber')} className="wide-input" type="number" max="10" />
                    <InputCellField value={row.chargableHead} onChange={(e) => handleChange(e, parentIndex, 'chargableHead')} name="chargableHead" errorMsg={setError(parentIndex, 'chargableHead')} className="wide-input1" />
                    <InputCellField value={row.remarks} onChange={(e) => handleChange(e, parentIndex, 'remarks')} name="remarks" errorMsg={setError(parentIndex, 'remarks')} className="wide-input1" />



                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <button className="custome-background-color1 mt-2" onClick={handleAddRow}>
          Add Row
        </button>
      </div>
    </div>
  );
};



const areEqual = (prevProps, nextProps) => { 
  return (prevProps.sisRequisitionChildList === nextProps.sisRequisitionChildList && prevProps.errors === nextProps.errors && prevProps.jobCodeOptions === nextProps.jobCodeOptions && prevProps.itemOptions === nextProps.itemOptions);
};




export default React.memo(ChildEntryScreen, areEqual); 