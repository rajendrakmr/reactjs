import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import InputField from "../../../../components/InputField";
import Select from "react-select";
import Loader from '../../../../components/Loader';
import { customStyles } from './helper';
import { customSelectOption } from '../../../../utils/helper';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputFormField from '../../../../components/formComponent/InputFormField';
import ModalForm from '../../../../components/ModalForm';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse, depoOptions }) => {

  const [statusOptions, setStatusOptions] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    setStatusOptions([
      { value: "Y", label: "Active" },
      { value: "N", label: "In Active" },
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
      title="Depo Wise Job Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
      <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "10vh" }}>

        <div className="row py-2 pb-5 _rkContentBorder" >
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
            error={setSelectError('depoCode')}
            id="depoCode"
            name="depoCode"
            value={formData.depoCode}
            options={depoOptions}
            label="Depot Code"
            required={true}
          />

          <InputFormField label="Job Code" name="jobCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="8" />

          <InputFormField label="Job Description" name="jobDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          {
            isEdit && (
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'isActive')}
                error={setSelectError('isActive')}
                id="isActive"
                name="isActive"
                value={formData.isActive}
                options={statusOptions}
                label="Status"
                required={true}
              />
            )
          }


        </div>
      </div>
    </ModalForm>
  );
});

export default AddEditEntry;