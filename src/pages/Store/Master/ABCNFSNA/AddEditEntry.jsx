import React, { useCallback, memo, useState, useEffect } from 'react';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ModalForm from '../../../../components/ModalForm';
import { statusCodeOptions } from '../../../helperFun';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse, analysisHeadOption }) => {

  const [analysisTypeOption, setAnalysisTypeOption] = useState([]);
  useEffect(() => {
    if (isEdit) {
      if (formData.analysisHead == "ABC") {
        setAnalysisTypeOption([{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }])
      } else {
        setAnalysisTypeOption([{ value: 'F', label: 'F' }, { value: 'S', label: 'S' }, { value: 'N', label: 'N' }])
      }
    }
  }, [])

  const handleChangeSelect = useCallback((e, field) => {
    const { value } = e;
    if (field == "analysisHead") {
      if (value == "ABC") {
        setAnalysisTypeOption([{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }])
      } else {
        setAnalysisTypeOption([{ value: 'F', label: 'F' }, { value: 'S', label: 'S' }, { value: 'N', label: 'N' }])
      }
    }
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
      title="ABC and FSN Analysis"
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
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'analysisHead')}
            error={setSelectError('analysisHead')}
            id="analysisHead"
            name="analysisHead"
            value={formData.analysisHead}
            options={analysisHeadOption}
            label="Analysis Head"
            required={true}
          />
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'analysisType')}
            error={setSelectError('analysisType')}
            id="analysisType"
            name="analysisType"
            value={formData.analysisType}
            options={analysisTypeOption}
            label="Analysis Head"
            required={true}
          />

          <InputFormField label="Description" name="desc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <InputFormField label="Parameter Name" name="paramName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />

          <InputFormField label="Param Value In %" name="paramValueInPer" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" />
          <InputFormField label="Remarks" name="remarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

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
      </div>
    </ModalForm>

  );
});

export default AddEditEntry;