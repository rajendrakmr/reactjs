import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkClaimQty, GetInspectionCode } from './apiService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {


  const dispatch = useDispatch();
  const [partyOptions, setPartyOptions] = useState([{ label: "Yes", value: "Y" }, { label: "No", value: "N" }]);
  const [incCodeOptions, setIncCodeOptions] = useState([]);



  useEffect(() => {
    GetInspectionCode(dispatch, setIncCodeOptions)
    if (isEdit) {
      checkClaimQty(dispatch, setFormData, { inspectionNo: formData.inspectionNo })
    }

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
    if (field == "inspectionNo") {
      checkClaimQty(dispatch, setFormData, { inspectionNo: value })
    }


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
      if (name === 'qtyClaimed') {
        const qtyClaimed = parseFloat(value) || 0;
        let qtyRejected = parseFloat(formData.checkItemQty);
        if (isEdit) {
          if (qtyRejected === 0) {
            qtyRejected = parseFloat(formData.checksetItemQty)
          } else {
            qtyRejected = parseFloat(formData.checksetItemQty) + parseFloat(formData.checkItemQty)
          }

        }

        if (qtyClaimed > qtyRejected) {
          setFormData(prev => ({
            ...prev,
            qtyClaimed: null,
          }));
          updatedErrors.qtyClaimed = `maximum claim qty should be ${qtyRejected}.`;
        } else {
          delete updatedErrors.qtyClaimed;
        }
      }

      return updatedErrors;
    });
  }, [setFormData, setErrors, formData]);







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
              {isEdit ? "Edit Claim for Rejected Items" : "Add Claim for Rejected Items"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent">
            <div className="row py-2 _rkContentBorder" >
            { isEdit && <InputFormField label="Claim No" name="claimNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />} 
        
              <InputDateField label="Claim Date" name="claimDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" max="10" isRequired={true} />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'inspectionNo')}
                error={setSelectError('inspectionNo')}
                id="inspectionNo"
                name="inspectionNo"
                value={formData.inspectionNo}
                options={incCodeOptions}
                label="Inspection No"
                required={true}
                isEdit={isEdit}
                isTrue={isEdit ? true : false}
              />
              <InputDateField label="Inspection Date" name="inspectionDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />

              <InputFormField label="Challan No" name="challanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Vendor Code" name="vendorCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Vendor Name" name="vendorName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Item Code" name="itemCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Item Desc." name="itemDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Unit Code" name="unitCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Unit Desc." name="unitDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Accepted Qty" name="qtyAccepted" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Rejected Qty" name="qtyRejected" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Claimed Qty" name="qtyClaimed" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="number" max="8" />
              <InputFormField label="Discrepancy Noted" name="discrepancyNoted" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'sentToParty')}
                error={setSelectError('sentToParty')}
                id="sentToParty"
                name="sentToParty"
                value={formData.sentToParty}
                options={partyOptions}
                label="Sent to Party"
                required={true}
                isTrue={formData.closeClaim == "Y" ? true : false}
              />
              {isEdit && (
                <InputFormField label="Close Claim" name="closeClaim" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              )}

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