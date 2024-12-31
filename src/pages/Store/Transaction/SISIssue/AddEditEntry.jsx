import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InputField from "../../../../components/InputField";
import ChildEntryScreen from './ChildEntryScreen';
import Select from "react-select";
import { GetChallanCode, GetIssuerCode, GetItemCode, GetReqItem, GetSISRequestionNo, RecieverCode } from './apiService';
import _ from 'lodash';
import { getCookie } from '../../../../utils/cookieService';
import Loader from '../../../../components/Loader';
import { customSelectOption } from '../../../../utils/helper';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
// import InputFormField from '../../../../components/InputFormField';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const createdBy = getCookie('userInfo')?.loginId;
  const dispatch = useDispatch();
  const [recieverOptions, setReciverOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [SISRequistionOptions, setSISRequistionOptions] = useState([]);


  useEffect(() => {
    RecieverCode(dispatch, setReciverOptions)
    GetIssuerCode(dispatch, setFormData, { createdBy })
    GetSISRequestionNo(dispatch, setSISRequistionOptions)
  }, []);

  useEffect(() => {
    setStoreOptions(recieverOptions)
  }, [recieverOptions]);


  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
    switch (field) {
      case 'sisReqNo':
        setName.issueStatus = items.reqStatus
        GetReqItem(dispatch, setFormData, { sisReqNo: value })
        break;
      case 'receivedBy':
        setName.receivedBy = value
        setName.receivedByName = label
        break;
      case 'storeOfficer':
        setName.storeOfficer = value
        setName.storeOfficerName = label
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

  const sisIssueChildList = useMemo(() => formData.sisIssueChildList, [formData.sisIssueChildList]);


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
              {isEdit ? "Edit SIS Issue" : "Add SIS Issue"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-4 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "45vh", zIndex: 99999 }}>
            <div className="row py-2 _rkContentBorder" >
            { isEdit && <InputFormField label="SIS Issue No" name="sisIssueNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
              <InputDateField label="Issue Date" name="issueDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'sisReqNo')}
                error={setSelectError('sisReqNo')}
                id="sisReqNo"
                name="sisReqNo"
                value={formData.sisReqNo}
                options={SISRequistionOptions}
                isEdit={isEdit}
                isTrue={isEdit ? true : false}
                label="SIS Req No"
                required={true}
              />


              <InputDateField label="SIS Req Date" name="reqDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />
              <InputFormField label="Depo" name="depoCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Transaction" name="transDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />


              <InputFormField label="Dept Name" name="departmentName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Demanded By" name="employeeName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Designation" name="designationName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Func Group No" name="groupNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Func Group Name" name="functionalGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Sub Group No" name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} type='number' />


              <InputFormField label="Sub Group Name" name="subGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Issuer Name" name="issuerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="Issue Date" name="issuerDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'storeOfficer')}
                error={setSelectError('storeOfficer')}
                id="storeOfficer"
                name="storeOfficer"
                value={formData.storeOfficer}
                options={storeOptions}
                label="Store Officer"
                required={true}
              />
              <InputDateField label="Store Officer Date" name="storeOffiDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'receivedBy')}
                error={setSelectError('receivedBy')}
                id="receivedBy"
                name="receivedBy"
                value={formData.receivedBy}
                options={recieverOptions}
                label="Received By"
                required={true} />


              <InputFormField label="Receiver Remarks" name="receiverRemarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
            </div>

            <div className="child-challan-screen-container" style={{  paddingBottom: '2px' }}>

              <h6>Item Details</h6>
              <ChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                sisIssueChildList={sisIssueChildList}
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