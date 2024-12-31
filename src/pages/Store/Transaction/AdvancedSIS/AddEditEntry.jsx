import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildEntryScreen from './ChildEntryScreen';
import { GetChallanCode, GetEmpList, GetIssuerCode, GetItemCode, RecieverCode } from './apiService';
import _ from 'lodash';
import { getCookie } from '../../../../utils/cookieService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const createdBy = getCookie('userInfo')?.loginId;
  const dispatch = useDispatch();
  const [itemCodeOptions, setItemCodeOptions] = useState([]);
  const [challanOptions, setChallanOptions] = useState([]);
  const [recieverOptions, setReciverOptions] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);



  useEffect(() => {
    GetChallanCode(dispatch, setChallanOptions)
    GetEmpList(dispatch, setReciverOptions, createdBy) 
    if (isEdit) {
      const payload = { challanNumber: formData.challanNo, depoCode: formData.depoCode }
      GetItemCode(dispatch, setItemCodeOptions, payload)
    }
  }, []);

  useEffect(() => {
    setStoreOptions(recieverOptions)
  }, [recieverOptions]);

  const handleChangeSelect = useCallback((e, field) => {
    const { value, items, label } = e;
    const setName = {}
    switch (field) { 
      case 'challanNo':
        const payload = { challanNumber: items.challanNo, depoCode: items.depoCode }
        setFormData(prevData => ({
          ...prevData,
          challanIssueChildren: [
            {
              itemCode: "",
              itemDesc: "",
              folioNo: null,
              unitCode: "",
              unitDesc: "",
              balanceStock: "",
              rate: "",
              amount: "",
              remarks: "",
              location: "",
              requistionQty:"",
              challanIssueQty:""
            },
          ]
        }));
        GetItemCode(dispatch, setItemCodeOptions, payload)
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





  //  
  const challanIssueChildren = useMemo(() => formData.challanIssueChildren, [formData.challanIssueChildren]);

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
              {isEdit ? "Edit Advanced SIS" : "Add Advanced SIS"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ minHeight: "40vh", zIndex: 99999 }}>

            <div className="row py-2 _rkContentBorder" >
              {isEdit && <InputFormField label="Advanced SIS No" name="challanIssueNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />}

              <InputDateField label="Advanced SIS Date" name="challanIssueDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'challanNo')}
                error={setSelectError('challanNo')}
                id="challanNo"
                name="challanNo"
                label="Challan No"
                options={challanOptions}
                value={formData.challanNo}
                required={true}
                isTrue={isEdit}
              />
              <InputFormField label="Dept Challan No" name="deptChallanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="Date of Receipt" name="dateOfReceipt" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />

              <InputFormField label="Depot Code" name="depoCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} type='number' />
              <InputFormField label="Depot Name" name="depoDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="PO No" name="poNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="PO Date" name="poDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />

              <InputFormField label="Issuer Name" name="issuerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputDateField label="Issuer Date" name="issuerDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} type="date" />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'storeOfficer')}
                error={setSelectError('storeOfficer')}
                id="storeOfficer"
                name="storeOfficer"
                label="Store Officer"
                options={storeOptions}
                value={formData.storeOfficer}
                required={true}
              />
              {/* <InputFormField label="Store Officer Name" name="storeOfficerName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} /> */}


              <InputDateField label="Store Officer Date" name="storeOffiDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'receivedBy')}
                error={setSelectError('receivedBy')}
                id="receivedBy"
                name="receivedBy"
                label="Received By"
                options={recieverOptions}
                value={formData.receivedBy}
                required={true}
              />
              {/* <InputFormField label="Receiver Name" name="receivedByName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} /> */}
              <InputFormField label="Receiver Remarks" name="receiverRemarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />

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