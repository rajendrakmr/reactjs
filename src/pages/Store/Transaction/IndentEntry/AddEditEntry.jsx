import React, { useCallback, useMemo, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ChildIndentEntryScreen from './ChildIndentEntryScreen';
import ChildDocRef from './ChildDocRef';
import TableRouteDetail from './TableRouteDetail';
import { GetFunGroup, GetFunGroupName, GetPlaceOfDel, GetSubFunGroup, GetSubFunGroupName, indentSender, RouteHistory } from './apiService';
import Loader from '../../../../components/Loader';
import InputFormField from '../../../../components/formComponent/InputFormField';
import InputDateField from '../../../../components/formComponent/InputDateField';
import debounce from 'lodash/debounce';
import SelectFormInput from '../../../../components/formComponent/SelectFormField';


const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {

  const [routeHistoryDetail, setRouteHistoryDetail] = useState([])
  const [placeOfDel, setPlaceOfDel] = useState([])
  const [funGroupOption, setFunGroupOption] = useState([])
  const [subGroupFunOption, setSubGroupFunOption] = useState([])
  useEffect(() => {
    GetPlaceOfDel(dispatch, setPlaceOfDel)
    GetFunGroup(dispatch, setFunGroupOption)
    RouteHistory(dispatch, setRouteHistoryDetail, { indentNo: formData?.indentNo });
    if (formData?.indentEdit === "S") {
      indentSender(dispatch, setFormData, { indentNo: formData?.indentNo })
    }
  }, []);
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



  const memoizedIndentItemChildList = useMemo(() => formData.indentItemChildList, [formData.indentItemChildList]);
  const memoizedIndentRefChildren = useMemo(() => formData.indentRefChildren, [formData.indentRefChildren]);

  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);


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



  const handleChangeSelect = useCallback(async (e, field) => {
    const { value, items } = e;

    setFormData((prev) => {
      const updatedIndentItemList = {
        ...prev,
        [field]: value,
        ...(
          field === 'groupNo' ? (
            GetSubFunGroup(dispatch, setSubGroupFunOption)
          ) : {}
        )
      };

      // setCurItemData(updatedIndentItemList);
      return { ...updatedIndentItemList };
    });


    setErrors(() => { return {}; });
  }, [setFormData]);

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h6 className="modal-title text-white">
              {isEdit
                ? (formData.indentStatus === "T"
                  ? "Edit Indent Entry"
                  : "View Indent Entry")
                : "Add Indent Entry"}
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
              <InputDateField label="Dept. Indent Date" name="deptIndentDate" minDate={formData.minDate} inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isRequired={true} isDefault={isEdit} />
              <InputFormField label="Dept. Indent No" name="deptIndentNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} />
              <InputFormField label="Indentor Desig" name="designation" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Indentor Dept" name="department" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <InputFormField label="Purpose of Proc." name="purposeOfProcurement" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={formData?.indentEdit === "S" ? false : true} />
              <InputDateField label="Prop Date of Del" minDate={formData.minDate} name="proposeddateOfDelivery" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={formData?.indentEdit === "S" ? false : true} />

              <InputFormField label="Consignee Name" name="consigneeName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'placeOfDelivery')}
                id="placeOfDelivery"
                name="placeOfDelivery"
                label="Place of Delivery"
                options={placeOfDel}
                value={formData.placeOfDelivery}
                hasError={hasError}
              />

              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'groupNo')}
                id="groupNo"
                name="groupNo"
                label="Func Group No."
                options={funGroupOption}
                value={formData.groupNo}
                hasError={hasError}
                required={true}
                error={errors.groupNo}
              />


              <SelectFormInput
                onChange={(selectedOption) => handleChangeSelect(selectedOption, 'subGroupNo')}
                id="subGroupNo"
                name="subGroupNo"
                label="Sub Group No."
                options={subGroupFunOption}
                value={formData.subGroupNo}
                hasError={hasError}
                required={true}
                error={errors.subGroupNo}
              />
              {/* <InputFormField label="Place of Delivery" name="placeOfDelivery" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={formData?.indentEdit === "S" ? false : true} /> */}
              {/* <InputFormField label="Func Group No." name="groupNo" inputData={formData} onKeyUp={(e) => onChangeFun(e, 'groupNo')} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="3" isRequired={true} isDefault={isEdit} />
              <InputFormField label="Func Group Name" name="groupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

              <InputFormField label="Sub Group No." name="subGroupNo" inputData={formData} hasError={hasError} errorMsg={errors} onKeyUp={(e) => onChangeFun(e, 'subGroupNo', formData)} onChange={memoizedHandleChange} type="number" max="3" isRequired={true} isDefault={isEdit} />
              <InputFormField label="Sub Group Name" name="subGroupName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} /> */}
            </div>

            <div className="child-challan-screen-container" style={{ paddingBottom: '2px' }}>

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

            <div className="child-challan-screen-container" style={{ paddingBottom: '2px' }}>
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
            {isEdit ? <div class="child-challan-screen-container">
              <div class="row">
                <div class="col-md-6">
                  <h6>Routing History</h6>
                  <table className="table table-bordered">
                    <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">From Route</th>
                        <th scope="col">To Route</th>
                        <th scope="col">Route Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeHistoryDetail.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.fromName}</td>
                          <td>{item.toName}</td>
                          <td>{item.routeDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {formData.indentStatus === "R" && (<div class="col-md-6">
                  <div className="form-group col-md-12">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Rejection Reason</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" disabled={true} value={formData.rejectionReason}></textarea>
                  </div>
                </div>)}
              </div>
            </div>
              :
              <TableRouteDetail
                routing={memoizedSelectedLoginId}
                setFormData={setFormData}
                hasError={memoizedHasError}
                errors={errors}
                setErrors={setErrors}
              />}

            <div className="modal-footer mt-1">
              <span className="text-danger">{errorMessage ? errorMessage : null}</span>
              <span className="text-success">{successReponse ? successReponse : null}</span>
              {
                isEdit && formData.indentStatus === "T" && (
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
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </>
                )
              }
              {
                !isEdit && (
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
                        : isEdit
                          ? "Update"
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