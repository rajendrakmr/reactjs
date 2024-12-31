import React, { useCallback, useMemo, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildIndentEntryScreen from './ChildIndentEntryScreen';
import ChildDocRef from './ChildDocRef';
import TableRouteDetail from './TableRouteDetail';
import { GetFunGroupName, GetSubFunGroupName, indentCreator } from './apiService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import debounce from 'lodash/debounce';
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
  }, [setFormData, setErrors]);
  useEffect(() => {
    if (formData?.indentStatus === "T") {
      indentCreator(dispatch, setFormData, { indentNo: formData?.indentNo })
    }
  }, []);




  // Memoized indent item child list
  const memoizedIndentItemChildList = useMemo(() => formData.indentItemChildList, [formData.indentItemChildList]);
  const memoizedIndentRefChildren = useMemo(() => formData.indentRefChildren, [formData.indentRefChildren]);

  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

  // Memoized function to check errors
  const memoizedHasError = useCallback((name) => hasError[name], [hasError]);


  const memoizedSelectedLoginId = useMemo(() => formData.selectedLoginId, [formData.selectedLoginId]);




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

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h6 className="modal-title text-white">
              {isEdit ? "Edit Indent Routing/Approval" : "Add Indent Routing/Approval"}
            </h6>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-4 mx-auto p-1 text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{ zIndex: 99999, minHeight: "30vh" }}>

            <div className="row py-2 _rkContentBorder">
              {isEdit && <InputFormField label="Indent No" name="indentNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              }
              <InputDateField label="Dept. Indent Date" name="deptIndentDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isRequired={true} isDefault={isEdit} />
              <InputFormField label="Dept. Indent No" name="deptIndentNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  isDefault={isEdit} />
              <InputFormField label="Indentor Desig" name="designation" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Indentor Dept" name="department" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Purpose of Proc." name="purposeOfProcurement" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={isEdit} />
              <InputDateField label="Prop Date of Del" name="proposeddateOfDelivery" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={isEdit} />

              <InputFormField label="Consignee Name" name="consigneeName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={isEdit} />
              <InputFormField label="Place of Delivery" name="placeOfDelivery" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={isEdit} />
              <InputFormField label="Func Group No." name="groupNo" inputData={formData} onKeyUp={(e) => onChangeFun(e, 'groupNo')} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="3" isRequired={true} isDefault={isEdit} />
              <InputFormField label="Func Group Name" name="groupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Sub Group No." name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'subGroupNo', formData)} onChange={memoizedHandleChange} type="number" max="3" isRequired={true} isDefault={isEdit} />
              <InputFormField label="Sub Group Name" name="subGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
            </div>

            <div className="child-challan-screen-container" style={{ backgroundColor: '#fff', paddingBottom: '2px' }}>

              <h6>Item Details</h6>
              <ChildIndentEntryScreen
                errors={errors}
                setErrors={setErrors}
                hasError={hasError}
                isEdit={isEdit}
                indentItemChildList={memoizedIndentItemChildList}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            <div className="child-challan-screen-container" style={{ backgroundColor: '#fff', paddingBottom: '2px' }}>
              <h6>Doc Reference</h6>
              <ChildDocRef
                errors={errors}
                formData={formData}
                setErrors={setErrors}
                isEdit={isEdit}
                indentRefChildren={memoizedIndentRefChildren}
                setFormData={setFormData}
                hasError={memoizedHasError}
              />
            </div>


            <TableRouteDetail
              routing={memoizedSelectedLoginId}
              setFormData={setFormData}
              hasError={memoizedHasError}
              errors={errors}
              setErrors={setErrors}
              formData={formData}
            />



            <div className="modal-footer mt-1">
              <span className="text-danger">{errorMessage ? errorMessage : null}</span>
              <span className="text-success">{successReponse ? successReponse : null}</span>

              {
                isEdit && (
                  <>
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
                        : "Submit"}
                    </button>
                  </>
                )
              }

              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddEditEntry;