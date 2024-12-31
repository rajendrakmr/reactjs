import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetCP, GetDepoCode, GetItemCode, GetJobCode, GetPOCode } from './apiService';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import moment from 'moment';
import debounce from 'lodash/debounce';

const ChildEntryScreen = ({
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
  const [itemOptions, setItemOptions] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [lastPoNoOptions, setLastPoNoOptions] = useState([]);
  const [curItemData, setCurItemData] = useState(rowItem);
  const [curErrors, setCurErrors] = useState({})
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [itemPgNo, setItemPgNo] = useState(1);
const GetEdit = async () => { 
      if ( curItemData?.depoCode &&  curItemData?.itemCode) {
        const payload = { depoCode: curItemData?.depoCode, itemCode:  curItemData?.itemCode, pageNumber: 1, pageSize: 15 };
        await GetItemCode(dispatch, setItemOptions, payload);
      }

      if ( curItemData?.depoCode &&  curItemData?.jobCode) {
        const payload = { depoCode:  curItemData?.depoCode, jobCode: curItemData?.jobCode, pageNumber: 1, pageSize: 15 };
        await GetJobCode(dispatch, setJobOptions, payload);
      }

      if ( curItemData?.depoCode &&  curItemData?.itemCode &&  curItemData?.lastPoNo) {
        const payload = { depoCode:  curItemData?.depoCode, itemCode:  curItemData?.itemCode, lastPoNo:  curItemData?.lastPoNo, pageNumber: 1, pageSize: 15 };
        await GetPOCode(dispatch, setLastPoNoOptions, payload);
      }
    
  };


  useEffect(() => { 
    if(isEdit){
      GetEdit()
    }
  }, []);


  useEffect(() => {
    GetDepoCode(dispatch, setDepoOptions, { depoCode: '' });
  }, [dispatch]);

  const handleChangeSelect = useCallback(async (e, field) => {
    const { value, items } = e; 

    setFormData((prev) => {
      const updatedIndentItemList = [...prev.indentItemChildList];
      const targetIndex = isParentIndex ?? updatedIndentItemList.length - 1;

      updatedIndentItemList[targetIndex] = {
        ...updatedIndentItemList[targetIndex],
        [field]: value,
        ...(
          field === 'depoCode' ? (
            GetItemCode(dispatch, setItemOptions, { depoCode: value, pageNumber: 1, pageSize: 15 }, true),
            GetJobCode(dispatch, setJobOptions, { depoCode: value, pageNumber: 1, pageSize: 15 }, true),
            {
              depoName: items.depoDescription, 
            }
          ) : field === 'itemCode' ?( 
            
            {
            ...items,
            unitDesc: items.unitDescription, 
            ...(
              GetCP(dispatch, setFormData,  {
                depoCode: updatedIndentItemList[targetIndex]?.depoCode,
                itemCode: value, 
                deptIndentdate: formData?.deptIndentDate || moment().format("DD/MM/YYYY")
              },targetIndex)
          ,
              GetPOCode(dispatch, setLastPoNoOptions, {
              depoCode: updatedIndentItemList[targetIndex]?.depoCode,
              itemCode: value,
              pageNumber: 1,
              pageSize: 15
            }, true))
          } ): field === 'jobCode' ? {
            ...items,
            jobName: items.jobDescription
          } : field === 'lastPoNo' ? {
            lastPoDate: items?.ordDate,
            lastPoRate: items?.ordItemRate
          } : {}
        )
      };

      setCurItemData(updatedIndentItemList[targetIndex]);
      return { ...prev, indentItemChildList: updatedIndentItemList };
    });

    setCurErrors((prevErrors) => {
      const { [field]: removed, ...updatedErrors } = prevErrors || {};
      return updatedErrors;
    });
  }, [setFormData, isParentIndex]);





  const memoizedHandleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedIndentItemList = [...prev.indentItemChildList];
      const targetIndex = isParentIndex ?? updatedIndentItemList.length - 1;

      updatedIndentItemList[targetIndex] = {
        ...updatedIndentItemList[targetIndex],
        [name]: value,
      };

      setCurItemData(updatedIndentItemList[targetIndex]);
      return { ...prev, indentItemChildList: updatedIndentItemList };
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
    const requiredFields = ['depoCode', 'itemCode', 'quantity','lastPoNo'];
    // const requiredFields = ['depoCode'];

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
      onClose();
    }
  };

  const onCloseModal = () => {
    setFormData((prev) => {
      const updatedIndentItemList = [...prev.indentItemChildList];
      if (isParentIndex === null && updatedIndentItemList.length > 0) {
        updatedIndentItemList.pop();
      }
      return { ...prev, indentItemChildList: updatedIndentItemList };
    });
    onClose();
  };
  const hasError = useCallback((name) => {
    return !!curErrors[name];
  }, [curErrors]);



  const onMoreItemScroll = useCallback(async (itemRow, pageNumber) => {
    setIsItemLoading(true);
    setItemPgNo(preNo => preNo + 1);
    const payload = { depoCode: itemRow?.depoCode, pageNumber: pageNumber + 1, pageSize: 20 }
    await GetItemCode(dispatch, setItemOptions, payload,true)
    setTimeout(async () => { setIsItemLoading(false); }, 2000);
  }, []);


  const callApi = useCallback(
    debounce(async (itemCode,depoCode) => { 
        setIsItemLoading(true); 
        setItemPgNo(preNo => preNo + 0);
        const payload = { itemCode:itemCode, depoCode: depoCode, pageNumber: 0, pageSize: 10 }
        await GetItemCode(dispatch, setItemOptions, payload, true) 
        setTimeout(async () => { setIsItemLoading(false); }, 2000);
    }, 500),
    []
  );

