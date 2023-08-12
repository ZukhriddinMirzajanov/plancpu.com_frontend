
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PopUpWindow = ({ show, onHide, taskData }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Task Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Task Id: {taskData.id}</h6>
        <h5>Title: {taskData.name}</h5>
        <p>Description: {taskData.description}</p>
        
        {/* Render other task details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpWindow;
