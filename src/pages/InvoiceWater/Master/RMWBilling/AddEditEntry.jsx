import React, { useCallback, useEffect, memo, useState } from 'react';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ModalForm from '../../../../components/ModalForm'; 
import { GetwaterCatCode } from '../../../Store/report/apiService';
import { useDispatch } from 'react-redux';
import InputDateField from '../../../../components/formComponent/InputDateField';


const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const dispatch = useDispatch();
  const [flagOptions, setFlaOptions] = useState([]);

  useEffect(() => {
    setFlaOptions([
      { value: "S", label: "S" },
      { value: "R", label: "R" }
    ])
  }, [])


  const [allWaterRateOptions, setAllWaterRateOptions] = useState([]);

  useEffect(() => {
      GetwaterCatCode(dispatch, setAllWaterRateOptions)
  }, []); 

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;  
    const setName = {};  
    
    if (field === 'waterCatCode') {
      setName.waterCatDesc = items?.waterCatDesc;  
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




  return (
    <ModalForm
      title="Rate Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
      <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "10vh" }}> 
        <div className="row py-2 pb-5 _rkContentBorder"> 
           <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'waterCatCode')}
                error={setSelectError('waterCatCode')}
                id="waterCatCode"
                name="waterCatCode"
                label="Water Cat Code"
                options={allWaterRateOptions}
                value={formData.waterCatCode}
                required={true} 
              />
          <InputFormField label="Water Cat Desc" name="waterCatDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} isDefault={true}/> 
          <InputDateField label="Effective From Date" name="effectiveFromDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <InputDateField label="Effective To Date" name="effectiveToDate" minDate={formData.effectiveFromDate} inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <InputFormField label="Rate Amount" name="rateAmt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />

         
        </div>
      </div>

    </ModalForm>

  );
});

export default AddEditEntry;