import React from 'react';

const ConfirmationModal = ({ show, handleClose, handleConfirm, message ,errorMessage,loading=false}) => {
  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      id="confirmModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="confirmModalLabel"
      aria-hidden={!show}
      style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">Are you sure?</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
             <span className="text-danger">Once confirmed, it cannot be changed.</span>
            <br/> 
            {errorMessage && (<span className="text-danger">{errorMessage}</span>)}
          </div>
          <div className="modal-footer">
         
            <button type="button" className="btn btn-md btn-danger text-white mx-2" onClick={handleClose} disabled={loading}>
              No
            </button>
            <button type="button" className="btn custome-button-color1 btn-md text-white" disabled={loading} onClick={handleConfirm}>
              {loading?'Updating...':'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
