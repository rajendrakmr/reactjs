import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GetConnection, GetConsumer, GetCustomer, GetWaterCategory } from './apiService';

import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';


const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const dispatch = useDispatch();
  const [waterCatOptions, setWaterCatOptions] = useState([]);
  const [connectionTypeOptions, setConnectionTypeOptions] = useState([]);
  const [customerIdOptions, setCustomerId] = useState([]);
  const [consumerTypeOptions, setConsumerTypeOptions] = useState([]);

  useEffect(() => {
    GetWaterCategory(dispatch, setWaterCatOptions)
    GetConsumer(dispatch, setConsumerTypeOptions)
    GetConnection(dispatch, setConnectionTypeOptions)
    GetCustomer(dispatch, setCustomerId)
  }, []);






  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
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
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Meter Installation" : "Add Meter Installation"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh" }}>

            <div className="row py-2 _rkContentBorder" >
              {/* { isEdit && <InputFormField label="Challan No" name="challanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />}  */}
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'customerId')}
                error={setSelectError('customerId')}
                id="customerId"
                name="customerId"
                label="Customer Id"
                options={customerIdOptions}
                value={formData.customerId}
                required={true}
                isEdit={isEdit}
                isTrue={isEdit}
              />
                <InputFormField label="Meter No" name="meterNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true}  />
                <InputDateField label="Installation Date" name="installationDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
                <InputFormField label="Meter Make" name="meterMake" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}/>
                <InputFormField label="Multiplying Factor" name="multiplyFactor" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
                <InputFormField label="Dairy No" name="dairyNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
                <InputDateField label="Dairy Date" name="dairyDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                <InputFormField label="Receipt No" name="receiptNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                <InputDateField label="Receipt Date" name="receiptDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                <InputFormField label="UO No" name="uoNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                <InputDateField label="UO Date" name="uoDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                <InputFormField label="Remarks" name="remarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
                
  
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
    </div>
  );
});

export default AddEditEntry;