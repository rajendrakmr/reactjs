import React, { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
 
import { GetAliasDepoCode, GetAliasItemCode, GetDepoCode, GetItemCode } from './apiService';
import ModalForm from '../../../../components/ModalForm';
import InputFormField from '../../../../components/formComponent/InputFormField';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import { statusCodeOptions } from '../../../helperFun';
const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
  const dispatch = useDispatch();
 
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [isAliasItemLoading, setIsAliasItemLoading] = useState(false);
  const [itemPgNo, setItemPgNo] = useState(0);
  const [itemAliasPgNo, setAliasItemPgNo] = useState(0);
  const [itemOptions, setItemOptions] = useState([]);
  const [depoOptions, setDepoOptions] = useState([]);
  const [depoAliasOptions, setDepoAliasOptions] = useState([]);
  const [itemAliasOptions, setItemAliasOptions] = useState([]);
   
  const pageEdit = async () => {
    const payload = { depoCode: formData.depoCode, itemCode: formData.itemCode ? formData.itemCode : "", pageNumber: 1, pageSize: 10 };
    await GetItemCode(dispatch, setItemOptions, payload);
    const payload1 = { depoCode: formData.aliasDepoCode, itemCode: formData.aliasItemCode ? formData.aliasItemCode : "", pageNumber: 1, pageSize: 10 };
    await GetItemCode(dispatch, setItemAliasOptions, payload1);
  };

  useEffect(() => { 
    if (isEdit) { pageEdit() }
    GetDepoCode(dispatch, setDepoOptions, {})
    GetAliasDepoCode(dispatch, setDepoAliasOptions, {})
  }, [])

 
  const handleChangeSelect = useCallback(async (e, field) => {
    const { value } = e;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));


    if (field == 'depoCode') {
      await GetItemCode(dispatch, setItemOptions, { depoCode: value, pageNumber: 1, pageSize: 10 }, true);
    }


    if (field == 'aliasDepoCode') {
      await GetAliasItemCode(dispatch, setItemAliasOptions, { depoCode: value, pageNumber: 1, pageSize: 10 })
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
      return updatedErrors;
    });
  }, [setFormData, setErrors]);





  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

  const setSelectError = useCallback((field) => {
    if (field !== undefined) {
      return errors[field] || '';
    }
    return errors;

  }, [errors]);



  const onMoreItemScroll = useCallback(async (item, pageNumber) => {
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: item.depoCode, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetItemCode(dispatch, setItemOptions, payload, true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);

  const onMoreItemAliasScroll = useCallback(async (item, pageNumber) => {
    setIsAliasItemLoading(true);
    setAliasItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: item.aliasDepoCode, pageNumber: pageNumber + 1, pageSize: 10 }
    await GetAliasItemCode(dispatch, setItemAliasOptions, payload, true)
    setTimeout(async () => { setIsAliasItemLoading(false); }, 2000);
  }, []);



  return (
    <ModalForm
      title="Item Alias"
      isEdit={isEdit}
      onClose={clearValidationErrors}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      successMessage={successReponse}
    >
      <div className="modal-body _rkContent" style={{ flex: "unset", minHeight: "20vh" }}>
        <div className="row py-2 pb-5 _rkContentBorder" >
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
            error={setSelectError('depoCode')}
            id="depoCode"
            name="depoCode"
            value={formData.depoCode}
            options={depoOptions}
            label="Depot Code"
            required={true}
          />
          <InputFormField label="Depot Desc" name="depoDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'itemCode')}
            error={setSelectError('itemCode')}
            id="itemCode"
            name="itemCode"
            value={formData.itemCode}
            options={itemOptions}
            label="Item Code"
            required={true}
          />

          <InputFormField label="Item Desc" name="itemDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'aliasDepoCode')}
            error={setSelectError('aliasDepoCode')}
            id="aliasDepoCode"
            name="aliasDepoCode"
            value={formData.aliasDepoCode}
            options={depoAliasOptions}
            label="Alias Depot Code"
            required={true}
          />

          <InputFormField label="Alias Depot Desc" name="aliasDepoDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />
          <SelectFormInput
            onChange={(selectedOption) => handleChangeSelect(selectedOption, 'aliasItemCode')}
            error={setSelectError('aliasItemCode')}
            id="aliasItemCode"
            name="aliasItemCode"
            value={formData.aliasItemCode}
            options={depoAliasOptions}
            label="Alias Item Code"
            required={true}
          />


          <InputFormField label="Alias Item Desc" name="aliasItemDesc" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} />

          <InputFormField label="Folio No" name="folioNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" />
          <InputFormField label="Alias Folio No" name="aliasFolioNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" />
          {
            isEdit && (
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'activeFlag')}
                error={setSelectError('activeFlag')}
                id="activeFlag"
                name="activeFlag"
                value={formData.activeFlag}
                options={statusCodeOptions}
                label="Active Flag"
                required={true}
              />
            )
          }
          <InputFormField label="Remarks" name="remarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
        </div>
      </div>
    </ModalForm>
  );
});

export default AddEditEntry;