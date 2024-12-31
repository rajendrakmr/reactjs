import React, { useCallback, useState, memo, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import { GetChallanNo, GetChallanSrNo } from './apiService';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import ChildEntryScreen from './ChildEntryScreen';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse, setItemInsRecord, itemInsRecord }) => {
  const dispatch = useDispatch();
  const [challanNos, setChallNos] = useState([]);
  const [challanSrNos, setChallanSrNos] = useState([]);
  const [isChallanSrModal, setIsChallanSrModal] = useState(false);
  useEffect(() => {
    GetChallanNo(dispatch, setChallNos, isEdit, { challanNumber: isEdit ? formData.challanNo : "" })
  }, [])


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







  const handleChangeSelect = useCallback(async (e, field) => {
    const { value, items } = e;
    const setName = {}
    switch (field) {
      case 'challanNo':
        const payload = { challanNumber: value, challanPrNumber: 0 }
        await GetChallanSrNo(dispatch, setChallanSrNos, setFormData, payload)
        setIsChallanSrModal(true)
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

  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);

  const challanSrlNos = useMemo(() => formData.challaItemSrNos, [formData.challaItemSrNos]);

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Item Inspection" : "Add Item Inspection"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-4 mx-auto p-1 text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "30vh", zIndex: 99999 }}>

            <div className="row py-2 _rkContentBorder"> 
                {isEdit && <InputFormField label="Inspection No" name="inspectionNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />}

                <InputDateField label="Inspection Date" name="inspectionDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
                <SelectFormInput
                  onChange={(selectedOption) => handleChangeSelect(selectedOption, 'challanNo')}
                  error={setSelectError('challanNo')}
                  id="challanNo"
                  name="challanNo"
                  label="Challan No"
                  options={challanNos}
                  value={formData.challanNo}
                  required={true}
                  isEdit={isEdit}
                  isTrue={isEdit}
                />
                <InputDateField label="Challan Date" name="challanDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} type="date" />
                <InputFormField label="Depot Code" name="depoCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputFormField label="PO No" name="poNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />


                <InputDateField label="PO Date" name="poDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} type='date' />
                <InputFormField label="Vendor Code" name="vendorCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputFormField label="Vendor Name" name="vendorName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

                <InputFormField label="Discrepancy Noted" name="discrepancyNoted" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

             
            </div>
            {(isChallanSrModal || isEdit) && (<ChildEntryScreen
              setFormData={setFormData}
              challaItemSrNos={challanSrlNos}
              formData={formData}
              errors={errors}
              setErrors={setErrors}
              setItemInsRecord={setItemInsRecord}
              isEdit={isEdit}
            />)}

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