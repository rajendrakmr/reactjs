import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import { GetConnection, GetConsumer, GetCustomer, GetMeterNo, GetWaterCategory } from '../../CommonApiService';
import backgroundImage from '../../../../assets/dpl_back_logo.jpg'
import { statusOptions } from '../../../helperFun';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const dispatch = useDispatch();
  const [waterCatOptions, setWaterCatOptions] = useState([]);
  const [connectionTypeOptions, setConnectionTypeOptions] = useState([]);
  const [customerIdOptions, setCustomerId] = useState([]);
  const [consumerTypeOptions, setConsumerTypeOptions] = useState([]);
  const [meterOptions, setMeterOptions] = useState([]);
  const [gstNonGstOptions, setGstNonGstOptions] = useState([
    { label: "RCM", value: 'R' },
    { label: "GST", value: 'G' },
    { label: "NON GST", value: 'N' },
  ]);
  useEffect(() => {
    GetWaterCategory(dispatch, setWaterCatOptions)
    GetConsumer(dispatch, setConsumerTypeOptions)
    GetConnection(dispatch, setConnectionTypeOptions)
    if (isEdit) {
      GetMeterNo(dispatch, setMeterOptions, formData?.customerId)
    }
    GetCustomer(dispatch, setCustomerId)
  }, []);






  const handleChangeSelect = useCallback(async (e, field) => {
    const { value, items, label } = e;
    const setName = {}
    if (field == "customerId") {
      await GetMeterNo(dispatch, setMeterOptions, value)
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
        if (field == "meterNo") {
          delete updatedErrors.effectiveFromDate;
        }
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
    <div className="modal"
      style={{
        display: "block",
        backgroundColor: "#fff"
      }}
      tabIndex="-1" >
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Consumer Details" : "Add Consumer Details"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh" }}>

            <div className="row py-2 _rkContentBorder" >
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'customerId')}
                error={setSelectError('customerId')}
                id="customerId"
                name="customerId"
                label="Customer ID"
                options={customerIdOptions}
                value={formData.customerId}
                required={true}
                isEdit={isEdit}
                isTrue={isEdit}
              />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'consumerTypeCode')}
                error={setSelectError('consumerTypeCode')}
                id="consumerTypeCode"
                name="consumerTypeCode"
                label="Customer Type"
                options={consumerTypeOptions}
                value={formData.consumerTypeCode}
                required={true}
                // isEdit={isEdit}
                isTrue={isEdit}

              />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'waterCatCode')}
                error={setSelectError('waterCatCode')}
                id="waterCatCode"
                name="waterCatCode"
                label="Water Cat Code"
                options={waterCatOptions}
                value={formData.waterCatCode}
                required={true}
                isTrue={isEdit}

              />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'connectionTypeCode')}
                error={setSelectError('connectionTypeCode')}
                id="connectionTypeCode"
                name="connectionTypeCode"
                label="Connection Type"
                options={connectionTypeOptions}
                value={formData.connectionTypeCode}
                required={true}
                isTrue={isEdit}

              />
               
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'meterNo')}
                error={setSelectError('meterNo')}
                id="meterNo"
                name="meterNo"
                label="Meter No"
                options={meterOptions}
                value={formData.meterNo}
                required={true}
              // isTrue={isEdit}

              />
              <InputDateField label="Installation Date" name="effectiveFromDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} isRequired={true} />
              <InputFormField label="Multiplying Factor" type="number" max="10" name="multiplyFactor" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputDateField label="Last Reading Date" name="lastReadingDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Consumer in KL" name="consumptionInKl" type="number" max="30" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="Latest DIA" name="latestDia" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="Avg Consumption in KL" type="number" max="30" name="avgConsumpInKl" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'gstNonGstRcm')}
                error={setSelectError('gstNonGstRcm')}
                id="gstNonGstRcm"
                name="gstNonGstRcm"
                value={formData.gstNonGstRcm}
                options={gstNonGstOptions}
                label="GST/NON GST/RCM"
              /> 

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