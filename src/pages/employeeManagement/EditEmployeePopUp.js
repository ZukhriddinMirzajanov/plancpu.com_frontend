import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditEmployeePopup({ employee, onClose, onSave }) {
  const [editedFirstname, setEditedFirstname] = useState(employee.firstname);
  const [editedLastname, setEditedLastname] = useState(employee.lastname);
  const [editedEmail, setEditedEmail] = useState(employee.email);
  const [editedProfession, setEditedProfession] = useState(employee.profession);

  const handleSave = () => {
    onSave({
      id: employee.id,
      firstname: editedFirstname,
      lastname: editedLastname,
      email: editedEmail,
      profession: editedProfession,
    });
    onClose();
  };

  return (
    <Modal show={true} size="lg" onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editedFirstname">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              value={editedFirstname}
              onChange={(e) => setEditedFirstname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="editedLastname">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              value={editedLastname}
              onChange={(e) => setEditedLastname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="editedEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="editedProfession">
            <Form.Label>Profession:</Form.Label>
            <Form.Control
              type="text"
              value={editedProfession}
              onChange={(e) => setEditedProfession(e.target.value)}
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

export default EditEmployeePopup;
