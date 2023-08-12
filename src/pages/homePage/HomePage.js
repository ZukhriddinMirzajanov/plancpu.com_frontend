import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PopUpWindow from "../../components/modal/PopUpWindow";
import taskService from "../../services/task.service";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [openTasks, setOpentasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [inReviewTasks, setInReviewTasks] = useState([]);
    const [closedTasks, setClosedTasks] = useState([]);
    // const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    // const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const tasksPerPage = 10;
    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    // Load tasks from local storage on component mount
    useEffect(() => {
        taskService.getAllTasksByCompanyId(userFromLocal.companyId)
            .then(res => {
                if (res != null) {
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
                    toast.error("Error!",);
                }
            })

    }, [openTasks, inProgressTasks, inReviewTasks, closedTasks, userFromLocal.companyId]);

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
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 2,
            description: task.description
        }

        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                if (res != null) {
                    setOpentasks(updatedTasks);
                }
            })
            .catch(err => {
                toast.error("Error while updating :(")
                throw err;
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
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 3,
            description: task.description
        }

        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                if (res != null) {
                    setOpentasks(updatedTasks);
                }
            })
            .catch(err => {
                toast.error("Error while updating :(")
                throw err;
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
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 4,
            description: task.description
        }

        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                if (res != null) {
                    setOpentasks(updatedTasks);
                }
            })
            .catch(err => {
                toast.error("Error while updating :(")
                throw err;
            })

    };

    const updateTaskStatus4 = (task, index) => {
        const updatedTasks = [...inReviewTasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: task.id,
            companyId: task.companyId,
            createdByEmail: task.createdByEmail,
            createdByName: task.createdByName,
            name: task.name,
            hour: task.hour,
            createdAt: task.createdAt,
            statusOfTask: 1,
            description: task.description
        }

        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                if (res != null) {
                    setOpentasks(updatedTasks);
                }
            })
            .catch(err => {
                toast.error("Error while updating :(")
                throw err;
            })

    };

    return (
        <>
            <NavbarComponent />
            <div className="container-fluid">
                <div className="body-nav">
                    <h4>

                        <b>Plancpu 1.0.0</b>
                    </h4>
                    <p>🕐 5 days remaining</p>
                </div>
                <div className="table-box">
                    <div className="open-table">
                        <p className="table-headers">OPEN</p>
                        <div className="open-body">
                            {openTasks.map((task, index) => (
                                <div className="open-task">
                                    <div className="card-top">
                                        <small>assign to me</small>
                                        {/* <img
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="user"
                                        /> */}
                                        <small onClick={() => handleTaskClick(task)}>info</small>
                                    </div>
                                    <div className="card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <strong>{task.hour} h</strong>
                                        <Link to="/about"></Link>
                                        <Button onClick={() => updateTaskStatus1(task, index)} size="sm" variant="outline-primary">next</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="progress-table">
                        <p className="table-headers">IN PROGRESS</p>
                        <div className="open-body">
                            {inProgressTasks.map((task, index) => (
                                <div key={task.id} className="open-task">
                                    <div className="card-top">
                                        <p>Task Id: {task.id}</p>
                                        {/* <img
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="user"
                                        /> */}
                                        <small onClick={() => handleTaskClick(task)}>info</small>
                                    </div>
                                    <div className="card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <strong>{task.hour} h</strong>
                                        <Button onClick={() => updateTaskStatus2(task, index)} size="sm" variant="outline-primary">next</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="review-table">
                        <p className="table-headers">IN REVIEW</p>
                        <div className="open-body">
                            {inReviewTasks.map((task, index) => (
                                <div key={task.id} className="open-task">
                                    <div className="card-top">
                                        <p>Task Id: {task.id}</p>
                                        {/* <img
                                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                            alt="user"
                                        /> */}
                                        <small onClick={() => handleTaskClick(task)}>info</small>
                                    </div>
                                    <div className="card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <strong>{task.hour} h</strong>
                                        <Button onClick={() => updateTaskStatus3(task, index)} size="sm" variant="outline-primary">Close</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="closed-table">
                        <p className="table-headers">CLOSED</p>
                        <div className="open-body">
                            {closedTasks.map((task, index) => (
                                <div key={task.id} className="open-task">
                                    <div className="card-top">
                                        <p>Task Id: {task.id}</p>
                                        {/* <img
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                        alt="user"
                                    /> */}
                                        <small onClick={() => handleTaskClick(task)}>info</small>
                                    </div>
                                    <div className="card-middle">
                                        <p>Title: {task.name}</p>
                                    </div>
                                    <div className="card-bottom">
                                        <strong>{task.hour} h</strong>
                                        <Button onClick={() => updateTaskStatus4(task, index)} size="sm" variant="outline-primary">Open</Button>
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
