
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProjectModal({ show, onHide, onSave, project }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [finishedDate, setFinishedDate] = useState("");

    useEffect(() => {
        if (project.id) {
            setName(project.name || "");
            setDescription(project.description || "");
            setCreatedDate(project.createdDate || "");
            setFinishedDate(project.finishedDate || "");
        }
    }, [project]);

    const handleSave = () => {
        const editedProject = {
            id: project.id,
            name: name,
            description: description,
            createdDate: createdDate,
            finishedDate: finishedDate,
            company: project.company
        }
        onSave(editedProject);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="startDate">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="date"
                        value={createdDate}
                        onChange={(e) => setCreatedDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="date"
                        value={finishedDate}
                        onChange={(e) => setFinishedDate(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleSave}>
                    Edite
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProjectModal;
