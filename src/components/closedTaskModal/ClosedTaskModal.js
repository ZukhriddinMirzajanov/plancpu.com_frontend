
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import taskCommentService from "../../services/taskComment.service";
import { HashLoader } from "react-spinners";

const ClosedTaskModal = ({ show, onHide, taskData }) => {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (taskData.id) {
            setIsLoading(true);
            taskCommentService.getAllCommentsByTaskId(taskData.id)
                .then(res => {
                    setIsLoading(false);
                    if (res.length > 0) {
                        setComments(res);
                    }
                })
        }

    }, [taskData])

    const getFormatDate = (date) => {
        const createdAtDate = new Date(date); // Convert seconds to milliseconds
        const year = createdAtDate.getFullYear();
        // Note: getMonth() returns values from 0 to 11, so you need to add 1 to get the correct month.
        const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
        const day = String(createdAtDate.getDate()).padStart(2, '0');
        const hours = String(createdAtDate.getHours()).padStart(2, '0');
        const minutes = String(createdAtDate.getMinutes()).padStart(2, '0');

        // Create the formatted date string in "YYYY-MM-DD" format
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDate;
    }

    const spinnerContainerCss = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "9999",
    };

    return (
        <>
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
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
                        <p>Task is reviewed by {taskData.userReviewed.firstName} {taskData.userReviewed.lastName}</p>
                    )}
                    <h6>Comments</h6>
                    {comments.length > 0 ? (
                        <div className="comments-bg">
                            {comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <div className="card-bottom">
                                        <small>By {comment.commentedUserFullName}</small>
                                        <small></small>

                                    </div>
                                    <p>{comment.comment}</p>
                                    <div className="card-bottom">
                                        <small></small>
                                        <small className="commented-time">{getFormatDate(comment.commentedDate)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p>No comments</p>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default ClosedTaskModal;
