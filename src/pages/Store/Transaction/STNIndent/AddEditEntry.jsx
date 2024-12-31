import React, { useCallback, useMemo, useEffect, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';
import { GetDepoCode, GetFunGroupName, GetItemCode, GetJobCode, GetSubFunGroupName } from './apiService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import debounce from 'lodash/debounce';
import InputDateField from '../../../../components/formComponent/InputDateField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [jobCodeOptions, setJobCodeOptions] = useState([]);
  const [indentDivOptions, setIndentDivOptions] = useState([]);
  const [supplyDivOptions, setSupplyDivOptions] = useState([]);
  const [depoOptions, setDepoOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    GetDepoCode(dispatch, setDepoOptions);
    if (isEdit) {
      const payload = { depoCode: formData?.indentingDivision };
      GetJobCode(dispatch, setJobCodeOptions, payload);
    }
  }, []);



  useEffect(() => {
    setSupplyDivOptions(
      depoOptions?.map((code) => ({
        ...code,
        isDisabled: isEdit ? true : (code?.value === formData?.indentingDivision ? true : false)
      }))
    );

    setIndentDivOptions(
      depoOptions?.map((code) => ({
        ...code,
        isDisabled: isEdit ? true : (code?.value === formData?.supplyingDivision ? true : false)
      }))
    );
  }, [depoOptions, formData]);



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

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
    switch (field) {
      case 'indentingDivision':
        setName.indentingDivisionName = label
        GetItemCode(dispatch, setItemCodeOptions, { depoCode: value })
        GetJobCode(dispatch, setJobCodeOptions, { depoCode: value })
        break;
      case 'supplyingDivision':
        setName.supplyingDivisionName = label
        break;
      case 'stnReceivedBy':
        setName.stnReceivedBy = value
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


  const memoizedstnIndentChildList = useMemo(() => formData.stnIndentChildList, [formData.stnIndentChildList]);

  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

 
  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);



  const callApi = useCallback(
    debounce(async (value, field, formData) => {
      if (field == "groupNo") {
        await GetFunGroupName(dispatch, setFormData, { deptSecCode: value })
      }
      if (field == "subGroupNo") {
        await GetSubFunGroupName(dispatch, setFormData, { parentDeptSecCode: formData?.groupNo, deptSecCode: value })
      }
    }, 500),
    []
  );



  const onChangeFun = async (e, field, formData = {}) => {
    const { value } = e.target;
    if (value.length >= 2) {
      await callApi(value, field, formData)
    }
  };



  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit STN Indent" : "Add STN Indent"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-4 mx-auto p-1 text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{  zIndex: 99999,minHeight: "30vh" }}>

            <div className="row py-2 _rkContentBorder">
            { isEdit && <InputFormField label="STN Indent No" name="stnIndentNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
        
              <InputFormField label="Dept Book Sr.No" name="deptBookSrlNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="10" />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'indentingDivision')}
                error={setSelectError('indentingDivision')}
                id="indentingDivision"
                name="indentingDivision"
                label="Indent Division"
                options={indentDivOptions}
                value={formData.indentingDivision}
                required={true}
              />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'supplyingDivision')}
                error={setSelectError('supplyingDivision')}
                id="supplyingDivision"
                name="supplyingDivision"
                value={formData.supplyingDivision}
                options={supplyDivOptions}
                label="Supply Div"
                required={true}
              />

              <InputFormField label="TC (Indent Div)" name="transactionCodeId" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="TD (Indent Div)" name="tranDescIndentingDiv" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="TC (Supply Div)" name="transactionCodeSd" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="TD (Supply Div)" name="tranDescSupplyingDiv" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="STN Indent Date" name="stnIndentedDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
              <InputFormField label="STN Indent By" name="empName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Func Group No." name="groupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'groupNo')} onChange={memoizedHandleChange} isRequired={true} type="number" max="2" />
              <InputFormField label="Func Group Name" name="funcGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Sub Group No." name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'subGroupNo', formData)} onChange={memoizedHandleChange} isRequired={true} type="number" max="2" />
              <InputFormField label="Sub Group Name" name="sunGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
            </div>
            <div className="child-challan-screen-container" style={{ paddingBottom: '2px' }}>

              <h6>Item Details</h6>
              <ChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                stnIndentChildList={memoizedstnIndentChildList}
                formData={formData}
                setFormData={setFormData}
                itemCodeOptions={itemCodeOptions}
                jobCodeOptions={jobCodeOptions}
                setItemCodeOptions={setItemCodeOptions}
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