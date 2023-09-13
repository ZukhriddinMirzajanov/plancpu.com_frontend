import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import userService from "../../services/user.service";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

function ProjectUsersModal({ show, onHide, userList, selectedProject, onAsiggn }) {
    const [selectedUser, setSelectedUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const filterUsersByProject = () => {
        return userList.filter(user => user.companyProjects.every(project => project.id !== selectedProject.id));
    }

    const handleAssignUser = () => {

        if (selectedUser !== null) {

            setIsLoading(true);
            userService.addCompanyProjectToUser(selectedUser, selectedProject.id)
                .then(res => {
                    if (res !== null) {
                        setIsLoading(false);
                        onHide();
                        toast.info("User assigned to Company project");
                        onAsiggn(res);
                    } else {
                        setIsLoading(false);
                        onHide();
                        toast.error("Error while assigning user to Company Project");
                    }
                })

        }
    };

    const hideModal = () => {
        setSelectedUser("");
        onHide();
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
        zIndex: "9999"
    };

    return (
        <>
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <ToastContainer position="top-center" />
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign User to Compnay Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {filterUsersByProject().map((user) => (
                            <ListGroup.Item
                                style={{ cursor: "pointer" }}
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                active={user.id === selectedUser.id}
                            >
                                {user.firstName} {user.lastName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => hideModal()}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleAssignUser()}>
                        Assign
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProjectUsersModal;
