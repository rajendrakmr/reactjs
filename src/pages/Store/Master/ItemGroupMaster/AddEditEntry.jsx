import React, { useCallback, memo, useState, useEffect } from 'react'; 
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ModalForm from '../../../../components/ModalForm';
import { statusCodeOptions } from '../../../helperFun';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

 
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
      title="Item Group Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
      <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "10vh" }}>

        <div className="row py-2 pb-5 _rkContentBorder" >
          <InputFormField label="Group Code" name="groupCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="3" />

          <InputFormField label="Group Name" name="groupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
          {
            isEdit && (
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'activeFlag')}
                error={setSelectError('activeFlag')}
                id="activeFlag"
                name="activeFlag"
                value={formData.activeFlag}
                options={statusCodeOptions}
                label="Status"
              />
            )
          }
        </div>
      </div>
    </ModalForm>
  );
});

export default AddEditEntry;