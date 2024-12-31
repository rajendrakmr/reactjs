import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetConnection, GetCustomer } from './apiService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import InputDateTimeField from '../../../../components/formComponent/InputDateTimeField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const dispatch = useDispatch();
  const [connectionTypeOptions, setConnectionTypeOptions] = useState([]);
  const [customerIdOptions, setCustomerId] = useState([]);
  const [monthsOptions, setMonthsptions] = useState([]);

  useEffect(() => {
    setMonthsptions([
          { value: 'Jan-Feb', label: 'Jan-Feb' },
          { value: 'Feb-Mar', label: 'Feb-Mar' },
          { value: 'Mar-Apr', label: 'Mar-Apr' },
          { value: 'Apr-May', label: 'Apr-May' },
          { value: 'May-Jun', label: 'May-Jun' },
          { value: 'Jun-Jul', label: 'Jun-Jul' },
          { value: 'Jul-Aug', label: 'Jul-Aug' },
          { value: 'Aug-Sep', label: 'Aug-Sep' },
          { value: 'Sep-Oct', label: 'Sep-Oct' },
          { value: 'Oct-Nov', label: 'Oct-Nov' },
          { value: 'Nov-Dec', label: 'Nov-Dec' }
      ]);
  }, []);

  useEffect(() => {
    GetConnection(dispatch, setConnectionTypeOptions)
    GetCustomer(dispatch, setCustomerId)
  }, []);

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;  
    const setName = {};  
    
    if (field === 'customerId') {
      setName.customerName = items?.customerName;  
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
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Periodic Meter Reading" : "Add Periodic Meter Reading"}
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
                label="Customer Id"
                options={customerIdOptions}
                value={formData.customerId}
                required={true}
                isEdit={isEdit}
                isTrue={isEdit}
              />
              {/* <InputFormField label="Customer Name" name="customerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  isDefault={isEdit}/> */}

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
              <InputDateTimeField label="Reading Date" name="readingDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true}  isDefault={isEdit}/>
              <InputFormField label="Meter No" name="meterNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} max="50" isRequired={true}  isDefault={isEdit}/>
              <InputFormField label="Last Reading" name="lastReading" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" />
              <InputFormField label="Current Reading" name="currentReading" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number"  />
              <InputFormField label="Arrear Amount" name="arrearAmt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" />
              <InputFormField label="Refund Amount" name="refundAmt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
              <InputFormField label="No of Months" name="noOfMonths" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'monthsInChar')}
                error={setSelectError('monthsInChar')}
                id="monthsInChar"
                name="monthsInChar"
                value={formData.monthsInChar}
                options={monthsOptions}
                label="Months"
              />
            <InputFormField label="Remarks" name="remarks"  max="200" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
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