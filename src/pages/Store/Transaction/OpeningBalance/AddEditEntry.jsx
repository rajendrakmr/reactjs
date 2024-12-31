import React, { useCallback, memo, } from 'react'; 
import InputField from "../../../../components/InputField";
import Loader from "../../../../components/Loader";

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successMessage }) => { 
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


  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? "Edit Opening Balance" : "Add Opening Balance"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-4 mx-auto p-1 text-bold text-end w-100 ">
            <span className="text-danger">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body" style={{ flex: "unset", minHeight: "10vh", }}>
            <form>
              <div className="row mt-2" style={{ alignItems: "center" }}>
                <InputField label="Current Year" name="currentYear" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" isRequired={true} />
                {/* <InputField label="Emp Code" name="empCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputField label="Emp Name" name="empName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} /> */}
              </div>
              <div className="row mt-2">
                {formData.currentYear && (<span className="text-danger text-bold" style={{ fontSize: "7pt", fontWeight: "bold" }}>(If put {formData.currentYear} as Current Year then 'Balance As On Date' will be 01/04/{formData.currentYear})</span>)}
              </div>
            </form>
          </div>
          <div className="mt-5 text-end px-5">
            <span className="text-danger">{errorMessage ? errorMessage : null}</span>
            <span className="text-success">{successMessage ? successMessage : null}</span> 
          </div>
          <div className="modal-footer"> 
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
              {isLoading ?  "Generating...": "Generate"}

              {/* {isLoading ?  "Generating...": isEdit? "Update" : "Generate"} */}
            </button>

            {isLoading && <Loader />} 
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddEditEntry;