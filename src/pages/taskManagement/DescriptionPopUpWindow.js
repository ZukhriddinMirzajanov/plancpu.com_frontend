import React from "react";
import { Modal, Button } from "react-bootstrap";

function DescriptionPopUpWindow({ task, show, onClose }) {
    let taskStatus = "In Backlog";
    if (task.statusOfTask === 1) {
        taskStatus = "Open";
    }
    if (task.statusOfTask === 2) {
        taskStatus = "In Progress";
    }
    if (task.statusOfTask === 3) {
        taskStatus = "In Review";
    }
    if (task.statusOfTask === 4) {
        taskStatus = "Closed";
    }
    const getFormatDate = (date) => {
        const createdAtDate = new Date(task.createdAt); // Convert seconds to milliseconds
        const formattedDate = createdAtDate.toDateString();
        // return formattedDate.substring(8,10);
        return formattedDate;
    }
    // const getFormatTime = (date) => {
    //     const createdAtDate = new Date(task.createdAt); // Convert seconds to milliseconds
    //     const formattedTime = createdAtDate.toLocaleTimeString();
    //     return formattedTime;
    // }
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
                <p>{taskStatus}</p>
                <hr />
                <small>Task created by {task.createdByName} on {getFormatDate(task.createdAt)}</small>
                <hr />
                {task.assignedBy === "Unassigned" && (
                    <small>Task is Unassigned</small>
                )}
                {task.assignedBy !== "Unassigned" && (
                    <small>Task is assigned by {task.assignedBy}</small>
                )}
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
