import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

function ProjectUsersModal({ show, onHide, userList, onAssignUser }) {
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const handleAssignUser = () => {
    if (selectedUserId !== null) {
      onAssignUser(selectedUserId);
      setSelectedUserId(null);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {userList.map((user) => (
            <ListGroup.Item
              key={user.id}
              active={user.id === selectedUserId}
              onClick={() => setSelectedUserId(user.id)}
            >
              {user.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAssignUser}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProjectUsersModal;
