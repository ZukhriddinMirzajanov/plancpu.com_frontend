import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./PopUpComment.css";

const PopUpComment = ({ show, onHide }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSendComment = () => {
    if (comment.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const newComment = {
        text: comment,
        timestamp: timestamp,
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="comments-bg">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <h5>{comment.text}</h5>
              <p className="commented-time">{comment.timestamp}</p>
            </div>
          ))}
        </div>

        <Form.Group controlId="commentTextArea">
          <Form.Control
            as="textarea"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            rows={4}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSendComment}>
          Send
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpComment;
