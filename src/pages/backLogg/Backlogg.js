import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import './Backlogg.css'
import taskService from "../../services/task.service";
import { toast } from "react-toastify";
import { Button, Pagination, ToastContainer } from "react-bootstrap";
import DescriptionPopUpWindow from "./DescriptionPopUpWindow";

const Backlogg = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(-1);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10;
    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    // Load tasks from local storage on component mount
    useEffect(() => {
        taskService.getAllTasksByCompanyId(userFromLocal.companyId)
            .then(res => {
                if (res != null) {
                    const tasks = [];
                    res.map(task => {
                        if (task.statusOfTask === 0) {
                            return tasks.push(task);
                        } else{
                            return tasks;
                        }
                    })
                    setTasks(tasks);
                } else {
                    toast.error("Error!",);
                }
            })

    }, [userFromLocal.companyId]);

    const handleEditTask = (index) => {
        const taskToOpen = tasks[index];
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);

        const editedTask = {
            id: taskToOpen.id,
            companyId: taskToOpen.companyId,
            createdByEmail: taskToOpen.createdByEmail,
            createdByName: taskToOpen.createdByName,
            assignedBy: taskToOpen.assignedBy,
            taskReviewer: taskToOpen.taskReviewer,
            name: taskToOpen.name,
            hour: taskToOpen.hour,
            createdAt: taskToOpen.createdAt,
            statusOfTask: 1,
            description: taskToOpen.description
        }

        taskService.updateTask(editedTask.id, editedTask)
            .then(res => {
                if (res != null) {
                    toast.info("Updated :)");
                    setTasks(updatedTasks);

                }
            })
            .catch(err => {
                toast.error("Error while updating :(")
                throw err;
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
    return (
        <>
            <NavbarComponent />
            <div className="backlog-body">
                <h2 className="title">All Tasks:</h2>
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
                    <ToastContainer position="bottom-right" />

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
