import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';
import { GetEmpCode, GetEmpName, GetIssuerCode, GetSuplyItem, GetSTNIndentNo, RecieverCode } from './apiService';

import { getCookie } from '../../../../utils/cookieService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const createdBy = getCookie('userInfo')?.loginId;
  const dispatch = useDispatch();
  const [recieverOptions, setReciverOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [pSLedgerROptions, setPSLedgerROptions] = useState([]);
  const [pSLedgerIOptions, setPSLedgerIOptions] = useState([]);
  const [STNIndentNoOptions, setSTNIndentNoOptions] = useState([]);


  useEffect(() => {
    GetEmpCode(dispatch, setFormData, { createdBy, retType: "G" })
    GetEmpName(dispatch, setFormData, { createdBy, retType: "N" })
    RecieverCode(dispatch, setReciverOptions)
    GetIssuerCode(dispatch, setFormData, { createdBy })
    GetSTNIndentNo(dispatch, setSTNIndentNoOptions)
  }, []);

  useEffect(() => {
    setStoreOptions(recieverOptions)
    setPSLedgerROptions(recieverOptions)
    setPSLedgerIOptions(recieverOptions)
  }, [recieverOptions]);


  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
    switch (field) {
      case 'stnIndentNo':
        setName.issueStatus = items.reqStatus
        GetSuplyItem(dispatch, setFormData, { stnIndentNo: value })
        break;
      case 'stnReceivedBy':
        setName.receivedBy = value
        setName.receivedByEmpName = label
        break;
      case 'priceStoreLedgerRPostBy':
        setName.priceStoreLedgerRPostBy = value
        setName.priStrLedRecByEmpName = label
        break;
      case 'priceStoreLedgerIPostBy':
        setName.priceStoreLedgerIPostBy = value
        setName.priStrLedIssByEmpName = label
        break;
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

  const stnSupplyChildList = useMemo(() => formData.stnSupplyChildList, [formData.stnSupplyChildList]);


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
              {isEdit ? "Edit STN Supply" : "Add STN Supply"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh", zIndex: 99999 }}>

            <div className="row py-2 _rkContentBorder" >
            { isEdit && <InputFormField label="STN Supply No" name="stnSupplyNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
        
              <InputDateField label="STN Supply Date" name="stnSupplyDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'stnIndentNo')}
                error={setSelectError('stnIndentNo')}
                id="stnIndentNo"
                name="stnIndentNo"
                label="STN Indent No"
                options={STNIndentNoOptions}
                value={formData.stnIndentNo}
                isEdit={isEdit}
                required={true}
                isTrue={isEdit}
              />

              <InputDateField label="STN Indent Date" name="stnIndentDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />
              <InputFormField label="Indenting Division" name="indentingDivision" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Supplying Division" name="supplyingDivision" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="TC (Indent Div)" name="transactionCodeId" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="TC (Supply Div)" name="transactionCodeSd" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="STN Indent By" name="stnIndentedBy" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="STN Indented Date" name="stnIndentedDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} type='date' />
              <InputFormField label="Employee Name" name="indentedByEmployeeName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Fun Group No" name="groupNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Fun Group Name" name="functionalGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Sub Group No" name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Sub Group Name" name="subGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="STN Issued Date" name="stnIssuedDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />
              <InputFormField label="STN Issued By" name="issuedByEmpName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'stnReceivedBy')}
                error={setSelectError('stnReceivedBy')}
                id="stnReceivedBy"
                name="stnReceivedBy"
                label="STN Received By"
                options={storeOptions}
                value={formData.stnReceivedBy}
                required={true}
              />
              <InputDateField label="STN Received Date" name="stnReceivedDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'priceStoreLedgerIPostBy')}
                error={setSelectError('priceStoreLedgerIPostBy')}
                id="priceStoreLedgerIPostBy"
                name="priceStoreLedgerIPostBy"
                label="PSL Posted By(I)"
                options={pSLedgerIOptions}
                value={formData.priceStoreLedgerIPostBy}
                required={true}
              />

              <InputDateField label="PSL Posted Date(I)" name="priceStoreLedgerIPostDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'priceStoreLedgerRPostBy')}
                error={setSelectError('priceStoreLedgerRPostBy')}
                id="priceStoreLedgerRPostBy"
                name="priceStoreLedgerRPostBy"
                label="PSL Posted By(R)"
                options={pSLedgerROptions}
                value={formData.priceStoreLedgerRPostBy}
                required={true}
              />
              <InputDateField label="PSL Posted Date(R)" name="priceStoreLedgerRPostDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />
              <InputFormField label="STN Supply Status" name="stnSupplyStatus" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
 

              
            
            </div>
            <div className="child-challan-screen-container" style={{ paddingBottom: '2px' }}>
                <h6>Item Details  (<span className='text-danger' style={{ fontSize: '12px', fontWeight: 'bold' }}>PSL = Price Store Ledger </span>)</h6>

                <ChildEntryScreen
                  errors={errors}
                  setErrors={setErrors}
                  isEdit={isEdit}
                  stnSupplyChildList={stnSupplyChildList}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            <div className="modal-footer mt-1">
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