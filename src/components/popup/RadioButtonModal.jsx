import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RadioButtonModal = ({ show, handleClose, options, onSelect }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select Application ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {options.map((option) => (
          <div key={option.application}>
            <input
              type="radio"
              id={option.application}
              name="applicationId"
              value={option.ngs}
              onChange={() => onSelect(option.application)}
            />
            <label htmlFor={option.application}>{option.application}</label>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RadioButtonModal;
