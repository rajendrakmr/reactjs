import React, { useState } from 'react';

const EmployeeTypeModal = ({ 
  show = true, 
  handleClose, 
  handleConfirm, 
  message, 
  errorMessage, 
  loading = false, 
  users = [] ,
  setFieldValue
}) => {
  const [selectedUser, setSelectedUser] = useState(null); 

 
  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const onConfirm = () => {
    if (selectedUser) {
      handleConfirm(selectedUser,setFieldValue); 
    } else {
      alert("Please select a user.");  
    }
  };

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
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmModalLabel">Employee List</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body"> 
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 
            <table className="table table-bordered text-center">
              <thead className="table-header-bg text-white" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <tr>
                  <th scope="col"></th> 
                  <th scope="col">Login Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="radio"
                        className="custome-input-height custome-borde"
                        name="isChildSerial"
                        onChange={() => handleUserSelection(user)}  
                        checked={selectedUser === user}  
                      />
                    </td> 
                    <td>{user.loginName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-md btn-danger text-white mx-2" 
              onClick={handleClose} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn custome-button-color1 btn-md text-white" 
              disabled={loading || !selectedUser} 
              onClick={onConfirm}  
            >
              {loading ? 'Updating...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTypeModal;
