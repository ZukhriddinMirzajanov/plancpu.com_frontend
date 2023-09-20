
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ClosedTaskModal = ({ show, onHide, taskData }) => {
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
                {taskData.userCreated && (
                    <p>Task created by {taskData.userCreated.firstName} {taskData.userCreated.lastName}</p>
                )}
                
                {!taskData.userWorked && (
                    <p>Task is Unassigned</p>
                )}
                {taskData.userWorked && (
                    <p>{taskData.userWorked.firstName} {taskData.userWorked.lastName} is worked on this task</p>
                )}
                {taskData.userReviewed && (
                    <p>Task is reviewing by {taskData.userReviewed.firstName} {taskData.userReviewed.firstName}</p>
                )}
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClosedTaskModal;
