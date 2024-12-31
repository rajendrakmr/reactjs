import React, { useCallback, memo, useState, useEffect } from 'react';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import { GetrepairDoneByNgs } from './apiService';
import { useDispatch } from 'react-redux';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import _ from 'lodash';
import debounce from 'lodash/debounce';
import { statusOptions } from '../../../helperFun';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const dispatch = useDispatch();
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
  }, [setFormData, setErrors, formData]);


  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);


  const [doneByNgs, setDoneByNgs] = useState([]);

  useEffect(() => {
    const payload = { ngs: (formData.isUpdate && formData.repairDonebyNgs != "") ? formData.repairDonebyNgs : "", pageNumber: 1, pageSize: 10 }
    GetrepairDoneByNgs(dispatch, setDoneByNgs, payload)
  }, []);

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items } = e;
    const setName = {};

    if (field === 'waterCatCode') {
      setName.waterCatDesc = items?.waterCatDesc;
    }
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


  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);


  const [itemPgNo, setItemPgNo] = useState(1);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const onMoreItem = useCallback(async (itemRow, pageNumber) => {
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { ngs: itemRow?.repairDoneByNgs, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetrepairDoneByNgs(dispatch, setDoneByNgs, payload, true)
    // await GetItemCode(dispatch, setItemOptions, payload,true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);


  const callApi = useCallback(
    debounce(async (value, depoCode = null) => {
      setIsItemLoading(true);
      setItemPgNo(preNo => preNo + 0);
      const payload = { ngs: value, pageNumber: 0, pageSize: 10 }
      await GetrepairDoneByNgs(dispatch, setDoneByNgs, payload, true)
      setTimeout(async () => { setIsItemLoading(false); }, 2000);
    }, 500),
    []
  );

  const handleKeyDown = async (event, depoCode) => {
    const inputValue = event.target.value;
    if (event.key === 'Enter') {
      await callApi(inputValue)
    }
    if (inputValue.length >= 8) {
      await callApi(inputValue)
    }
  };

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {formData.isUpdate ? "Edit Meter Repairing" : "Add Meter Repairing"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh", zIndex: 99999 }}>

            <div className="row py-2 _rkContentBorder" >

              <InputFormField label="Customer Id" name="customerId" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Customer Name" name="customerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Meter No" name="meterNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="Installation Date" name="installationDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="Repair Date" name="repairDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
              
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'repairDoneByNgs')}
                error={setSelectError('repairDoneByNgs')}
                id="repairDoneByNgs"
                name="repairDoneByNgs"
                label="Repair Done By"
                options={doneByNgs}
                value={formData.repairDonebyNgs}
                onMenuScroll={onMoreItem}
                pgNo={itemPgNo}
                isLoading={isItemLoading}
                // isEdit={isEdit}
                // isTrue={isEdit}
                onKeyDown={(event) => handleKeyDown(event, formData.repairDoneByNgs)}
              />

              <InputFormField label="Brief Job Desc " name="shortJobDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'isDamaged')}
                error={setSelectError('isDamaged')}
                id="isDamaged"
                name="isDamaged"
                label="Is Damaged"
                options={statusOptions}
                value={formData.isDamaged}
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
                  ? formData.isUpdate
                    ? "Updating..."
                    : "Submitting..."
                  : formData.isUpdate
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