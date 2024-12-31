import React, { useCallback, memo } from 'react'; 
import Loader from '../../../../components/Loader'; 
import InputFormField from '../../../../components/formComponent/InputFormField';  
import InputDateField from '../../../../components/formComponent/InputDateField';

const AddEditEntry = memo(({ formData, setFormData, handleSubmit, onClose, isEdit, isLoading, hasError, errors, setErrors, errorMessage, successReponse }) => {
    
   
  // const memoizedHandleChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors };
  //     if (updatedErrors[name]) {
  //       delete updatedErrors[name];
  //     }
  //     return updatedErrors;
  //   });
  // }, [setFormData, setErrors]);

  // const memoizedHandleChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   setErrors(prevErrors => {
  //     const updatedErrors = { ...prevErrors };
  //     if (updatedErrors[name]) {
  //       delete updatedErrors[name];
  //     }
  //     if (name === 'advSisReturnQty') {
  //       const qtyClaimed = parseFloat(value) || 0;
  //       let qtyRejected = parseFloat(formData.challanIssueQty);
  //       if (isEdit) {
  //         if (qtyRejected === 0) {
  //           qtyRejected = parseFloat(formData.checksetItemQty)
  //         } else {
  //           qtyRejected = parseFloat(formData.checksetItemQty) + parseFloat(formData.challanIssueQty)
  //         }

  //       }

  //       if (qtyClaimed > qtyRejected) {
  //         setFormData(prev => ({
  //           ...prev,
  //           qtyClaimed: null,
  //         }));
  //         updatedErrors.qtyClaimed = `maximum claim qty should be ${qtyRejected}.`;
  //       } else {
  //         delete updatedErrors.qtyClaimed;
  //       }
  //     }

  //     return updatedErrors;
  //   });
  // }, [setFormData, setErrors, formData]);

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
      if (name === 'advSisReturnQty') {
        const advSisReturnQty = parseFloat(value) || 0;
        const challanIssueQty = parseFloat(formData.challanIssueQty) || 0;
  
        if (advSisReturnQty > challanIssueQty) {
          updatedErrors.advSisReturnQty = `Maximum return qty should be ${challanIssueQty}.`;
          setFormData(prev => ({
            ...prev,
            advSisReturnQty: '', 
          }));
        }
      }
  
      return updatedErrors;
    });
  }, [setFormData, setErrors, formData]);
   




 
  const clearValidationErrors = useCallback(() => {
    onClose();
  }, [onClose]);

 

 
  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {formData.isUpdate ? "Edit Advanced SIS Return" : "Add Advanced SIS Return"}
            </h5>
            <button type="button" className="btn-close" onClick={clearValidationErrors} aria-label="Close"></button>
          </div>
          <div className="px-3 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div>
          <div className="modal-body _rkContent" style={{  minHeight: "40vh", zIndex: 99999 }}>
         
              <div className="row py-2 _rkContentBorder" >
              
                <InputFormField label="Advanced SIS No" name="challanIssueNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputDateField label="Advanced SIS Date" name="challanIssueDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="date" isDefault={true} />

                <InputFormField label="Challan No" name="challanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true}  />
                <InputFormField label="Dept Challan No" name="deptChallanNo" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputDateField label="Challan Date" name="challanDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  isDefault={true} />
                <InputFormField label="Advanced SIS Qty" name="challanIssueQty" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

                <InputFormField label="Depot Code" name="depoCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputFormField label="Item Code" name="itemCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true}  />

               
                <InputFormField label="Item Desc" name="itemDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />

                <InputFormField label="Unit Code" name="unitCode" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true} />
                <InputFormField label="Unit Desc" name="unitDescription" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true}  />

                <InputFormField label="Return By" name="returnedByName" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} isDefault={true}  />
                <InputDateField label="Return Date" name="returnDate" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  isRequired={true} />
                <InputFormField label="Return Qty" name="advSisReturnQty" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange} type="number" max="10" isRequired={true}  />
                <InputFormField label="BIN Balance" name="binBalance" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
                <InputFormField label="Remarks" name="returnRemarks" inputData={formData} hasError={hasError} errorMsg={errors} onChange={memoizedHandleChange}  />
              

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
                ? formData.isUpdate
                  ? "Updating..."
                  : "Submitting..."
                : formData.isUpdate
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