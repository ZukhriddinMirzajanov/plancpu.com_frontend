import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import EditEmployeePopup from "./EditEmployeePopUp";
import "./EmployeeManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";

function EmployeeManagement() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  // Load employees from local storage on component mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: Date.now(),
      firstname,
      lastname,
      email,
      profession,
      createdTime: Date.now(),
    };

    // Add the new employee to the employees array
    setEmployees([...employees, newEmployee]);

    // Clear input fields for the next employee entry
    setFirstname("");
    setLastname("");
    setEmail("");
    setProfession("");

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
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleDeleteEmployee = (index) => {
    // Create a copy of the employees array
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);

    // Update the employees state with the modified array
    setEmployees(updatedEmployees);

    // Update employees in local storage with the modified array
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
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
                <Form.Group controlId="profession">
                  <Form.Label>Profession:</Form.Label>
                  <Form.Control
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3 add-employee-btn" type="submit">
              Add Employee
            </Button>
          </Form>
        </div>
        <h2 className="title">All Employees:</h2>
        <ul>
          {employeesToDisplay.map((employee, index) => (
            <li className="employee-wrapper" key={employee.id}>
              <h5>{employee.firstname} {employee.lastname}</h5>
              <div className="employee-info">
                <div className="list-email">
                  <b>Email:</b> {employee.email} --
                  <b>Profession:</b> {employee.profession}
                </div>
                
                <div className="employee-btns">
                  <Button
                    className="edit-btn"
                    onClick={() => handleEditEmployee(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete-btn"
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
