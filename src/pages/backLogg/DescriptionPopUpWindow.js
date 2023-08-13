import React from "react";
import { Modal, Button } from "react-bootstrap";

function DescriptionPopUpWindow({ task, show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{task.description}</p>
        <hr />
        {task.hour} hours to spend
        <hr />
        <p>Task created by {task.createdByName}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DescriptionPopUpWindow;
