import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';
import Select from "react-select";
import { GetDepoCode, GetDesignation, GetFunGroupName, GetJobCode, GetRequisitionDept, GetSubFunGroupName, GetTransactionCode, RecieverCode } from './apiService';
import _ from 'lodash';
import Loader from '../../../../components/Loader';
import { customSelectOption } from '../../../../utils/helper';
import debounce from 'lodash/debounce';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {


  const dispatch = useDispatch();
  const [depoOptions, setDepoOptions] = useState([]);
  const [requisitionOptions, setRequisitionOptions] = useState([]);
  const [transactionOptions, setTransactionOptions] = useState([]);
  const [jobCodeOptions, setJobCodeOptions] = useState([]);

  const pageEdit = async () => {
    if (formData?.depoCode) {
      const payload = { depoCode: formData.depoCode }
      GetJobCode(dispatch, setJobCodeOptions, payload)
    }
  };


  useEffect(() => {
    GetDesignation(dispatch, setFormData)
    GetDepoCode(dispatch, setDepoOptions)
    GetTransactionCode(dispatch, setTransactionOptions)
    GetRequisitionDept(dispatch, setRequisitionOptions)
    if (isEdit) {
      pageEdit()
    }
  }, []);


  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;
    const setName = {}
    switch (field) {
      case 'transactionCode':
        setName.transDescription = items?.transDescription
      case 'reqDepartment':
        setName.deptName = items?.deptName
      case 'depoCode':
        setName.depoDescripion = items?.depoDescription
        const payload = { depoCode: items.depoCode }
        GetRequisitionDept(dispatch, setRequisitionOptions, payload)
        GetJobCode(dispatch, setJobCodeOptions, payload)
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


  const callApi = useCallback(
    debounce(async (value, field, formData) => {
      if (field == "groupNo") {
        GetFunGroupName(dispatch, setFormData, { deptSecCode: value })
      }
      if (field == "subGroupNo") {
        GetSubFunGroupName(dispatch, setFormData, { parentDeptSecCode: formData?.groupNo, deptSecCode: value })
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
  const sisRequisitionChildList = useMemo(() => formData.sisRequisitionChildList, [formData.sisRequisitionChildList]);

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
              {isEdit ? "Edit SIS Requisition" : "Add SIS Requisition"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "35vh" }}>
            <div className="row py-2 _rkContentBorder" >
              
           { isEdit && <InputFormField label="SIS Req No" name="sisReqNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
             
              <InputFormField label="SL No (if any)" name="issueReqSrlNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="10" />
              <InputDateField label="Req Date" name="reqDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" max="10" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
                error={setSelectError('depoCode')}
                id="depoCode"
                name="depoCode"
                label="Depot Code"
                options={depoOptions}
                value={formData.depoCode}
                required={true}
              />


              <InputFormField label="Depot Name" name="depoDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'transactionCode')}
                error={setSelectError('transactionCode')}
                id="transactionCode"
                name="transactionCode"
                label="TC"
                options={transactionOptions}
                value={formData.transactionCode}
                required={true}
              />
              <InputFormField label="TC Desc" name="transDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'reqDepartment')}
                error={setSelectError('reqDepartment')}
                id="reqDepartment"
                name="reqDepartment"
                label="Req Dept"
                options={requisitionOptions}
                value={formData.reqDepartment}
                required={true}
              />
              <InputFormField label="Dept Name" name="deptName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Employee Name" name="demandedByName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Designation" name="demandedByDesig" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Fun Group No." name="groupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'groupNo')} onChange={memoizedHandleChange} isRequired={true} type="number" max="2" />
              <InputFormField label="Fun Group Name" name="functionalGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Sub Group No." name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'subGroupNo', formData)} onChange={memoizedHandleChange} isRequired={true} type="number" max="2" />
              <InputFormField label="Sub Group Name" name="subGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="SIS Req Status" name="reqStatus" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

            </div>



            <div className="child-challan-screen-container" style={{  paddingBottom: '2px' }}>
              <h6>Item Details</h6>
              <ChildEntryScreen
                errors={errors}
                setErrors={setErrors}
                isEdit={isEdit}
                sisRequisitionChildList={sisRequisitionChildList}
                formData={formData}
                jobCodeOptions={jobCodeOptions}
                setFormData={setFormData}
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