const handleKeyDown = async(event, depoCode) => {  
    const inputValue = event.target.value; 
    if (event.key === 'Enter') { 
        await callApi(inputValue, depoCode) 
    }
    if (inputValue.length >= 8) {
      await callApi(inputValue, depoCode)
  }
};
  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff",top:"33%" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h6 className="modal-title text-white">Item Details</h6>
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
            <SelectFormInput
              onChange={(selectedOption) => handleChangeSelect(selectedOption, 'depoCode')}
              id="depoCode"
              name="depoCode"
              label="Dept"
              options={depoOptions}
              value={curItemData.depoCode}
              error={curErrors.depoCode}
              hasError={hasError}
              required={true}
            />
            <SelectFormInput
              onChange={(selectedOption) => handleChangeSelect(selectedOption, 'itemCode')}
              id="itemCode"
              name="itemCode"
              label="Item"
              options={itemOptions}
              value={curItemData.itemCode}
              onMenuScroll={onMoreItemScroll}
              pgNo={itemPgNo}
              isLoading={isItemLoading}
              formData={curItemData}
              onKeyDown={(event) => handleKeyDown(event, curItemData.depoCode)}
              error={curErrors.itemCode}
              hasError={hasError}
              required={true}
            />
            <InputFormField label="Unit Code" name="unitCode" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isDefault={true} />
            <InputFormField label="Unit Description" name="unitDesc" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isDefault={true} />
            <InputFormField label="Quantity" name="quantity" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isRequired={true} />
            {/* <SelectFormInput
              onChange={(selectedOption) => handleChangeSelect(selectedOption, 'jobCode')}
              id="jobCode"
              name="jobCode"
              label="Job Code"
              options={jobOptions}
              value={curItemData.jobCode}
              error={curErrors.depoCode}
              hasError={hasError}
              required={true}
            /> */}
            <SelectFormInput
              onChange={(selectedOption) => handleChangeSelect(selectedOption, 'lastPoNo')}
              id="lastPoNo"
              name="lastPoNo"
              label="Last PO No"
              options={lastPoNoOptions}
              value={curItemData.lastPoNo}
              hasError={hasError}
              error={curErrors.lastPoNo}
              required={true}
            />
            <InputDateField label="Last PO Date" name="lastPoDate" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isDefault={true} />
            <InputFormField label="Last PO Rate" name="lastPoRate" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} isDefault={true} />
            <InputFormField label="Outstanding Indent No" name="outstandingIndentNo" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputDateField label="Outstanding Indent Date" name="outstandingIndentDate" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Outstanding PO No" name="outstandingPoNo" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputDateField label="Outstanding PO Date" name="outstandingPoDate" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Special Instruction" name="specialInstruction" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Mode of Tender" name="modeOfTender" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Vendor Details" name="vendorDetails" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
            <InputFormField label="Remarks" name="remarks" hasError={hasError} errorMsg={curErrors} inputData={curItemData} onChange={memoizedHandleChange} />
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

export default ChildEntryScreen;
