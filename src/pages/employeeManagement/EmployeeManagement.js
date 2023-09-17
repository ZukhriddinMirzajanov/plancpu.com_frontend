import React, { useState, useEffect } from "react";
import { Container, Form, Button, Pagination, Modal } from "react-bootstrap";
import EditEmployeePopup from "./EditEmployeePopUp";
import "./EmployeeManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import userService from "../../services/user.service";
import managerService from "../../services/manager.service";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function EmployeeManagement() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [employees, setEmployees] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;
  const userFromLocal = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [indexForDel, setIndexForDel] = useState("");
  const navigate = useNavigate();
  const [searchEmployee, setSearchEmployee] = useState("");

  function fetchUsersByCompanyId() {
    setIsLoading(true);
    userService.getUserById(userFromLocal.id).then((resUser) => {
      if (resUser !== null) {
        if (resUser.status === 403) {
          navigate("/login");
        }
        setCompany(resUser.company);
        if (resUser.company !== undefined) {
          managerService
            .getUsersByCompanyId(resUser.company.id)
            .then((resUsers) => {
              if (resUsers != null) {
                setIsLoading(false);
                let dataForEmp = [];
                if (resUsers.length > 0) {
                  resUsers.map((user) => {
                    if (user.id !== userFromLocal.id) {
                      dataForEmp.push(user);
                    }
                    return resUser;
                  });
                  setEmployees(dataForEmp);
                } else {
                  setEmployees([]);
                }
              } else {
                toast.error("Error while getting Employees");
              }
            });
        }
      } else {
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(fetchUsersByCompanyId, [userFromLocal.id, navigate]);

  const handleSearchEmployee = (e) => {
    setSearchEmployee(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      role: role,
      email: email,
      password: password,
    };

    setIsLoading(true);
    managerService
      .addEmployee(newEmployee)
      .then((res) => {
        userService.addCompanyToUser(res, company.id).then((res) => {
          if (res !== null) {
            setIsLoading(false);
            toast.info("Employee added");
            setEmployees([...employees, newEmployee]);
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setRole("");
            fetchUsersByCompanyId();
          } else {
            setIsLoading(false);
            toast.error("Error happened while deleting");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

    setIsLoading(true);
    userService
      .updateUser(editedEmployee.id, editedEmployee)
      .then((res) => {
        if (res !== null) {
          setIsLoading(false);
          toast.info("Updated");
        } else {
          setIsLoading(false);
          toast.error("Error happened while deleting");
        }
      })
      .catch((err) => {
        toast.error("Error happened while deleting");
      });
  };

  const handleDeleteEmployee = () => {
    // Create a copy of the employees array
    const updatedEmployeesForDel = [...employees];

    const deletedEmployee = updatedEmployeesForDel[Number(indexForDel)];

    updatedEmployeesForDel.splice(Number(indexForDel), 1);

    managerService
      .deleteEmployee(deletedEmployee.id)
      .then((res) => {
        setEmployees(updatedEmployeesForDel);
        console.log("deleted");
        setShowDeleteModal(false);
        setIndexForDel("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClosePopup = () => {
    setSelectedEmployeeIndex(-1);
    setShowEditPopup(true);
  };

  const showMadalForDel = (index) => {
    setIndexForDel(index);
    setShowDeleteModal(true);
  };
  const closeModalForDel = () => {
    setShowDeleteModal(false);
    setIndexForDel("");
  };

  // Calculate the index of the last employee to display on the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  // Calculate the index of the first employee to display on the current page
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  // Get the employees to display on the current page
  let employeesToDisplay =
    employees.length > 0
      ? employees.slice(indexOfFirstEmployee, indexOfLastEmployee)
      : [];

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(employees.length / employeesPerPage))
    );
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
    zIndex: "9999",
  };

  return (
    <>
      <NavbarComponent />
      {isLoading && (
        <div style={spinnerContainerCss}>
          <HashLoader loading={isLoading} color="#62bdea" size={50} />
        </div>
      )}
      <Container className="employees-container" fluid>
        <ToastContainer position="top-center" />
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
              <Form.Group controlId="employeeRole">
                <Form.Label>Employee role:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option>Select</option>
                  <option value="USER">Simple user</option>
                  <option value="TEAM_LEAD">Team lead</option>
                </Form.Select>
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
        <Form.Group controlId="search">
          <Form.Control
            className="search-employee"
            type="text"
            placeholder="Search by name"
            value={searchEmployee}
            onChange={handleSearchEmployee}
          />
        </Form.Group>

        <ul>
          {employeesToDisplay
            .filter((employee) =>
              employee.firstName.toLowerCase().includes(searchEmployee.toLowerCase())
            )
            .map((employee, index) => (
              <li className="employee-wrapper" key={employee.id}>
                <h5>
                  {employee.firstName} {employee.lastName}
                </h5>
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
                      onClick={() => showMadalForDel(index)}
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
            <Pagination.Prev
              onClick={handlePrevClick}
              disabled={currentPage === 1}
            />
            {Array.from(
              { length: Math.ceil(employees.length / employeesPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePaginationClick(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={handleNextClick}
              disabled={
                currentPage === Math.ceil(employees.length / employeesPerPage)
              }
            />
          </Pagination>
        </div>

        {showEditPopup && selectedEmployeeIndex !== -1 && (
          <EditEmployeePopup
            key={employees[selectedEmployeeIndex].id}
            employee={employees[selectedEmployeeIndex]}
            onClose={handleClosePopup}
            onSave={handleSaveEditedEmployee}
          />
        )}

        <Modal show={showDeleteModal}>
          <Modal.Body>
            <Modal.Title>Do you want to Delete?</Modal.Title>
            <Modal.Body className="showDelModalBody">
              <Button
                variant="outline-success"
                onClick={() => closeModalForDel()}
              >
                No
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="outline-danger"
                onClick={() => handleDeleteEmployee()}
              >
                Yes
              </Button>
            </Modal.Body>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default EmployeeManagement;
