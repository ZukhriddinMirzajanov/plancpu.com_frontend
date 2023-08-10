
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import EditTaskPopup from "./EditTaskPopup";
import "./TaskManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import DescriptionPopUpWindow from "./DescriptionPopUpWindow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function TaskManagment() {
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      toast.success("Tasks retrieved from local storage!",);
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      companyName,
      description,
      time,
      createdTime: Date.now(),
      taskStatus: 0,
    };

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);
    setCompanyName("OK");

    // Clear input fields for the next task entry
    setTitle("");
    setDescription("");
    setTime("");

    // Update tasks in local storage with the modified array
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const handleEditTask = (index) => {
    setSelectedTaskIndex(index);
    setShowEditPopup(true);
  };

  const handleSaveEditedTask = (editedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[selectedTaskIndex] = editedTask;
    setTasks(updatedTasks);
    setShowEditPopup(false);

    // Update tasks in local storage with the modified array
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index) => {
    // Create a copy of the tasks array
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    // Update the tasks state with the modified array
    setTasks(updatedTasks);

    // Update tasks in local storage with the modified array
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleClosePopup = () => {
    setSelectedTaskIndex(-1);
    setShowEditPopup(false);
  };

  const handleShowDescription = (index) => {
    setSelectedTaskIndex(index);
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
  };

  // Calculate the index of the last task to display on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  // Calculate the index of the first task to display on the current page
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  // Get the tasks to display on the current page
  const tasksToDisplay = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tasks.length / tasksPerPage)));
  };

  return (
    <>
      <NavbarComponent />
      <Container className="tasks-container" fluid>
        <div className="tasks-form">
          <h2 className="title">Create Tasks</h2>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="title">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="description">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="time">
                  <Form.Label>Time: (hour)</Form.Label>
                  <Form.Control
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3"  variant="outline-success" type="submit">
              Add Task
            </Button>
          </Form>
        </div>
        <h2 className="title">All Tasks:</h2>
        <ul>
          {tasksToDisplay.map((task, index) => (
            <li className="task-wrapper" key={task.id}>
              <h5>{task.title}</h5>
              <div className="time-btn">
                <div className="list-title">
                  <i>Time to spend</i> {task.time} hr
                </div>
                <div className="list-btn">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleShowDescription(index)}
                  >
                    See Description
                  </Button>
                  <Button
                    className="task-edite-btn"
                    onClick={() => handleEditTask(index)}
                    variant="outline-success"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteTask(index)}
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
            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePaginationClick(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
             <Pagination.Next onClick={handleNextClick} disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)} />
          </Pagination>
        <ToastContainer position="bottom-right" />

        </div>

        {showEditPopup && selectedTaskIndex !== -1 && (
          <EditTaskPopup
            task={tasks[selectedTaskIndex]}
            onClose={handleClosePopup}
            onSave={handleSaveEditedTask}
          />
        )}

        {selectedTaskIndex !== -1 && (
          <DescriptionPopUpWindow
            task={tasks[selectedTaskIndex]}
            show={showDescriptionModal}
            onClose={handleCloseDescriptionModal}
          />
        )}
      </Container>
    </>
  );
}

export default TaskManagment;
