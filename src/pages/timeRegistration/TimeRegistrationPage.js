import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./TimeRegistrationPage.css";
import * as Icon from "react-bootstrap-icons";
import { Button, Form, Modal } from "react-bootstrap";
import timeReportService from "../../services/time-report.service";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const TimeRegistrationPage = () => {
    const initialMonth = new Date();
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);
    const [timeReportData, setTimeReportData] = useState([]);
    const [actionTimeReportData, setActionTimeReportData] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // const [selectedDay, setSelectedDay] = useState(null);
    const [title, setTitle] = useState("");
    const [hour, setHour] = useState("");
    const [dayAction, setDayAction] = useState("");
    const [indexData, setIndexData] = useState("");
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function fetchTimeReportData() {
        setIsLoading(true);
        timeReportService.getAllTimeReportsByUserId(userFromLocal.id)
            .then(res => {
                setIsLoading(false);
                if (res.length > 0) {
                    const filteredRes = res.filter(data => {
                        const currentDate = new Date(data.createdAt);
                        const formattedCurrentDate = currentDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        });
                        const formattedSelectedMonth = selectedMonth.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        });
                        return formattedCurrentDate === formattedSelectedMonth;
                    });

                    if (filteredRes.length > 0) {
                        setTimeReportData(filteredRes);
                    } else {
                        setTimeReportData([]);
                        setIsLoading(false);
                    }
                } else {
                    // navigate("/login");
                }

            })
            .catch(err => {
                console.error(err);
                toast.error("Server is not responding!");
                setIsLoading(false);
                navigate("/login");
            });
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(fetchTimeReportData, [userFromLocal.id, selectedMonth, navigate]);

    const calculateTotalHours = () => {
        if (timeReportData.length > 0) {
            const totalHours = timeReportData.reduce(
                (total, data) => Number(total) + Number(data.hour),
                0
            );
            return totalHours;
        }
    };

    const getWeekDayName = (day) => {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const date = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth(),
            day
        );
        return weekdays[date.getDay()];
    };

    const handleMonthChange = (offset) => {
        setSelectedMonth((prevMonth) => {
            const newMonth = new Date(prevMonth);
            newMonth.setMonth(newMonth.getMonth() + offset);
            return newMonth;
        });
    };

    const getFormattedDay = (date) => {
        const createdAtDate = new Date(date);
        const formattedDate = createdAtDate.toDateString();
        return Number(formattedDate.slice(8, 10));
    }

    const createTimeReport = (e) => {
        e.preventDefault();
        let newTimeReportData = {
            companyId: userFromLocal.companyId,
            userId: userFromLocal.id,
            createdByEmail: userFromLocal.email,
            createdByName: userFromLocal.firstName + " " + userFromLocal.lastName,
            title: title,
            hour: hour,
            createdAt: selectedMonth.setDate(dayAction)
        }
        const updatedTimeReportData = [...timeReportData, newTimeReportData]
        setIsLoading(true);
        timeReportService.createTimeReport(newTimeReportData)
            .then(res => {
                if (res) {
                    setIsLoading(false);
                    setTimeReportData(updatedTimeReportData);
                    toast.info("Time Registered");
                    setTitle("");
                    setHour("");
                    setIsCreateModalOpen(false);
                    setDayAction("");
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Error while registering");
            })
    }
    const editTimeReport = (e) => {
        e.preventDefault();
        const updatedData = [...timeReportData];

        const editedData = {
            id: actionTimeReportData.id,
            companyId: actionTimeReportData.companyId,
            userId: actionTimeReportData.id,
            createdByEmail: actionTimeReportData.createdByEmail,
            createdByName: actionTimeReportData.createdByName,
            title: title,
            hour: hour,
            createdAt: actionTimeReportData.createdAt
        };
        updatedData[indexData] = editedData;

        setIsLoading(true);
        timeReportService.updateTimeReport(editedData.id, editedData)
            .then(res => {
                if (res) {
                    setIsLoading(false);
                    setTimeReportData(updatedData);
                    toast.info("Updated");
                    setIsModalOpen(false);
                    setTitle("");
                    setHour("");
                    setIndexData("");
                    setActionTimeReportData("");
                }
            })
            .catch(err => {
                toast.info("Error while updating");
            })
    }

    const deleteTimeReport = (day) => {
        let id = null;
        let indexDelete = 0;
        timeReportData.map((data, index) => {
            if (getFormattedDay(data.createdAt) === day) {
                indexDelete = Number(index);
                return id += data.id;
            }
            return data;
        })
        let updatedTRD = [...timeReportData];
        updatedTRD.splice(indexDelete, 1);
        if (id !== null) {
            setIsLoading(true);
            timeReportService.deleteTimeReport(id)
                .then(res => {
                    if (res) {
                        toast.info("Deleted");
                        setTimeReportData(updatedTRD);
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    toast.error("Error while deleting!");
                })
        }
    }

    const openModal = (day) => {
        setIsModalOpen(true);
        timeReportData.map((data, index) => {
            if (getFormattedDay(data.createdAt) === day) {
                setTitle(data.title)
                setHour(data.hour)
                setActionTimeReportData(data)
                setIndexData(index);
            }
            return data;
        })
    };
    const createOpenModal = (day) => {
        setIsCreateModalOpen(true);
        setDayAction(day);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTitle("");
        setHour("");
        setIndexData("");
        setActionTimeReportData("");
        setDayAction("");
    };
    const createCloseModal = () => {
        setIsCreateModalOpen(false);
        setTitle("");
        setHour("");
        // setIndexData("");
    };

    const displayBtn = (day) => {
        let enteredNum = 0;
        timeReportData.map(data => {
            if (getFormattedDay(data.createdAt) === day) {
                return enteredNum += 1;
            }
            return data;
        })
        if (enteredNum !== 0 && enteredNum === 1) {
            return (
                <>
                    <Icon.Pencil className="time-register-edit-btn" onClick={() => openModal(day)} />
                    <Icon.Trash className="time-register-clear-btn" onClick={() => deleteTimeReport(day)} />
                </>
            )
        }
        if (enteredNum === 0) {
            return <Icon.PlusCircle className="time-register-add-btn" onClick={() => createOpenModal(day)} />
        }
    }

    const renderCalendar = () => {
        const daysInMonth = new Date(
            selectedMonth.getFullYear(),
            selectedMonth.getMonth() + 1,
            0
        ).getDate();
        const daysArray = Array.from(
            { length: daysInMonth },
            (_, index) => index + 1
        );

        return daysArray.map((day) => {
            const dayOfWeek = new Date(
                selectedMonth.getFullYear(),
                selectedMonth.getMonth(),
                day
            ).getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            const dayClass = isWeekend ? "weekend-bg" : "";

            const weekdayColumnClass =
                dayOfWeek > 0 && dayOfWeek < 6 ? "weekday-bg" : " ";
            if (timeReportData.length > 0) {
                return (
                    <tr key={day}>
                        <td className={dayClass + weekdayColumnClass}>
                            <b>{getWeekDayName(day)}</b>
                        </td>
                        <td>{day}</td>
                        <td>
                            {timeReportData.find((data) => getFormattedDay(data.createdAt) === day)?.title}
                        </td>
                        <td>{timeReportData.find((data) => getFormattedDay(data.createdAt) === day)?.hour}</td>
                        <td>{displayBtn(day)}</td>
                    </tr>
                );
            } else {
                return (
                    <tr key={day}>
                        <td className={dayClass + weekdayColumnClass}>
                            <b>{getWeekDayName(day)}</b>
                        </td>
                        <td className="dayBtn">{day}</td>
                        <td>
                            {timeReportData.find((data) => getFormattedDay(data.createdAt) === day)?.title}
                        </td>
                        <td>{timeReportData.find((data) => getFormattedDay(data.createdAt) === day)?.hour}</td>
                        <td>{displayBtn(day)}</td>
                    </tr>
                );
            }
        });

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
            <div className="time-registration-page">
                <ToastContainer position="top-center" />
                <div className="months-header">
                    <div className="months">
                        <button onClick={() => handleMonthChange(-1)}>
                            <Icon.ArrowLeftCircle className="time-register-btn" />
                        </button>
                        <b>
                            {selectedMonth.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                            })}
                        </b>
                        <button onClick={() => handleMonthChange(1)}>
                            <Icon.ArrowRightCircle className="time-register-btn" />
                        </button>
                    </div>
                    <div className="total-hours-display">
                        Total Hours: {calculateTotalHours()}
                    </div>
                </div>
                <div className="time-table-container">
                    <table className="time-table">
                        <thead>
                            <tr>
                                <th>Week day</th>
                                <th>Day</th>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCalendar()}
                            {/* {timeReportData.map((data, index) => (
                                <tr key={index}>
                                    <td>{getFormattedDayName(data.createdAt)}</td>
                                    <td>{getFormattedDay(data.createdAt)}</td>
                                    <td>{data.title}</td>
                                    <td>{data.hour}</td>
                                    <td>
                                        <Icon.Pencil className="time-register-edit-btn" onClick={() => editTimeReport(data, index)} />
                                        <Icon.Trash className="time-register-clear-btn" onClick={() => deleteTimeReport2(data.id)} />
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>

                {isModalOpen && (
                    <Modal
                        className="register-modal"
                        show={isModalOpen}
                        onHide={closeModal}
                    >
                        <Form onSubmit={editTimeReport}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit time report</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="title">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="time">
                                    <Form.Label>Time (in hour):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={closeModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="outline-success">
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal>
                )}
                {isCreateModalOpen && (
                    <Modal
                        className="register-modal"
                        show={isCreateModalOpen}
                        onHide={createCloseModal}
                    >
                        <Form onSubmit={createTimeReport}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add time report</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="title">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="time">
                                    <Form.Label>Time (in hour):</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-danger" onClick={createCloseModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="outline-success">
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Modal>
                )}
            </div>
        </>
    );
};

export default TimeRegistrationPage;
