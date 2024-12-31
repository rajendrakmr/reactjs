import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; 
import { GetDepoCode, GetItemCode } from './apiService';
import _ from 'lodash';
import Loader from '../../../../components/Loader';  
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import debounce from 'lodash/debounce';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {


  const dispatch = useDispatch();
  const [depoOptions, setDepoOptions] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [itemPgNo, setItemPgNo] = useState(1);
  const [dcOptions, setDCOptions] = useState([]);
  
  useEffect(() => {
    GetDepoCode(dispatch, setDepoOptions)
    setDCOptions([
      { value: 'C', label: 'C - Credit' },
      { value: 'D', label: 'D - Debit' }
    ])
    if(isEdit)
    {
      const payload = { itemCode: formData?.itemCode,depoCode: formData?.depoCode, pageNumber: 1, pageSize: 10 }
      GetItemCode(dispatch, setItemOptions, payload)
    }
  }, []);


  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;
    const setName = {}
    switch (field) {
      case 'depoCode':
        setName.depoDescripion = items?.depoDescription
        GetItemCode(dispatch, setItemOptions, { depoCode: value, pageNumber: 1, pageSize: 10 })
        break;
      default:
        break;
    }


    setFormData(prev => ({
      ...prev,
      ...items,
      ...setName,
      [field]: value
    }));

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[field]) {
        delete updatedErrors[field];
      }
      return updatedErrors;
    });
  }, [setFormData, setErrors]);

 



  const memoizedHandleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  }, [setFormData, setErrors]);


 
  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);


  const onMoreItemScroll = useCallback(async (itemRow, pageNumber) => {
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: itemRow?.depoCode, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetItemCode(dispatch, setItemOptions, payload,true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);


  const callApi = useCallback(
    debounce(async (itemCode,depoCode) => { 
        setIsItemLoading(true); 
        setItemPgNo(preNo => preNo + 0);
        const payload = { itemCode:itemCode, depoCode: depoCode, pageNumber: 0, pageSize: 10 }
        await GetItemCode(dispatch, setItemOptions, payload, true) 
        setTimeout(async () => { setIsItemLoading(false); }, 2000);
    }, 500),
    []
  );

const handleKeyDown = async(event, depoCode) => {  
    const inputValue = event.target.value; 
    if (event.key === 'Enter') { 
        await callApi(inputValue, depoCode) 
    }
    if (inputValue.length >= 8) {
      await callApi(inputValue, depoCode)
  }
};


  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Stock Adjustment" : "Add Stock Adjustment"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "35vh" }}>
            <div className="row py-2 _rkContentBorder" >
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
                error={setSelectError('depoCode')}
                id="depoCode"
                name="depoCode"
                value={formData.depoCode}
                options={depoOptions}
                label="Depot Code"
                required={true}
                isTrue={isEdit?true:false}
              />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'itemCode')}
                error={setSelectError('itemCode')}
                id="itemCode"
                name="itemCode"
                value={formData.itemCode}
                options={itemOptions}
                label="Item Code"
                onMenuScroll={onMoreItemScroll}
                pgNo={itemPgNo}
                isLoading={isItemLoading}
                onKeyDown={(event) => handleKeyDown(event, formData.depoCode)} 
                formData={formData}
                isTrue={isEdit?true:false}
                required={true}
              />


              {/* <InputFormField label="Folio No" name="folioNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} /> */}
              <InputFormField label="Item Desc" name="itemDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'debitCreditFlag')}
                error={setSelectError('debitCreditFlag')}
                id="debitCreditFlag"
                name="debitCreditFlag"
                value={formData.debitCreditFlag}
                
                options={dcOptions}
                label="Debit/Credit" 
                required={true}
              />
              <InputFormField label="Unit Code" name="unitCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Unit Desc" name="unitDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Emp Name" name="empName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Bin No" name="binNumber" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Adjusted Qty" name="adjustedQty" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
              <InputFormField label="Bin Loc Desc" name="locationBinDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Remarks" name="remarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

            </div>
          </div>
          <div className="modal-footer">
            <span className="text-danger">{errorMessage ? errorMessage : null}</span>
            <span className="text-success">{successReponse ? successReponse : null}</span>

            <button
              type="button"
              className="btn btn-sm btn-danger text-white mx-2"
              onClick={clearValidationErrors}
            >
              Close
            </button>
            <button
              type="button"
              className="btn custome-button-color1 btn-sm text-white"
              onClick={handleSubmit}
            >
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Submitting..."
                : isEdit
                  ? "Update"
                  : "Submit"}
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddEditEntry;