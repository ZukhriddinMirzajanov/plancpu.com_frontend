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
import axios from "axios";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./ProjectManagment.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProjectEditeModal from "./ProjectEditeModal";
import ExpandModal from "./ExpandModal";
import ProjectUsersModal from "./ProjectUsersModal";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showExpandModal, setShowExpandModal] = useState(false);
  const [searchProject, setSearchProject] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const fetchProjects = () => {
    axios
      .get("http://localhost:3001/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const handleAddProject = () => {
    if (!title || !description || !startDate || !endDate) {
      alert("Please fill in all fields");
      return;
    }

    const newProject = {
      title,
      description,
      startDate,
      endDate,
    };

    axios
      .post("http://localhost:3001/projects", newProject)
      .then((response) => {
        fetchProjects();
        clearForm();
        setShowAddModal(false); // Close the add project modal
      })
      .catch((error) => {
        console.error("Error adding project:", error);
      });
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleEditModalShow = (project) => {
    setEditProject(project);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditProject({});
  };

  const handleEditProject = (
    updatedTitle,
    updatedDescription,
    updatedStartDate,
    updatedEndDate
  ) => {
    handleUpdateProject(
      editProject.id,
      updatedTitle,
      updatedDescription,
      updatedStartDate,
      updatedEndDate
    );
    handleEditModalClose();
  };

  const handleUpdateProject = (
    projectId,
    updatedTitle,
    updatedDescription,
    updatedStartDate,
    updatedEndDate
  ) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            title: updatedTitle,
            description: updatedDescription,
            startDate: updatedStartDate,
            endDate: updatedEndDate,
          }
        : project
    );

    setProjects(updatedProjects);

    axios
      .put(`http://localhost:3001/projects/${projectId}`, {
        title: updatedTitle,
        description: updatedDescription,
        startDate: updatedStartDate,
        endDate: updatedEndDate,
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  };

  const handleDeleteProject = (projectId) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);

    axios
      .delete(`http://localhost:3001/projects/${projectId}`)
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  let projectList = [
    {
      id: 1,
      title: "suhgjmjgrob",
      description: "as  sfsr f   fsrgfrs grsg rsgasa",
    },
    { id: 2, title: "suhfhgrob", description: "asasa" },
    { id: 3, title: "sufsfhrob", description: "asasa" },
    { id: 4, title: "ssuhrob", description: "asasa" },
    { id: 5, title: "sudfsfshrob", description: "asasa" },
  ];

  let userList = [
    { id: 1, name: "surgrehrob" },
    { id: 2, name: "surgrhrob" },
    { id: 3, name: "sfrgfsuhrob" },
    { id: 5, name: "suhrob" },
    { id: 6, name: "sufsrghrob" },
    { id: 7, name: "susdfsshrob" },
  ];

  const handleAssignUser = (projectId, userId) => {
    // Here you can make an API call to assign the user to the project
    // using the project ID and user ID.
    // Then update the state or refetch the data accordingly.
    console.log(`Assigning user ${userId} to project ${projectId}`);
  };

  const handleAddUserClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowUserModal(true);
  };

  return (
    <>
      <NavbarComponent />
      <Container fluid className="project-container">
        <div className="search__add-project-box">
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by title"
              value={searchProject}
              onChange={handleSearch}
            />
          </Form.Group>
          <Button variant="outline-primary" onClick={handleShowAddModal}>
            Add new project
          </Button>
        </div>

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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="startDate">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="endDate">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
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

        <h2 className="text-center mt-5">All Projects:</h2>
        <ListGroup>
          {projectList
            .filter(
              (project) =>
                project.title &&
                typeof project.title === "string" &&
                project.title
                  .toLowerCase()
                  .includes(searchProject.toLowerCase())
            )
            .map((project) => (
              <ListGroup.Item className="project-list" key={project.id}>
                <div className="project-box">
                  <div className="project-left">
                    <h5>Title: {project.title}</h5>
                    <h6 className="description-h6">
                      <span
                        className="truncate-text"
                        title={project.description}
                      >
                        <b> Description:</b>{" "}
                        {project.description.length > 20
                          ? project.description.slice(0, 20) + "...  "
                          : project.description}
                      </span>
                      {project.description.length > 20 && (
                        <Button
                          className="description-btn"
                          size="sm"
                          onClick={() => handleExpandModalShow(project)}
                        >
                          <i>full description</i>
                        </Button>
                      )}
                    </h6>
                  </div>
                  <div className="project-right">
                    <b>
                      {project.startDate} <b>← to →</b> {project.endDate}
                    </b>
                    <Button
                      variant="outline-success"
                      onClick={() => handleEditModalShow(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => handleAddUserClick(project.id)}
                    >
                      Add User
                    </Button>

                    <ProjectUsersModal
                      show={showUserModal}
                      onHide={() => setShowUserModal(false)}
                      userList={userList}
                      onAssignUser={(userId) =>
                        handleAssignUser(selectedProjectId, userId)
                      } // Pass both project and user ID
                    />
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>

        <ProjectEditeModal
          show={showEditModal}
          onHide={handleEditModalClose}
          onSave={handleEditProject}
          project={editProject}
        />
        <ExpandModal
          show={showExpandModal}
          onHide={handleExpandModalClose}
          project={editProject}
        />
      </Container>
    </>
  );
}

export default ProjectManagement;
