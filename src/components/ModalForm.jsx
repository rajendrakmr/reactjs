import React from 'react';
import Loader from './Loader';

const ModalForm = ({
  title,
  isEdit,
  onClose,
  onSubmit,
  children, 
  isLoading,
  errorMessage,
  successMessage,
}) => {
  return (
    <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "#fff" }}>
      <div className="modal-dialog modal-custom-width modal-fullscreen custom-modal-dialog">
        <div className="modal-content">
          <div className="modal-header custome-button-color1">
            <h5 className="modal-title text-white">
              {isEdit ? `Edit ${title}` : `Add ${title}`}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
 
          <div className="px-5 mx-auto text-bold text-end w-100 ">
            <span className="text-danger mandatorField">(*) Indicates Mandatory Fields.</span>
          </div> 
          {children}  

          <div className="modal-footer mt-5">
            <span className="text-danger">{errorMessage || null}</span>
            <span className="text-success">{successMessage || null}</span> 
            <button
              type="button"
              className="btn btn-sm btn-danger text-white mx-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn custome-button-color1 btn-sm text-white"
              onClick={onSubmit}
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
  );
};

export default ModalForm;
