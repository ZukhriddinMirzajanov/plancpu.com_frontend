import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./HomePage.css";
import PopUpWindow from "../../components/modal/PopUpWindow";
import taskService from "../../services/task.service";
import { ToastContainer, toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";
import { HashLoader } from "react-spinners";
// import authHeader from "../../services/auth-header";
// import SockJS from 'sockjs-client';
// import { Stomp } from "@stomp/stompjs";

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [openTasks, setOpentasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [inReviewTasks, setInReviewTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);

    function fetchAllTasks() {
        setIsLoading(true)
        taskService.getAllTasksByCompanyId(userFromLocal.companyId)
            .then(res => {
                setIsLoading(false);
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
                    toast.info("No active tasks!",);
                }
            })
            .catch(err => {
                setIsLoading(false);
                toast.error("Server error!",);
                console.log(err);
            })
    }

    useEffect(fetchAllTasks, [userFromLocal.companyId]);

    // useEffect(() => {
    //     try {
    //         const socket = new SockJS(`http://localhost:5000/ws`);
    //         const client = Stomp.over(socket);
    //         // client.connect({}, () => {
    //         //     console.log("WebSocket connection established.");

    //         //     // Subscribe and send data here
    //         // });

    //         client.connect({companyId:userFromLocal.companyId}, () => {
    //             console.log("Looooo")
    //             client.subscribe(`/topic/companyTasks`, (message) => {
    //                 console.log(`Received: ${message.body}`)
    //                 // const updatedTasks = JSON.parse(message.body);
    //                 // console.log("Received updated company tasks:", updatedTasks);
    //                 // if (updatedTasks != null) {
    //                 //     const tasks1 = [];
    //                 //     const tasks2 = [];
    //                 //     const tasks3 = [];
    //                 //     const tasks4 = [];
    //                 //     updatedTasks.map(task => {
    //                 //         if (task.statusOfTask === 1) {
    //                 //             tasks1.push(task);
    //                 //         }
    //                 //         if (task.statusOfTask === 2) {
    //                 //             tasks2.push(task);
    //                 //         }
    //                 //         if (task.statusOfTask === 3) {
    //                 //             tasks3.push(task);
    //                 //         }
    //                 //         if (task.statusOfTask === 4) {
    //                 //             tasks4.push(task);
    //                 //         }
    //                 //         return task;
    //                 //     })
    //                 //     setOpentasks(tasks1);
    //                 //     setInProgressTasks(tasks2);
    //                 //     setInReviewTasks(tasks3);
    //                 //     setClosedTasks(tasks4);
    //                 // } else {
    //                 //     toast.error("Error!",);
    //                 // }
    //             });
    //         });

    //         // return () => {
    //         //     if (client) {
    //         //         client.disconnect();
    //         //     }
    //         // };
    //     } catch (err) {
    //         toast.error("Error!",);
    //         console.log(err);
    //     }

    // }, [userFromLocal.companyId]);



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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: userFromLocal.firstName,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 2,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setOpentasks(updatedTasks);
                    setInProgressTasks([...inProgressTasks, editedTask]);
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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 3,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInProgressTasks(updatedTasks);
                    setInReviewTasks([...inReviewTasks, editedTask]);
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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 4,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInReviewTasks(updatedTasks);
                    setClosedTasks([...closedTasks, editedTask]);
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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 1,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setClosedTasks(updatedTasks);
                    setOpentasks([...openTasks, editedTask]);
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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 1,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInProgressTasks(updatedTasks);
                    setOpentasks([...openTasks, editedTask]);
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
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 2,
            description: task.description
        }

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
                    setInReviewTasks(updatedTasks);
                    setInProgressTasks([...inProgressTasks, editedTask]);
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

        const editedTask = {
            id: task.id,
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: userFromLocal.firstName,
            taskReviewer: task.taskReviewer,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: task.statusOfTask,
            description: task.description
        }

        updatedTasks[index] = editedTask;

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
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

        const editedTask = {
            id: task.id,
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            assignedBy: task.assignedBy,
            taskReviewer: userFromLocal.firstName,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: task.statusOfTask,
            description: task.description
        }

        updatedTasks[index] = editedTask;

        setIsLoading(true);
        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                setIsLoading(false);
                if (res != null) {
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
                    <h4>

                        <b>{userFromLocal.companyName}</b>
                    </h4>
                    {/* <p>🕐 5 days remaining</p> */}
                </div>
                <div className="table-box">
                    <div className="open-table">
                        <p className="table-headers">Open</p>
                        <div className="open-body">
                            {openTasks.map((task, index) => (
                                <div key={task.id} className="open-task">
                                    <div className="card-top">
                                        <small>{task.assignedBy}</small>
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
                                        <small>{task.assignedBy}</small>
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
                                        <small>{task.taskReviewer}</small>
                                        <small onClick={() => handleTaskClick(task)}><Icon.InfoCircle className="home-card-btn" /></small>
                                    </div>
                                    <div className="review-card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="review-card-bottom">
                                        <strong className="task-hour">{task.hour} h</strong>
                                        <span>
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
                                        <small>{task.createdByName}</small>
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
