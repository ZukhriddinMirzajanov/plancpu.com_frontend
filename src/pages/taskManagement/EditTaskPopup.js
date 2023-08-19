import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function EditTaskPopup({ task, onClose, onSave }) {
    const [editedName, setEditedName] = useState(task.name);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedHour, setEditedHour] = useState(task.hour);

    const handleUpdate = () => {
        onSave({
            id: task.id,
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            name: editedName,
            hour: editedHour,
            createdAt: task.createdAt,
            statusOfTask: 0,
            description: editedDescription,
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
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
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
                            value={editedHour}
                            onChange={(e) => setEditedHour(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="outline-success" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditTaskPopup;
