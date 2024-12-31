import React, { useEffect } from "react";
import ErrorMessage from "../../../helperFuc/validationMessages/ErrorMessage";
import InfiniteScroll from 'react-infinite-scroll-component';

const ApprovalAuthorityAddEdit = ({
  formData,
  handleChange,
  handleSubmit,
  onClose,
  isEdit,
  addFormErrors,
  disableDepoCode,
  loading,
  error,
  getdepartment,
  getLoginIds,
  setAddFormErrors,
  setFormData
}) => {
  const hasError = (field) => {
   
    return addFormErrors.hasOwnProperty(field) && !formData[field].trim();
  };

  // const clearValidationErrors = () => {
  //   if (Object.keys(addFormErrors).length === 0) {
  //     onClose();
  //   }
  // };


  const handleClose = () => {
    onClose();
    setAddFormErrors({})
    setFormData({})
  };

  const handleLoginIdChange = (event) => {
    const selectedLoginId = event.target.value;
    const selectedUser = getLoginIds.success?.find(user => user.loginId.toString() === selectedLoginId);
    handleChange({ target: { name: "loginId",value: selectedLoginId }});
    if (selectedUser) {
      handleChange({
        target: {
          name: "ngs",
          value:parseInt(selectedUser.ngs) 
        }
      });
    }
  };

  useEffect(() => {
    if (isEdit && formData.loginId) {
      const selectedUser = getLoginIds.success?.find(user => user.loginId.toString() === formData.loginId.toString());
      if (selectedUser) {
        handleChange({
          target: {
            name: "ngs",
            value: parseInt(selectedUser.ngs)
          }
        });
      }
    }
  }, [isEdit, formData.loginId, getLoginIds.success]);

  
  const loginIdOptions = getLoginIds.success?.map((user) => ({
    value: user.loginId,
    label: `${user.loginId} - ${user.nam}`
  }));

 
  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Indent Approval Authority" : "Add Indent Approval Authority"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          {error &&
            <div className="mt-2">
              <ErrorMessage error={error} />
            </div>}
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="form-group col-md-4">
                  <label htmlFor="documentType">Document Type:</label>
                  <textarea
                    rows={3}
                    className={` form-control custome-border ${hasError("documentType") ? "is-invalid" : ""}`}
                    id="documentType"
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    disabled={disableDepoCode}
                    maxLength={50}
                  />
                  {hasError("documentType") && (
                    <div className="invalid-feedback">
                      {addFormErrors.documentType}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="department">Department:</label>
                  <div className="select-container">
                    <select
                      className={`custome-input-height form-control custome-border ${hasError("department") ? "is-invalid" : ""}`}
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={disableDepoCode}  
                    >
                      <option value="">Choose...</option>
                      {getdepartment?.success?.map((code, index) => (
                        <option key={index} value={code.id}>
                           {code.id} - {code.deptName}
                        </option>
                      ))}
                    </select>
                    {hasError("department") && (
                      <div className="invalid-feedback">
                        {addFormErrors.department}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="loginId">Login Id:</label>
                  <div className="select-container">
                    <select
                      className={`custome-input-height form-control custome-border ${hasError("loginId") ? "is-invalid" : ""}`}
                      id="loginId"
                      name="loginId"
                      value={formData.loginId}
                      onChange={handleLoginIdChange}
                      disabled={disableDepoCode}
                    >
                      <option value="">Choose...</option>
                      {getLoginIds.success?.map((user, i) => (
                        <option key={i} value={user.loginId}>
                          {user.loginId} - {user.nam}
                        </option>
                      ))}
                    </select>
                    {hasError("loginId") && (
                      <div className="invalid-feedback">
                        {addFormErrors.loginId}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="form-group col-md-4">
                  <label htmlFor="ngs">NGS:</label>
                  
                  <input
                    type="text"
                    className={`custome-input-height form-control custome-border ${hasError("ngs") ? "is-invalid" : ""}`}
                    id="ngs"
                    name="ngs"
                    value={formData.ngs}
                    onChange={handleChange}
                    disabled
                  />
                  {hasError("ngs") && (
                    <div className="invalid-feedback">
                      {addFormErrors.ngs}
                    </div>
                  )}
                </div>
                
                <div className="form-group col-md-4">
                  <label htmlFor="fromDate">From Date:</label>
                  <input
                    type="date"
                    className={`custome-input-height form-control custome-border ${hasError("fromDate") ? "is-invalid" : ""}`}
                    id="fromDate"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                   
                  />
                   {hasError("fromDate") && (
                    <div className="invalid-feedback">
                      {addFormErrors.fromDate}
                    </div>
                  )} 
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="toDate">To Date:</label>
                  <input
                    type="date"
                    className={`custome-input-height form-control custome-border ${hasError("toDate") ? "is-invalid" : ""}`}
                    id="toDate"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                  
                  />
                   {hasError("toDate") && (
                    <div className="invalid-feedback">
                      {addFormErrors.toDate}
                    </div>
                  )} 
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-danger text-white mx-2"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn custome-button-color1 btn-sm text-white"
              onClick={handleSubmit}
            >
              {loading ? (isEdit ? "Updating..." : "Submitting...") : (isEdit ? "Update" : "Submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalAuthorityAddEdit;
