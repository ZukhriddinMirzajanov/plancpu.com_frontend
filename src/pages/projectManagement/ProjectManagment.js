import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Col,
  Modal,
  Row,
  ListGroup,
} from "react-bootstrap";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./ProjectManagment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectEditeModal from "./ProjectEditeModal";
import ExpandModal from "./ExpandModal";
import ProjectUsersModal from "./ProjectUsersModal";
import companyProjectService from "../../services/company-project.service";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import managerService from "../../services/manager.service";
import Pagination from "react-bootstrap/Pagination";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [indexEdit, setIndexEdit] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [finishedDate, setFinishedDate] = useState("");
  const [showExpandModal, setShowExpandModal] = useState(false);
  const [searchProject, setSearchProject] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [showUserModal, setShowUserModal] = useState(false);
  const userFromLocal = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [company, setCompany] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [indexForDel, setIndexForDel] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 5; // Number of projects per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  // Calculate the total number of pages
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const resUser = await userService.getUserById(userFromLocal.id);

        if (resUser.status === 403) {
          navigate("/login");
          return;
        }

        if (resUser !== null) {
          if (resUser.company !== undefined) {
            setCompany(resUser.company);
            const resPC =
              await companyProjectService.getAllCompanyProjectsByCompanyId(
                resUser.company.id
              );

            if (resPC !== null) {
              setProjects(resPC);
            } else {
              toast.error("Error while getting Company projects");
            }

            const resUsers = await managerService.getUsersByCompanyId(
              resUser.company.id
            );

            if (resUsers !== null) {
              setUserList(resUsers);
            } else {
              toast.error("Error while getting Employees");
            }
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userFromLocal.id, navigate]);

  const handleSearch = (event) => {
    setSearchProject(event.target.value);
  };

  const handleExpandModalShow = (project) => {
    setEditProject(project);
    setShowExpandModal(true);
  };

  const handleExpandModalClose = () => {
    setShowExpandModal(false);
    setEditProject({});
  };

  const handleAddProject = () => {
    const newComProject = {
      name: name,
      description: description,
      createdDate: createdDate,
      finishedDate: finishedDate,
    };

    setIsLoading(true);
    companyProjectService.createCompanyProject(newComProject).then((resCP) => {
      if (resCP !== null) {
        companyProjectService
          .addCompanyToCompanyProject(resCP.id, company.id, resCP)
          .then((res) => {
            if (res !== null) {
              setIsLoading(false);
              toast.info("Created");
              setProjects([...projects, res]);
              setName("");
              setDescription("");
              setCreatedDate("");
              setFinishedDate("");
              setShowAddModal(false);
            } else {
              setIsLoading(false);
              toast.error("Error happened while creating!");
              companyProjectService.deleteCompanyProject(resCP.id);
            }
          });
      } else {
        setIsLoading(false);
        toast.error("Error happened while creating!");
      }
    });
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditModalShow = (project, index) => {
    setEditProject(project);
    setIndexEdit(index);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditProject({});
  };

  const handleEditProject = (editedProject) => {
    setIsLoading(true);
    let updatedProjects = projects;
    updatedProjects[indexEdit] = editedProject;

    companyProjectService
      .updateCompanyProject(editedProject.id, editedProject)
      .then((res) => {
        if (res !== null) {
          setProjects(updatedProjects);
          setIsLoading(false);
          toast.info("Project updated");
        } else {
          toast.error("Error while updating");
          setIsLoading(false);
        }
      });
    handleEditModalClose();
  };

  const assignUserToComPro = (updatedUser) => {
    userList.map((user, index) => {
      if (user.id === updatedUser.id) {
        let updatedUserList = userList;
        updatedUserList[index] = updatedUser;
        setUserList(updatedUserList);
      }
      return user;
    });
  };

  const hideUserModal = () => {
    setShowUserModal(false);
    setSelectedProject("");
  };

  const showMadalForDel = (index) => {
    setIndexForDel(index);
    setShowDeleteModal(true);
  };
  const closeModalForDel = () => {
    setShowDeleteModal(false);
    setIndexForDel("");
  };

  const handleDeleteProject = () => {
    const updatedProjects = projects;
    const deletedProject = projects[indexForDel];
    updatedProjects.splice(indexForDel, 1);

    setIsLoading(true);
    companyProjectService
      .deleteCompanyProject(deletedProject.id)
      .then((res) => {
        if (res !== null) {
          setIsLoading(false);
          toast.info("Deleted");
          setProjects(updatedProjects);
          setShowDeleteModal(false);
        } else {
          toast.error("Error while deleting Company Project");
          setIsLoading(false);
        }
      });
  };

  const handleAddUserClick = (project) => {
    setSelectedProject(project);
    setShowUserModal(true);
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
      <Container fluid className="project-container">
        <ToastContainer position="top-center" />

        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="startDate">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="date"
                      value={createdDate}
                      onChange={(e) => setCreatedDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="endDate">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      value={finishedDate}
                      onChange={(e) => setFinishedDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleCloseAddModal}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleAddProject}>
              Add Project
            </Button>
          </Modal.Footer>
        </Modal>

        <h2 className="text-center mt-5">
          All Projects:{" "}
          <Button variant="outline-primary" onClick={handleShowAddModal}>
            Add new project
          </Button>
        </h2>
        <Form.Group controlId="search">
          <Form.Control
            className="search-projects"
            type="text"
            placeholder="Search by title"
            value={searchProject}
            onChange={handleSearch}
          />
        </Form.Group>
        <ListGroup>
          {currentProjects
            .filter(
              (project) =>
                project.name &&
                typeof project.name === "string" &&
                project.name.toLowerCase().includes(searchProject.toLowerCase())
            )
            .map((project, index) => (
              <ListGroup.Item className="project-list" key={project.id}>
                <div className="project-box">
                  <div className="project-left">
                    <h5>Name: {project.name}</h5>
                    <h6
                      className="description-h6"
                      onClick={() => handleExpandModalShow(project)}
                    >
                      See more...
                    </h6>
                  </div>
                  <div className="project-right">
                    <b>
                      Duration: {project.createdDate} - {project.finishedDate}
                    </b>
                    <Button
                      variant="outline-success"
                      onClick={() => handleEditModalShow(project, index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => handleAddUserClick(project)}
                    >
                      Add User
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => showMadalForDel(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>

        <div className="pagination-projects">
          <Pagination className="text-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>

        <ProjectEditeModal
          show={showEditModal}
          onHide={handleEditModalClose}
          onSave={handleEditProject}
          project={editProject}
          userList={userList}
        />
        <ExpandModal
          show={showExpandModal}
          onHide={handleExpandModalClose}
          project={editProject}
        />
        <ProjectUsersModal
          show={showUserModal}
          onHide={hideUserModal}
          userList={userList}
          selectedProject={selectedProject}
          onAsiggn={assignUserToComPro}
        />
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
                onClick={() => handleDeleteProject()}
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

export default ProjectManagement;
