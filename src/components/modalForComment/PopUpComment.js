import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./PopUpComment.css";
import taskCommentService from "../../services/taskComment.service";
import { HashLoader } from "react-spinners";
import * as Icon from "react-bootstrap-icons";


const PopUpComment = ({ show, onHide, taskData }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));

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

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSendComment = () => {
        if (comment.trim() !== "") {
            const newComment = {
                taskId: taskData.id,
                comment: comment,
                commentedUserFullName: userFromLocal.firstName + " " + userFromLocal.lastName,
                commentedUserEmail: userFromLocal.email,
                commentedDate: Date.now()
            }
            taskCommentService.createTaskComment(newComment)
                .then(res => {
                    if (res) {
                        setComments([...comments, res]);
                        setComment("");
                    }
                })

        }
    };

    const deleteComment = (id, index) => {
        if (id) {
            let updatedComments = [...comments];
            updatedComments.splice(index, 1);
            setIsLoading(true);
            taskCommentService.deleteTaskComment(id)
                .then(res => {
                    setIsLoading(false);
                    if (res) {
                        setComments(updatedComments);
                    } else {
                        setIsLoading(false);
                        console.log(res);
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    console.log(err)
                })
        }
    }

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
            <Modal size="lg" show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>{taskData.name}</h6>
                    <div className="comments-bg">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <div className="card-bottom">
                                    <small>By {comment.commentedUserFullName}</small>
                                    {userFromLocal.email === comment.commentedUserEmail && (
                                        <small>
                                            <Icon.Trash className="time-register-clear-btn" onClick={() => deleteComment(comment.id, index)} />
                                        </small>
                                    )}

                                </div>
                                <p>{comment.comment}</p>
                                <div className="card-bottom">
                                    <small></small>
                                    <small className="commented-time">{getFormatDate(comment.commentedDate)}</small>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Form.Group style={{ marginBottom: "10px" }} controlId="commentTextArea">
                        <Form.Control
                            as="textarea"
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                            rows={3}
                        />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={handleSendComment}>
                        Comment
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );
};

export default PopUpComment;
