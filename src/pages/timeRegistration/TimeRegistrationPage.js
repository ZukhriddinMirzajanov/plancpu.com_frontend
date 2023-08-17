import React, { useState, useEffect, useMemo } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./TimeRegistrationPage.css";
import * as Icon from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";

const TimeRegistrationPage = () => {
  const storedMonth = localStorage.getItem("selectedMonth");
  const initialMonth = storedMonth ? new Date(storedMonth) : new Date();
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [timeEntries, setTimeEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const storedEntries = useMemo(
    () => JSON.parse(localStorage.getItem("timeEntries")) || {},
    []
  );

  useEffect(() => {
    setTimeEntries(storedEntries[selectedMonth.toISOString()] || []);
  }, [selectedMonth, storedEntries]);

  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(storedEntries));
  }, [storedEntries]);

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth.toISOString());
  }, [selectedMonth]);

  useEffect(() => {
    if (selectedDay !== null) {
      const existingEntry = timeEntries.find(
        (entry) => entry.day === selectedDay
      );

      if (existingEntry) {
        setTitle(existingEntry.title);
        setTime(existingEntry.time.toString());
      } else {
        setTitle("");
        setTime("");
      }
    }
  }, [selectedDay, timeEntries]);

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
    setTitle("");
    setTime("");
  };

  const addTimeEntry = () => {
    const updatedEntries = { ...storedEntries };
    const monthEntries = updatedEntries[selectedMonth.toISOString()] || [];
    const existingEntryIndex = monthEntries.findIndex(
      (entry) => entry.day === selectedDay
    );

    if (existingEntryIndex !== -1) {
      monthEntries[existingEntryIndex] = {
        ...monthEntries[existingEntryIndex],
        title,
        time: parseInt(time),
      };
    } else {
      monthEntries.push({ day: selectedDay, title, time: parseInt(time) });
    }

    updatedEntries[selectedMonth.toISOString()] = monthEntries;
    setTimeEntries(monthEntries);
    localStorage.setItem("timeEntries", JSON.stringify(updatedEntries));
    closeModal();
  };

  const calculateTotalHours = () => {
    const totalHours = timeEntries.reduce(
      (total, entry) => total + entry.time,
      0
    );
    return totalHours;
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
        dayOfWeek > 0 && dayOfWeek < 6 ? "weekday-bg" : "";

      return (
        <tr key={day} onClick={() => openModal(day)}>
          <td className={dayClass}>
            <b>{getWeekDayName(day)}</b>
          </td>
          <td className={weekdayColumnClass}>{day}</td>
          <td>
            Task: {timeEntries.find((entry) => entry.day === day)?.title || "-"}
          </td>
          <td>{timeEntries.find((entry) => entry.day === day)?.time || "-"}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <NavbarComponent />
      <div className="time-registration-page">
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
                <th className="weekday-bg">Day</th>
                <th>Title</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
          </table>
        </div>

        {isModalOpen && (
          <Modal
            className="register-modal"
            show={isModalOpen}
            onHide={closeModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Time Registration!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Time (hours):</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="outline-success" onClick={addTimeEntry}>
                Register
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
};

export default TimeRegistrationPage;
