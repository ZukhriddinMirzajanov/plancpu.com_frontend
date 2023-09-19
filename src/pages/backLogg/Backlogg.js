import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import './Backlogg.css'
import taskService from "../../services/task.service";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form, Pagination } from "react-bootstrap";
import DescriptionPopUpWindow from "./DescriptionPopUpWindow";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import userService from "../../services/user.service";
import companyProjectService from "../../services/company-project.service";

const Backlogg = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [companyProjects, setCompanyProjects] = useState([]);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
                    companyProjectService
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
        if (selectedProjectId) {
            setIsLoading(true);
            taskService
                .getAllStatusZeroTasksByCompanyProjectId(selectedProjectId)
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
                            toast.info("No tasks found!");
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

    useEffect(fetchAllTasksByCompanyProject, [selectedProjectId]);

    const handleEditTask = (index) => {
        const taskToOpen = tasks[index];
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: taskToOpen.id,
            name: taskToOpen.name,
            hour: taskToOpen.hour,
            description: taskToOpen.description,
            statusOfTask: 1,
            lastUpdatedDate: Date.now()
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    toast.info("Task is Opened:)");
                    setTasks(updatedTasks);

                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
            })

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

    const spinnerContainerCss = {
        position: "absolute",
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
            <ToastContainer position="top-center" />
            <div className="backlog-body">
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
                    {/* <Form.Control
                        type="text"
                        placeholder="search..."
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        required
                    /> */}
                </div>
                <ul>
                    {tasksToDisplay.map((task, index) => (
                        <li className="task-wrapper" key={task.id}>
                            <h5>{task.name}</h5>
                            <div className="time-btn">
                                <div className="list-title">
                                    <i>Time to spend</i> {task.hour} hr
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
                                        variant="outline-primary"
                                    >
                                        Open
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
                </div>

                {selectedTaskIndex !== -1 && (
                    <DescriptionPopUpWindow
                        task={tasks[selectedTaskIndex]}
                        show={showDescriptionModal}
                        onClose={handleCloseDescriptionModal}
                    />
                )}
            </div>
        </>
    );
};

export default Backlogg;
