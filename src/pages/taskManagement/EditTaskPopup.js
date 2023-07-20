import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditTaskPopup({ task, onClose, onSave }) {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedTime, setEditedTime] = useState(task.time);

  const handleSave = () => {
    onSave({
      id: task.id,
      title: editedTitle,
      description: editedDescription,
      time: editedTime,
    });
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editedTitle">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="editedDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="editedTime">
            <Form.Label>Time:</Form.Label>
            <Form.Control
              type="number"
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskPopup;
