import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';
import Loader from '../../../../components/Loader';

import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import { GetConsumer, GetStateCode } from '../../CommonApiService'; 
import { fetchGetPreData } from '../../../../redux/reducer/commonApiSlice';
import { statusOptions } from '../../../helperFun';



const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {


  const dispatch = useDispatch();
  const [customerTypeOptions, setCustomerTypeOptions] = useState([]); 
  const [stateOptions, setStateOptions] = useState([]);




  useEffect(() => {
    GetConsumer(dispatch, setCustomerTypeOptions)
    GetStateCode(dispatch, setStateOptions)
  }, []);


  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;
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









  const memoizedHandleChange = useCallback(async (e, isCase) => {
    const { name, value } = e.target;
    const dataValue = isCase ? value.toUpperCase() : value;

    // Update form data state
    setFormData(prev => ({
      ...prev,
      [name]: dataValue,
    }));

    // Handle validation and errors
    const handleValidation = async () => {
      const updatedErrors = { ...errors };
      if (updatedErrors[name]) {
        delete updatedErrors[name];
      }

      if (name === 'gstn') {
        if (dataValue.length < 14) {
          updatedErrors.gstn = `Invalid GSTN No ${dataValue}.`;
        } else {
          try {
            const action = await dispatch(fetchGetPreData({ dataInfo: {}, indicatorsPath: `/customer/verify/gstn/${dataValue}` }));
            let isGstn = false
            if (fetchGetPreData.fulfilled.match(action) && action?.payload?.success === "Y") {
              delete updatedErrors.gstn;
              isGstn = true
            } else {
              updatedErrors.gstn = `Invalid gstn No ${dataValue}.`;
              isGstn = false
            }
            setFormData(prev => ({
              ...prev,
              isGSTN: isGstn
            }));
          } catch (error) {
            console.error("Error verifying GSTN:", error);
            updatedErrors.gstn = "Error verifying GSTN.";
          }
        }
      }
      setErrors(updatedErrors);
    };
    await handleValidation();
  }, [setFormData, setErrors, dispatch, errors]);


 


  //  
  const customerLicenseFeeChildren = useMemo(() => formData.customerLicenseFeeChildren, [formData.customerLicenseFeeChildren]);
  const customerBGList = useMemo(() => formData.customerBGList, [formData.customerBGList]);

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
              {isEdit ? "Edit Customer for Licence Fee Master" : "Add Customer for Licence Fee Master"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "35vh" }}>
            <div className="row py-2 _rkContentBorder" >
              <InputFormField label="Customer ID" name="customerId" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={isEdit} isRequired={true} />
              <InputFormField label="Customer Name" name="customerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'commerPurpose')}
                error={setSelectError('commerPurpose')}
                id="commerPurpose"
                name="commerPurpose"
                label="Comm. Purpose"
                options={statusOptions}
                value={formData.commerPurpose}
                required={true}
              />


              <InputFormField label="Phone No" name="phoneNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="11" />
              <InputFormField label="Alt Phone No" name="alternatePhoneNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="11" />
              <InputFormField label="Mail ID" name="mailId" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="GSTN" name="gstn" inputData={formData} hasError={hasError} errorMsg={errors} onChange={(e) => memoizedHandleChange(e, true)} type="str" max="15" />


            </div>



            <div className="child-challan-screen-container" style={{ paddingBottom: '2px' }}>
              <h6>Customer Details</h6>
              <ChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                customerLicenseFeeChildren={customerLicenseFeeChildren}
                formData={formData}
                setFormData={setFormData}
                stateOptions={stateOptions}
              />
            </div>


            {/* <div className="child-challan-screen-container" style={{  paddingBottom: '2px' }}>
              <h6>Customer BG</h6>
              <BGChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                customerBGList={customerBGList}
                formData={formData}
                setFormData={setFormData}
                stateOptions={stateOptions}
              />
            </div> */}
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