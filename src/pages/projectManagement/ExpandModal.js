import React from "react";
import { Modal, Button } from "react-bootstrap";

function ExpandModal({ show, onHide, project }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title> <b>Title:</b> {project.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Project Id:</b> {project.id}</p>
        <p> <b>Description:</b> {project.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExpandModal;
