import React, { useState, useEffect } from "react";
import { Container, Form, Button, Pagination } from "react-bootstrap";
import EditEmployeePopup from "./EditEmployeePopUp";
import "./EmployeeManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import userService from "../../services/user.service";
import managerService from "../../services/manager.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeManagement() {

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employees, setEmployees] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        managerService.getUsersByCompanyId(userFromLocal.companyId)
            .then((res) => {
                if (res) {
                    setEmployees(res);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newEmployee = {
            companyId: userFromLocal.companyId,
            companyName: userFromLocal.companyName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: "USER",
        };

        // Add the new employee to the employees array
        setEmployees([...employees, newEmployee]);

        managerService.addEmployee(newEmployee)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })

        // Clear input fields for the next employee entry
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");

        // Update employees in local storage with the modified array
        localStorage.setItem("employees", JSON.stringify([...employees, newEmployee]));
    };

    const handleEditEmployee = (index) => {
        setSelectedEmployeeIndex(index);
        setShowEditPopup(true);
    };

    const handleSaveEditedEmployee = (editedEmployee) => {
        const updatedEmployees = [...employees];
        updatedEmployees[selectedEmployeeIndex] = editedEmployee;
        setEmployees(updatedEmployees);
        setShowEditPopup(false);

        // Update employees in local storage with the modified array
        userService.updateUser(editedEmployee.id, editedEmployee)
            .then((res) => {
                console.log("Updated");
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const handleDeleteEmployee = (index) => {
        // Create a copy of the employees array
        const updatedEmployees = [...employees];
        const deletedEmployee = updatedEmployees[index];
        updatedEmployees.splice(index, 1);

        // Update the employees state with the modified array
        setEmployees(updatedEmployees);

        // Update employees in local storage with the modified array
        managerService.deleteEmployee(deletedEmployee.id)
            .then((res) => {
                console.log("deleted")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClosePopup = () => {
        setSelectedEmployeeIndex(-1);
        setShowEditPopup(false);
    };

    // Calculate the index of the last employee to display on the current page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    // Calculate the index of the first employee to display on the current page
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    // Get the employees to display on the current page
    const employeesToDisplay = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevClick = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(employees.length / employeesPerPage)));
    };

    return (
        <>
            <NavbarComponent />
            <Container className="employees-container" fluid>
                <div className="employees-form">
                    <h2 className="title">Create Employees</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <>
                            <Form.Group controlId="firstname">
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="lastname">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <br />
                            <Button variant="outline-success" type="submit">
                                Add Employee
                            </Button>
                        </>
                    </Form>
                </div>
                <h2 className="title">All Employees:</h2>
                <ul>
                    {employeesToDisplay.map((employee, index) => (
                        <li className="employee-wrapper" key={employee.id}>
                            <h5>{employee.firstname} {employee.lastname}</h5>
                            <div className="employee-info">
                                <div className="list-email">
                                    <b>{employee.firstName + " " + employee.lastName}</b>
                                    <p>{employee.role}</p>
                                </div>

                                <div>
                                    <Button
                                        className="edit-employee-btn"
                                        variant="outline-success"
                                        onClick={() => handleEditEmployee(index)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleDeleteEmployee(index)}
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
                        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={currentPage === index + 1}
                                onClick={() => handlePaginationClick(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={handleNextClick} disabled={currentPage === Math.ceil(employees.length / employeesPerPage)} />
                    </Pagination>
                </div>

                {showEditPopup && selectedEmployeeIndex !== -1 && (
                    <EditEmployeePopup
                        employee={employees[selectedEmployeeIndex]}
                        onClose={handleClosePopup}
                        onSave={handleSaveEditedEmployee}
                    />
                )}
            </Container>
        </>
    );
}

export default EmployeeManagement;
