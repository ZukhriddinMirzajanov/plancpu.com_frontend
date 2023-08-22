

import React, { useState, useEffect } from "react";
import { Container, Button, Pagination } from "react-bootstrap";
import EditUserPopup from "./EditUserPopUp";
import "./UserManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import adminService from "../../services/admin.service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function UserManagement() {
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [email, setEmail] = useState("");
    // const [companyName, setCompanyName] = useState("");
    const [users, setUsers] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [isLoading, setIsLoading] = useState(false);

    function fetchUsers() {
        setIsLoading(true);
        adminService.getManagers()
            .then((res) => {
                setIsLoading(false);
                setUsers(res);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
                toast.error("Error!");
            })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(fetchUsers, []);

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();

    //     const newUser = {
    //         id: Date.now(),
    //         firstname,
    //         lastname,
    //         email,
    //         companyName,
    //         createdTime: Date.now(),
    //     };

    //     // Add the new user to the users array
    //     setUsers([...users, newUser]);

    //     // Clear input fields for the next user entry
    //     setFirstname("");
    //     setLastname("");
    //     setEmail("");
    //     setCompanyName("");

    //     // Update users in local storage with the modified array
    //     localStorage.setItem("users", JSON.stringify([...users, newUser]));
    // };

    // const handleEditUser = (index) => {
    //     setSelectedUserIndex(index);
    //     setShowEditPopup(true);
    // };

    const handleSaveEditedUser = (editedUser) => {
        const updatedUsers = [...users];
        updatedUsers[selectedUserIndex] = editedUser;
        setUsers(updatedUsers);
        setShowEditPopup(false);

        // Update users in local storage with the modified array
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const handleDeleteUser = (index) => {
        // Create a copy of the users array
        const updatedUsers = [...users];
        const deletedUser = updatedUsers[index];
        updatedUsers.splice(index, 1);

        // Update the users state with the modified array
        setUsers(updatedUsers);

        // Update users in local storage with the modified array
        adminService.deleteUser(deletedUser.id);
    };

    const handleClosePopup = () => {
        setSelectedUserIndex(-1);
        setShowEditPopup(false);
    };

    // Calculate the index of the last user to display on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    // Calculate the index of the first user to display on the current page
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // Get the users to display on the current page
    const usersToDisplay = users.length > 0 ? users.slice(indexOfFirstUser, indexOfLastUser) : [];

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(users.length / usersPerPage)));
    };
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
            <NavbarComponent />
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <Container className="users-container" fluid>
                <ToastContainer position="top-center" />
                {/* <div className="users-form">
                    <h2 className="title">Create Users</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="firstname">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="lastname">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="companyName">
                                    <Form.Label>Company Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className="mt-3 add-user-btn" type="submit">
                            Add User
                        </Button>
                    </Form>
                </div> */}
                <h2 className="title">All Users:</h2>
                <ul>
                    {usersToDisplay.map((user, index) => (
                        <li className="user-wrapper" key={user.id}>
                            <h5>{user.firstName} {user.lastName}</h5>
                            <div className="user-info">
                                <div className="list-email">
                                    <b>Email:</b><i> {user.email}</i> --
                                    <b>Company:</b> {user.companyName}
                                </div>

                                <div className="user-btns">
                                    {/* <Button
                                        className="edit-btn"
                                        onClick={() => handleEditUser(index)}
                                    >
                                        Edit
                                    </Button> */}
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleDeleteUser(index)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevClick} disabled={currentPage === 1} />
                        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={currentPage === index + 1}
                                onClick={() => handlePaginationClick(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={handleNextClick} disabled={currentPage === Math.ceil(users.length / usersPerPage)} />
                    </Pagination>
                </div>

                {showEditPopup && selectedUserIndex !== -1 && (
                    <EditUserPopup
                        user={users[selectedUserIndex]}
                        onClose={handleClosePopup}
                        onSave={handleSaveEditedUser}
                    />
                )}
            </Container>
        </>
    );
}

export default UserManagement;
