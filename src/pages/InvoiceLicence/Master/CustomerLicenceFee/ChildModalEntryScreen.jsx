import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetDepoCode, GetItemCode, GetJobCode, GetPOCode } from './apiService';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import moment from 'moment';
import debounce from 'lodash/debounce';

const ChildModalEntryScreen = ({
  title,
  isEdit,
  onClose,
  formData,
  errors,
  rowItem,
  setFormData,
  setErrors,
  isParentIndex = null
}) => {
  const dispatch = useDispatch();

  const [depoOptions, setDepoOptions] = useState([]);
  const [curItemData, setCurItemData] = useState(rowItem);
  const [curErrors, setCurErrors] = useState({})


  const memoizedHandleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedIndentItemList = [...prev.customerBGList];
      const targetIndex = isParentIndex ?? updatedIndentItemList.length - 1;

      updatedIndentItemList[targetIndex] = {
        ...updatedIndentItemList[targetIndex],
        [name]: value,
      };

      setCurItemData(updatedIndentItemList[targetIndex]);
      return { ...prev, customerBGList: updatedIndentItemList };
    });
    setCurErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors && updatedErrors[name]) {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  }, [setFormData, isParentIndex]);




  // check validation 
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['bgNo','bgDate'];
    requiredFields.forEach((field) => {
      if (!curItemData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    setCurErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      setFormData((prev) => {
        const updatedIndentItemList = [...prev.customerBGList];
        const requiredKeys = ['bgNo'];
        const isFirstItemEmpty = requiredKeys.some(key => !updatedIndentItemList[0]?.[key]);
        if (updatedIndentItemList.length > 1 && isFirstItemEmpty) {
          updatedIndentItemList[0] = { ...updatedIndentItemList[1] };
          updatedIndentItemList.splice(1, 1);
        }

        return { ...prev, customerBGList: updatedIndentItemList };
      });
      onClose()

    }
  };

  const onCloseModal = () => {
    setFormData((prev) => {
      const updatedIndentItemList = [...prev.customerBGList];
      if (isParentIndex === null && updatedIndentItemList.length > 0) {
        updatedIndentItemList.pop();
      }
      return { ...prev, customerBGList: updatedIndentItemList };
    });
    onClose();
  };
  const hasError = useCallback((name) => {
    return !!curErrors[name];
  }, [curErrors]);




  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff", top: "35%" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h6 className="modal-title text-white">Customer BG</h6>
            <button
              type="button"
              className="btn-close"
              onClick={onCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="px-5 mx-auto text-bold text-end w-100">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="row py-2 _rkContentBorder">

            <InputDateField label="Agrmt. Effective From" name="agreementEffectiveFrom" hasError={hasError}errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange}/>


            <InputFormField label="Validity Period" name="validityPeriod" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputDateField label="Validity Upto" name="validUpto" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="BG No" name="bgNo" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isRequired={true} />
            <InputDateField label="BG Date" name="bgDate" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isRequired={true} />
            <InputFormField label="Issuing Bank" name="issuingBank" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Branch Name" name="bankBranchName" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />

            <InputFormField label="BG Value" name="bgValue" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />

            <InputDateField  label="BG Valid Form" name="bgValidityFrom" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange}  />


            <InputDateField label="BG Valid To" name="bgValidityTo"  hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />

            <InputDateField label="Date of Comm."  name="dateOfCommunication" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Comm. Ref No" name="commRefNumber" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />


            <InputDateField
              label="Comm. Ref Date"
              name="commRefDate"
              hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange}
            />
             
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-danger text-white mx-2" onClick={onCloseModal}>Close</button>
            <button type="button" className="btn custome-button-color1 btn-sm text-white" onClick={onSubmit}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildModalEntryScreen;
