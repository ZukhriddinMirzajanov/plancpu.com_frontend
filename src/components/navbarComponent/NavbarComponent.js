import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../plancpu.svg";
import "./NavbarComponent.css";
import Backlogg from "../../pages/backLogg/Backlogg";
import HomePage from "../../pages/homePage/HomePage";
import UserManagement from "../../pages/userManagement/UserManagement";
import TaskManagement from "../../pages/taskManagement/TaskManagement";
import EmployeeManagement from "../../pages/employeeManagement/EmployeeManagement";
import Profile from "../../pages/profile/Profile";
import LoginPage from "../../pages/loginPage/LoginPage";
import * as Icon from "react-bootstrap-icons";
import TimeRegistrationPage from "../../pages/timeRegistration/TimeRegistrationPage";
import ProjectManagement from "../../pages/projectManagement/ProjectManagment";
import CompanyManagment from "../../pages/companyManagment/CompanyManagment";

const NavbarComponent = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if the user is logged in based on localStorage data
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setIsLoggedIn(true);
            if (storedUser.role === "MANAGER" || storedUser.role === "ADMIN") {
                setIsManager(true);
            }
            if (storedUser.role === "ADMIN") {
                setIsAdmin(true);
            }
        }
    }, []);


    const handleLogout = () => {
        // Clear user data from localStorage and update state
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar container-fluid navbar-style">
            <div className="navbar-logo">
                <Link to="/" element={<HomePage />}>
                    <img src={logo} className="brand" alt="logo" />
                </Link>
            </div>
            <div className="">
                {isLoggedIn && ( // Display links conditionally based on login status
                    <>
                        <Link
                            className={`links ${location.pathname === "/" ? "active" : ""}`}
                            to="/"
                            element={<HomePage />}
                        >
                            <Icon.Table className="navbar-card-btn" />
                        </Link>
                        {isManager && (
                            <Link
                                className={`links ${location.pathname === "/backlog" ? "active" : ""}`}
                                to="/backlog"
                                element={<Backlogg />}
                            >
                                <Icon.Stack className="navbar-card-btn" />
                            </Link>
                        )}
                        <Link
                            className={`links ${location.pathname === "/taskManagement" ? "active" : ""}`}
                            to="/taskManagement"
                            element={<TaskManagement />}
                        >
                            <Icon.ListTask className="navbar-card-btn" />
                        </Link>
                        <Link
                            className={`links ${location.pathname === "/timeReport" ? "active" : ""}`}
                            to="/timeReport"
                            element={<TimeRegistrationPage />}
                        >
                            <Icon.Clock className="navbar-card-btn" />
                        </Link>
                        <Link
                            className={`links ${location.pathname === "/profile" ? "active" : ""}`}
                            to="/profile"
                            element={<Profile />}
                        >
                            <Icon.Person className="navbar-card-btn" />
                        </Link>
                        {isManager && (
                            <Link
                                className={`links ${location.pathname === "/employeeManagement" ? "active" : ""}`}
                                to="/employeeManagement"
                                element={<EmployeeManagement />}
                            >
                                EM
                            </Link>
                        )}
                        {isManager && (
                            <Link
                                className={`links ${location.pathname === "/projectManagement" ? "active" : ""}`}
                                to="/projectManagement"
                                element={<ProjectManagement />}
                            >
                                PM
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className={`links ${location.pathname === "/userManagement" ? "active" : ""}`}
                                to="/userManagement"
                                element={<UserManagement />}
                            >
                                UM
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className={`links ${location.pathname === "/companyManagement" ? "active" : ""}`}
                                to="/companyManagement"
                                element={<CompanyManagment />}
                            >
                                CM
                            </Link>
                        )}
                        <Link className="links" to="/login" onClick={handleLogout}><Icon.BoxArrowRight className="navbar-card-btn" /></Link>
                    </>
                )}
                {!isLoggedIn && ( // Display the Login link if not logged in
                    <Link
                        className={`links ${location.pathname === "/login" ? "active" : ""}`}
                        to="/login"
                        element={<LoginPage />} // You need to replace with your actual Login page component
                    >
                        <Icon.BoxArrowInRight className="navbar-card-btn" />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavbarComponent;
