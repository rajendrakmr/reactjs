import React, { useCallback, useEffect, memo, useState } from 'react';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ModalForm from '../../../../components/ModalForm';
import { statusOptions } from '../../../helperFun';
import { useDispatch } from 'react-redux';
import { GetAccomodatinType } from '../../CommonApiService';
import InputDateField from '../../../../components/formComponent/InputDateField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const dispatch = useDispatch();
  const [accomodationCategory, setAccomodationCategory] = useState([]);
  const [accomodationTypeOptions, setAccomodationTypeOptions] = useState([]);


  useEffect(() => {
    setAccomodationCategory([
      { label: "A-ZONE", value: "A-ZONE" },
      { label: "B-ZONE", value: "B-ZONE" },
      { label: "C-ZONE", value: "C-ZONE" },
      { label: "One Storied", value: "One Storied" },
      { label: "Three Storied", value: "Three Storied" },
      { label: "Two Storied", value: "Two Storied" },
      { label: "Two Storied (Single Unit)", value: "Two Storied (Single Unit)" }
    ])
    GetAccomodatinType(dispatch, setAccomodationTypeOptions)
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
      title="Licence Fee Rate Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >

      <div className="row py-2 pb-5 _rkContentBorder">

        <SelectFormInput
          onChange={(selectedOption) => handleChangeSelect(selectedOption, 'accommodationType')}
          error={setSelectError('accommodationType')}
          id="accommodationType"
          name="accommodationType"
          value={formData.accommodationType}
          options={accomodationTypeOptions}
          label="Accomm. Type"
          required={true}
        />

        <SelectFormInput
          onChange={(selectedOption) => handleChangeSelect(selectedOption, 'accomCategory')}
          error={setSelectError('accomCategory')}
          id="accomCategory"
          name="accomCategory"
          value={formData.accomCategory}
          options={accomodationCategory}
          label="Accomm. Category"
          required={true}
        />


        <InputFormField label="From No" name="fromNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="str" />
        <InputFormField label="To No" name="toNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="str" />

        <InputDateField label="Effective From Date" name="effectiveFromDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} isDefault={isEdit} />
        <InputDateField label="Effective To Date" minDate={formData.effectiveFromDate} name="effectiveToDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} isDefault={isEdit} />

        <InputFormField label="Rate Amount" name="rentRateAmt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />

        

        {/* {
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
        } */}


      </div>

    </ModalForm>

  );
});

export default AddEditEntry;