import React from "react";
import { Modal, Button } from "react-bootstrap";

function DescriptionPopUpWindow({ task, show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{task.description}</p>
        <hr />
        {task.time} hours to spend
        <hr />
        <p>{task.taskStatus}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DescriptionPopUpWindow;
