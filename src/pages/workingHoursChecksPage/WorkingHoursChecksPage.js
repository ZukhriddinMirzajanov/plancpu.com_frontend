import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import * as Icon from "react-bootstrap-icons";
import timeReportService from "../../services/time-report.service";
import { ToastContainer, toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";
import managerService from "../../services/manager.service";
import { Form } from "react-bootstrap";
import "./WorkingHoursChecksPage.css";

function WorkingHoursChecksPage() {
    const initialMonth = new Date();
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);
    const [timeReportData, setTimeReportData] = useState([]);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    if (!selectedUserId) {
        setSelectedUserId(userFromLocal.id)
    }


    function fetchUser() {
        setIsLoading(true);
        userService.getUserById(userFromLocal.id)
            .then(resUser => {
                if (resUser !== null) {
                    if (resUser.status === 403) {
                        navigate("/login");
                    }
                    managerService.getUsersByCompanyId(resUser.company.id)
                        .then(resUsers => {
                            setIsLoading(false);
                            if (resUsers) {
                                setUsers(resUsers);
                            }
                        })
                }
            })

    }

    useEffect(fetchUser, [userFromLocal.id, navigate]);

    function fetchTimeReportData() {
        setIsLoading(true);
        timeReportService.getAllTimeReportsByUserId(selectedUserId)
            .then(res => {
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
                        setIsLoading(false);
                    } else {
                        setTimeReportData([]);
                        setIsLoading(false);
                    }
                } else {
                    setTimeReportData([]);
                    setIsLoading(false);
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

    useEffect(fetchTimeReportData, [userFromLocal.id, selectedMonth, navigate, selectedUserId]);

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

    const renderCalendar = () => {
        // Calculate the number of days in the selected month
        const daysInMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate();

        // Create an array of day numbers from 1 to the number of days in the month
        const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

        // Generate table rows for each day in the month
        return daysArray.map(day => {
            // Calculate the day of the week (0-6, Sunday-Saturday) for the current day
            const currentDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
            const dayOfWeek = currentDate.getDay();

            // Check if the day is a weekend (Saturday or Sunday)
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            // Apply appropriate CSS classes based on the day of the week
            const dayClass = isWeekend ? "weekend-bg" : "";
            const weekdayColumnClass = dayOfWeek > 0 && dayOfWeek < 6 ? "weekday-bg" : "";

            // Find time report data for the current day
            const timeReportForDay = timeReportData.find(data => getFormattedDay(data.createdAt) === day);

            // Generate a table row for the current day
            return (
                <tr key={day}>
                    {/* Day of the week cell */}
                    <td className={`${dayClass} ${weekdayColumnClass} week-cell`}>
                        <b>{getWeekDayName(day)}</b>
                    </td>
                    {/* Day cell */}
                    <td className="day-cell">{day}</td>
                    {/* Title cell */}
                    <td className="title-cell">{timeReportForDay?.title}</td>
                    {/* Hour cell */}
                    <td className="hour-cell">{timeReportForDay?.hour}</td>
                </tr>
            );
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
                <div className="body-nav-hours-checks">
                    <span>
                        {users.length > 0 ? users[0].company.name : ""} selected employee:
                    </span>
                    <span>
                        {users.length > 0 ? (
                            <Form.Select
                                as="select"
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                required
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            ""
                        )}
                    </span>
                </div>
                <div className="months-header-hours-checks">
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
                                <th className="week-cell">Week day</th>
                                <th className="day-cell">Day</th>
                                <th className="title-cell">Title</th>
                                <th className="hour-cell">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCalendar()}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default WorkingHoursChecksPage