import React, { useState } from 'react';

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  message,
  errorMessage,
  loading = false,
  item
}) => {
  const [reason, setReason] = useState("");
  const handleReasonChange = (e) => { setReason(e.target.value); };

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
          {errorMessage && (<span className="text-danger">{errorMessage}</span>)}

          {item?.indentStatus === "R" && (
            <div className="modal-body">
              <div className="mt-3">
                <label htmlFor="reason">Reason for Rejection:</label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={handleReasonChange}
                  className="form-control"
                  rows="3"
                  placeholder="Enter reason for rejection..."
                />
              </div>
            </div>
          )}

          <div className="modal-footer">
            <span className="text-danger">Do you want to proceed?</span>
            <button type="button" className="btn btn-md btn-danger text-white mx-2" onClick={handleClose} disabled={loading}>
              No
            </button>
            <button
              type="button"
              className="btn custome-button-color1 btn-md text-white"
              disabled={loading || (item?.indentStatus === "R" && !reason)}
              onClick={() => handleConfirm(reason)}
            >
              {loading ? 'Updating...' : 'Yes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
