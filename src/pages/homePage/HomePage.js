import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./HomePage.css";
import PopUpWindow from "../../components/modal/PopUpWindow";
import taskService from "../../services/task.service";
import { ToastContainer, toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";
import { HashLoader } from "react-spinners";
import userService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [openTasks, setOpentasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [inReviewTasks, setInReviewTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [selectedIndex, setSelectedIndex] = useState("");
    const selectedIndexFromLocal = JSON.parse(localStorage.getItem("plancpu.com.selectedIndexFromLocal"));

    function setProFunc(index) {
        localStorage.setItem("plancpu.com.selectedIndexFromLocal", index);
        setSelectedIndex(index);
    }

    useEffect(() => {
        userService
            .getUserById(userFromLocal.id)
            .then((resUser) => {
                if (resUser.status === 403) {
                    navigate("/login");
                    return;
                }
                if (resUser !== null && resUser.company !== undefined) {
                    setUserData(resUser);
                }
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [userFromLocal.id, navigate]);

    function fetchAllTasksByCompanyProject() {
        if (selectedIndexFromLocal) {
            setSelectedIndex(selectedIndexFromLocal);
        }
        if (userData.companyProjects !== undefined && userData.companyProjects.length > 0) {
            setIsLoading(true);
            taskService.getAllTasksByCompanyProjectId(userData.companyProjects[Number(selectedIndex)].id)
                .then((res) => {
                    setIsLoading(false);
                    if (res !== null) {
                        if (res.length > 0) {
                            const tasks1 = [];
                            const tasks2 = [];
                            const tasks3 = [];
                            const tasks4 = [];
                            res.map(task => {
                                if (task.statusOfTask === 1) {
                                    tasks1.push(task);
                                }
                                if (task.statusOfTask === 2) {
                                    tasks2.push(task);
                                }
                                if (task.statusOfTask === 3) {
                                    tasks3.push(task);
                                }
                                if (task.statusOfTask === 4) {
                                    tasks4.push(task);
                                }
                                return task;
                            })
                            setOpentasks(tasks1);
                            setInProgressTasks(tasks2);
                            setInReviewTasks(tasks3);
                            setClosedTasks(tasks4);
                        } else {
                            setOpentasks([]);
                            setInProgressTasks([]);
                            setInReviewTasks([]);
                            setClosedTasks([]);
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

    useEffect(fetchAllTasksByCompanyProject, [selectedIndex, userData, selectedIndexFromLocal]);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const updateTaskStatus1 = (task, index) => {
        const updatedTasks = [...openTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 2
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 2,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setOpentasks(updatedTasks);
                    setInProgressTasks([...inProgressTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })

    };

    const updateTaskStatus2 = (task, index) => {
        const updatedTasks = [...inProgressTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 3
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 3,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInProgressTasks(updatedTasks);
                    setInReviewTasks([...inReviewTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })

    };

    const updateTaskStatus3 = (task, index) => {
        const updatedTasks = [...inReviewTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 4
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 4,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInReviewTasks(updatedTasks);
                    setClosedTasks([...closedTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })

    };

    const updateTaskStatus4 = (task, index) => {
        const updatedTasks = [...closedTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 1
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 1,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setClosedTasks(updatedTasks);
                    setOpentasks([...openTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })

    };

    const backFrom2to1 = (task, index) => {
        const updatedTasks = [...inProgressTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 1
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 1,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInProgressTasks(updatedTasks);
                    setOpentasks([...openTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })

    };

    const backFrom3to2 = (task, index) => {
        const updatedTasks = [...inReviewTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 2
        }

        const editedTask2 = {
            id: task.id,
            name: task.name,
            hour: task.hour,
            description: task.description,
            statusOfTask: 2,
            createdAt: task.createdAt,
            userCreated: task.userCreated,
            userWorked: task.userWorked,
            userReviewed: task.userReviewed,
            companyProject: task.companyProject
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInReviewTasks(updatedTasks);
                    setInProgressTasks([...inProgressTasks, editedTask2]);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })
    }

    const assignToMeToWork = (task, index) => {
        const updatedTasks = [...openTasks];

        setIsLoading(true);
        taskService.addUserWorkedToTask(task, userData.id)
            .then(res => {
                setIsLoading(false);
                if (res !== null) {
                    updatedTasks[index] = res;
                    setOpentasks(updatedTasks);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })
    }

    const assignToMeToReview = (task, index) => {
        const updatedTasks = [...inReviewTasks];

        setIsLoading(true);
        taskService.addUserReviewedToTask(task, userData.id)
            .then(res => {
                setIsLoading(false);
                if (res !== null) {
                    updatedTasks[index] = res;
                    setInReviewTasks(updatedTasks);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Error while updating :(")
                console.log(err);
            })
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
            <NavbarComponent />
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <ToastContainer position="top-center" />
            <div className="container-fluid">
                <div className="body-nav">
                    <p>{userData.company ? userData.company.name : ""} selected project: </p>
                    <p>
                        {userData.companyProjects ? (
                            <Form.Select
                                as="select"
                                value={selectedIndex}
                                onChange={(e) => setProFunc(e.target.value)}
                                required
                            >

                                <option>{selectedIndexFromLocal ? (
                                    userData.companyProjects[selectedIndexFromLocal] ? userData.companyProjects[selectedIndexFromLocal].name : "") : (
                                    userData.companyProjects.length > 0 ? userData.companyProjects[0].name : "No project")}</option>
                                {userData.companyProjects.map((project, index) => (
                                    <option key={project.id} value={index}>
                                        {project.name}
                                    </option>
                                ))}
                            </Form.Select >
                        ) : ""}

                    </p>
                </div>
                <div className="table-box">
                    <div className="open-table">
                        <p className="table-headers">Open</p>
                        <div className="open-body">
                            {openTasks.map((task, index) => (
                                <div key={task.id} className="open-task">
                                    <div className="card-top">
                                        <small>{task.userWorked ? task.userWorked.firstName : "Unassigned"}</small>
                                        <small onClick={() => handleTaskClick(task)}><Icon.InfoCircle className="home-card-btn" /></small>
                                    </div>
                                    <div className="card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <strong className="task-hour">{task.hour} h</strong>
                                        <span>
                                            <small onClick={() => assignToMeToWork(task, index)}><Icon.PlusCircle className="home-card-btn" /></small>
                                            <small onClick={() => updateTaskStatus1(task, index)}><Icon.ArrowRightCircle className="home-card-btn" /></small>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="progress-table">
                        <p className="table-headers">In Progress</p>
                        <div className="progress-open-body">
                            {inProgressTasks.map((task, index) => (
                                <div key={task.id} className="progress-open-task">
                                    <div className="progress-card-top">
                                        <small>{task.userWorked ? task.userWorked.firstName : "Unassigned"}</small>
                                        <small onClick={() => handleTaskClick(task)}><Icon.InfoCircle className="home-card-btn" /></small>
                                    </div>
                                    <div className="progress-card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="progress-card-bottom">
                                        <strong className="task-hour">{task.hour} h</strong>
                                        <span>
                                            <small onClick={() => backFrom2to1(task, index)}><Icon.ArrowLeftCircle className="home-card-btn" /></small>
                                            <small onClick={() => updateTaskStatus2(task, index)} size="sm" variant="outline-primary"><Icon.ArrowRightCircle className="home-card-btn" /></small>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="review-table">
                        <p className="table-headers">In Review</p>
                        <div className="review-open-body">
                            {inReviewTasks.map((task, index) => (
                                <div key={task.id} className="review-open-task">
                                    <div className="review-card-top">
                                        <small>{task.userReviewed ? task.userReviewed.firstName : "Unassigned"}</small>
                                        <small onClick={() => handleTaskClick(task)}><Icon.InfoCircle className="home-card-btn" /></small>
                                    </div>
                                    <div className="review-card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="review-card-bottom">
                                        <strong className="task-hour">{task.hour} h</strong>
                                        <span>
                                            <small onClick={() => handleTaskClick(task)} size="sm" variant="outline-primary"><Icon.ChatDots className="home-card-btn" /></small>
                                            <small onClick={() => backFrom3to2(task, index)} size="sm" variant="outline-primary"><Icon.ArrowLeftCircle className="home-card-btn" /></small>
                                            <small onClick={() => assignToMeToReview(task, index)} size="sm" variant="outline-primary"><Icon.PlusCircle className="home-card-btn" /></small>
                                            <small onClick={() => updateTaskStatus3(task, index)} size="sm" variant="outline-primary"><Icon.CheckCircle className="home-card-btn" /></small>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="closed-table">
                        <p className="table-headers">Closed</p>
                        <div className="close-open-body">
                            {closedTasks.map((task, index) => (
                                <div key={task.id} className="close-open-task">
                                    <div className="close-card-top">
                                        <small>{task.userCreated ? task.userCreated.firstName : "-"}</small>
                                        <small onClick={() => handleTaskClick(task)}><Icon.InfoCircle className="home-card-btn" /></small>
                                    </div>
                                    <div className="close-card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="close-card-bottom">
                                        <strong className="task-hour">{task.hour} h</strong>
                                        <span>
                                            {/* <small onClick={() => updateTaskStatus2(task, index)} size="sm" variant="outline-primary"><Icon.ArrowLeftCircle className="home-card-btn" /></small> */}
                                            <small onClick={() => updateTaskStatus4(task, index)} size="sm" variant="outline-primary"><Icon.ArrowClockwise className="home-card-btn" /></small>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {selectedTask && (
                <PopUpWindow
                    show={true}
                    onHide={handleCloseModal}
                    taskData={selectedTask}
                />
            )}
        </>
    );
};

export default HomePage;
