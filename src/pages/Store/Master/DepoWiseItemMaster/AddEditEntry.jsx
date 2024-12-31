import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { GetUnitCode } from "./apiService";
import ModalForm from '../../../../components/ModalForm';
import InputFormField from '../../../../components/formComponent/InputFormField';
import { statusCodeOptions } from '../../../helperFun';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse, depoOptions }) => {

  const [vedFlagOptions, setVedFlagOptions] = useState([]);

  const [unitCodeOptions, setUnitCodeOptions] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setVedFlagOptions([
      { value: "", label: "Select" },
      { value: "V", label: "Vital" },
      { value: "E", label: "Essential" },
      { value: "D", label: "Desirable" },
    ])
    GetUnitCode(dispatch, setUnitCodeOptions, {})
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


  // Depo Wise Item Master

  return (
    <ModalForm
      title="Depo Wise Item Master"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
      <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "40vh" }}>

        <div className="row py-2 pb-5 _rkContentBorder">
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

          <InputFormField label="Bin Number" name="binNumber" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" />
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'unitCode')}
            error={setSelectError('unitCode')}
            id="unitCode"
            name="unitCode"
            value={formData.unitCode}
            options={unitCodeOptions}
            label="Unit Code"
            required={true}
          />

          <InputFormField label="Folio Number" name="folioNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" />

          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'vedFlag')}
            error={setSelectError('vedFlag')}
            id="vedFlag"
            name="vedFlag"
            value={formData.vedFlag}
            options={vedFlagOptions}
            label="VED Flag"
          />

          <InputFormField label="Stock Quantity" name="stockQuantity" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
          <InputFormField label="Weighted Average Rate" name="weightedAverageRate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
          <InputFormField label="Minimum Stock Level" name="minStockLevel" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />

          <InputFormField label="Maximum Stock Level" name="maxStockLevel" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
          <InputFormField label="Group Code" name="groupCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
          <InputFormField label="Reorder Level" name="reorderLevel" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="10" />
          <InputFormField label="Bin Location" name="locationBinDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

          <InputFormField label="Item Description" name="itemDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
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
              />
            )
          }


        </div>
      </div>

    </ModalForm>

  );
});

export default AddEditEntry;