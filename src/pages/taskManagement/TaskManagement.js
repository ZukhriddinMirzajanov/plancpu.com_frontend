import React, { useState, useEffect } from "react";
import { Container, Form, Button, Pagination, Modal } from "react-bootstrap";
import EditTaskPopup from "./EditTaskPopup";
import "./TaskManagement.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import DescriptionPopUpWindow from "./DescriptionPopUpWindow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import taskService from "../../services/task.service";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import userService from "../../services/user.service";
import companyProjectServicece from "../../services/company-project.service";

function TaskManagment() {
    const [name, setName] = useState("");
    const [hour, setHour] = useState(0);
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    //   const [company, setCompany] = useState({});
    const [companyProjects, setCompanyProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [user, setUser] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [indexForDel, setIndexForDel] = useState("");

    useEffect(() => {
        setIsLoading(true);
        userService
            .getUserById(userFromLocal.id)
            .then((resUser) => {
                setIsLoading(false);
                if (resUser.status === 403) {
                    navigate("/login");
                    return;
                }
                if (resUser !== null && resUser.company !== undefined) {
                    setUser(resUser);
                    companyProjectServicece
                        .getAllCompanyProjectsByCompanyId(resUser.company.id)
                        .then((projects) => {
                            if (projects) {
                                setCompanyProjects(projects);
                            }
                        })
                        .catch((err) => {
                            console.error("Error fetching company projects:", err);
                        });
                }
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [userFromLocal.id, navigate]);

    function fetchAllTasksByCompanyProject() {
        if (companyProjects.length && selectedProjectId) {
            setIsLoading(true);
            taskService
                .getAllTasksByCompanyProjectId(selectedProjectId)
                .then((res) => {
                    setIsLoading(false);
                    if (res !== null) {
                        if (res.length > 0) {
                            // let data = [];
                            // res.map((task) => {
                            //     return data.push(task);
                            // });
                            setTasks(res);
                        } else {
                            setTasks([]);
                            // toast.info("No tasks found!");
                        }
                    } else {
                        toast.error("Error while getting tasks");
                    }
                })
                .catch((err) => {
                    toast.error("Error!");
                    setIsLoading(false);
                    console.log(err);
                    // navigate("/login");
                });
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(fetchAllTasksByCompanyProject, [selectedProjectId, companyProjects.length]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            name: name,
            hour: hour,
            createdAt: Date.now(),
            statusOfTask: 0,
            description: description,
            lastUpdatedDate: Date.now()
        };

        // Calling the task service for adding the new task
        if (selectedProjectId) {
            setIsLoading(true);
            taskService
                .createTask(newTask)
                .then((resTask) => {
                    setIsLoading(false);
                    if (resTask) {
                        taskService.addCompanyProjectToTask(resTask, selectedProjectId)
                            .then(res => {
                                if (res !== null) {
                                    taskService.addUserCreatedToTask(res, user.id);
                                    // toast.info("Created:)");
                                    setTasks([...tasks, res]);
                                }
                            })

                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error("Error whiling creating a task:(");
                });

            // Clear input fields for the next task entry
            setName("");
            setHour("");
            setDescription("");
        } else {
            toast.info("Please select a Company Project")
        }
    };

    const handleEditTask = (index) => {
        setSelectedTaskIndex(index);
        setShowEditPopup(true);
    };

    const handleSaveEditedTask = (editedTask) => {
        const updatedTasks = [...tasks];
        setShowEditPopup(false);
        updatedTasks[selectedTaskIndex] = editedTask;

        // Update task
        setIsLoading(true);
        taskService
            .updateTask(editedTask.id, editedTask)
            .then((res) => {
                setIsLoading(false);
                if (res != null) {
                    toast.info("Updated :)");
                    setTasks(updatedTasks);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error("Error while updating :(");
            });
    };

    const handleDeleteTask = () => {
        // Create a copy of the tasks array
        const updatedTasks = [...tasks];
        const deletedTask = updatedTasks[indexForDel];
        updatedTasks.splice(indexForDel, 1);

        setIsLoading(true);
        taskService
            .deleteTask(deletedTask.id)
            .then((res) => {
                setIsLoading(false);
                if (res) {
                    toast.info("Deleted :)");
                    setTasks(updatedTasks);
                    setShowDeleteModal(false);
                    setIndexForDel("");
                }
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error("Error while deleting!");
            });
    };

    const showMadalForDel = (index) => {
        setIndexForDel(index);
        setShowDeleteModal(true);
    };
    const closeModalForDel = () => {
        setShowDeleteModal(false);
        setIndexForDel("");
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
        setCurrentPage((prevPage) =>
            Math.min(prevPage + 1, Math.ceil(tasks.length / tasksPerPage))
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
            <ToastContainer position="top-center" />
            <Container className="tasks-container" fluid>
                <div className="tasks-form">
                    <h2 className="title">Create Tasks</h2>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
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
                        <Form.Group controlId="time">
                            <Form.Label>Hour:</Form.Label>
                            <Form.Control
                                type="number"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="project">
                            <Form.Label>Project:</Form.Label>
                            <Form.Select
                                as="select"
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                required
                            >
                                <option value="">Select a Project</option>
                                {companyProjects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button className="mt-3" variant="outline-success" type="submit">
                            Add Task
                        </Button>
                    </Form>
                </div>
                <h2 className="title">All Tasks:</h2>
                <div className="dropDownSelection">
                    <Form.Select
                        as="select"
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        required
                    >
                        <option value="">Select a Project</option>
                        {companyProjects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <ul>
                    {tasksToDisplay.map((task, index) => (
                        <li className="task-wrapper" key={task.id}>
                            <h5>{task.name}</h5>
                            <div className="time-btn">
                                <div className="list-title">
                                    <i>Time to spend {task.hour} hr</i>
                                </div>
                                <div className="list-btn">
                                    <Button
                                        className="task-mang-btn"
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
                                    {(task.createdByEmail === userFromLocal.email ||
                                        userFromLocal.role === "ADMIN") && (
                                            <Button
                                                variant="outline-danger"
                                                onClick={() => showMadalForDel(index)}
                                            >
                                                Delete
                                            </Button>
                                        )}
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
                            { length: Math.ceil(tasks.length / tasksPerPage) },
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
                            disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
                        />
                    </Pagination>
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
                                onClick={() => handleDeleteTask()}
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

export default TaskManagment;
