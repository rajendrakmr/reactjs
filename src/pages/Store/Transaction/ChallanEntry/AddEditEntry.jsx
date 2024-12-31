import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';

import { GetDepoCode, GetJobCode, GetOrderItem, GetPOCode } from './apiService';

import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';

import debounce from 'lodash/debounce';


const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const dispatch = useDispatch();
  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [depoCodeOptions, setDepoCodeOptions] = useState([]);
  const [poCodeOptions, setPOCodeOptions] = useState([]); 
  const [jobCodeOptions, setJobCodeOptions] = useState([]);
  const [orderCodeOptions, setOrderCodeOptions] = useState([]);
  const [recieverOptions, setReciverOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);


  useEffect(() => {
    GetDepoCode(dispatch, setDepoCodeOptions) 
  }, []);

  useEffect(() => { 
    if (formData.depoCode && isEdit) { 
      GetJobCode(dispatch, setJobCodeOptions, { depoCode: formData.depoCode })
    }
    if (formData.ordRefNumber && isEdit) {
      GetOrderItem(dispatch, setOrderCodeOptions, { poNumber: formData.ordRefNumber, ordItmsrlNo: 0 })
    }
  }, [formData]);




  useEffect(() => {
    setStoreOptions(recieverOptions)
  }, [recieverOptions]);

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
    switch (field) {
      case 'depoCode':
        setPOCodeOptions([])
        setJobCodeOptions([])
        GetPOCode(dispatch, setPOCodeOptions, { depoCode: value })
        GetJobCode(dispatch, setJobCodeOptions, { depoCode: value })
      case 'ordRefNumber':
        GetOrderItem(dispatch, setOrderCodeOptions, { poNumber: value, ordItmsrlNo: 0 })
      case 'transactionCode':
        setName.transactionCode = value
      default:
        break;
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





  //  
  const challanIssueChildren = useMemo(() => formData.challanDetails, [formData.challanDetails]);

  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);

  const [isItemLoading, setIsItemLoading] = useState(false);
  const [itemPgNo, setItemPgNo] = useState(1);
  const onPoScrollItem = useCallback(async (itemRow, pageNumber) => {
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: itemRow?.depoCode, pageNumber: pageNumber + 1, pageSize: 20 }
    await GetPOCode(dispatch, setPOCodeOptions, payload,true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);


  const callApi = useCallback(
    debounce(async (poNo,depoCode) => { 
        setIsItemLoading(true); 
        setItemPgNo(preNo => preNo + 0);
        const payload = { poNo:poNo, depoCode: depoCode, pageNumber: 0, pageSize: 10 }
        // // await GetItemCode(dispatch, setItemOptions, payload, true) 
       await GetPOCode(dispatch, setPOCodeOptions,payload,true)
      //  await GetJobCode(dispatch, setJobCodeOptions, { depoCode: depoCode })
        setTimeout(async () => { setIsItemLoading(false); }, 2000);
    }, 500),
    []
  );

const handleKeyDown = async(event, depoCode) => {  
    const inputValue = event.target.value; 
    if (event.key === 'Enter') { 
        await callApi(inputValue, depoCode) 
    }
    // if (inputValue.length >= 8) {
    //    await callApi(inputValue, depoCode)
    //   }
};


  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Challan Entry" : "Add Challan Entry"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh" }}>

            <div className="row py-2 _rkContentBorder" >
            { isEdit && <InputFormField label="Challan No" name="challanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
        
              <InputFormField label="Dept Challan No" name="deptChallanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
              <InputDateField label="Date of Receipt" name="dateOfReceipt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
              <InputDateField label="Challan Date" name="challanDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
              <InputFormField label="RSL No" name="rslNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="10" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
                error={setSelectError('depoCode')}
                id="depoCode"
                name="depoCode"
                label="Depot Code"
                options={depoCodeOptions}
                value={formData.depoCode}
                required={true}
                isEdit={isEdit}
                isTrue={isEdit}
              />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'ordRefNumber')}
                error={setSelectError('ordRefNumber')}
                id="ordRefNumber"
                name="ordRefNumber"
                label="PO No"
                options={poCodeOptions}
                value={formData.ordRefNumber}
                required={true}
                onMenuScroll={onPoScrollItem}
                pgNo={itemPgNo}
                isLoading={isItemLoading}
                formData={formData}
                onKeyDown={(event) => handleKeyDown(event, formData.depoCode)}
                isEdit={isEdit}
                isTrue={isEdit}
              />
              <InputDateField label="PO Date" name="ordDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />
              <InputFormField label="Vendor Number" name="ordVendor" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Vendor Name" name="vendorName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              
              <InputFormField label="Carrier Reference" name="carrierRef" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="Vehicle No" name="vehicleNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="Remarks" name="remarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
            </div>



            <div className="child-challan-screen-container" style={{  paddingBottom: '10px' }}>
              <h6>Item Details</h6>
              <ChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                challanIssueChildren={challanIssueChildren}
                formData={formData}
                itemOptions={itemCodeOptions}
                setItemCodeOptions={setItemCodeOptions}
                setFormData={setFormData}
                jobCodeOptions={jobCodeOptions}
                orderCodeOptions={orderCodeOptions}
              />
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