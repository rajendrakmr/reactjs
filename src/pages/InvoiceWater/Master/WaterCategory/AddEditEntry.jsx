import React, { useCallback, useEffect, memo, useState } from 'react';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ModalForm from '../../../../components/ModalForm';
import { statusCodeOptions ,statusOptions} from '../../../helperFun';


const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const [flagOptions, setFlaOptions] = useState([]);


  useEffect(() => {
    setFlaOptions([
      { value: "S", label: "S" },
      { value: "R", label: "R" }
    ])
  }, [])




  const handleChangeSelect = useCallback((e, field) => {
    const { value } = e;
    setFormData(prev => ({
      ...prev,
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
      title="Water Category Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
     
        <div className="row py-2 pb-5 _rkContentBorder">

          <InputFormField label="Water Cat Code" name="waterCatCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true}  />
          <InputFormField label="Water Cat Desc" name="waterCatDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />


          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'gstApplicable')}
            error={setSelectError('gstApplicable')}
            id="gstApplicable"
            name="gstApplicable"
            value={formData.gstApplicable}
            options={statusOptions}
            label="GST Applicable"
            required={true}
          />
          {
            isEdit && (
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'isActive')}
                error={setSelectError('isActive')}
                id="isActive"
                name="isActive"
                value={formData.isActive}
                options={statusCodeOptions}
                label="Status"
                required={true}
              />
            )
          }

       
      </div>

    </ModalForm>

  );
});

export default AddEditEntry;