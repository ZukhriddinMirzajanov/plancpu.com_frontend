import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditUserPopup({ user, onClose, onSave }) {
  const [editedFirstname, setEditedFirstname] = useState(user.firstname);
  const [editedLastname, setEditedLastname] = useState(user.lastname);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedCompanyName, setEditedCompanyName] = useState(user.companyName);

  const handleSave = () => {
    onSave({
      id: user.id,
      firstname: editedFirstname,
      lastname: editedLastname,
      email: editedEmail,
      companyName: editedCompanyName,
    });
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
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

          <Form.Group controlId="editedCompanyName">
            <Form.Label>Company Name:</Form.Label>
            <Form.Control
              type="text"
              value={editedCompanyName}
              onChange={(e) => setEditedCompanyName(e.target.value)}
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

export default EditUserPopup;
