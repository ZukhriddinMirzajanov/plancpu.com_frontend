import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../plancpu.svg";
import "./NavbarComponent.css";
import Backlogg from "../../pages/backLogg/Backlogg";
import HomePage from "../../pages/homePage/HomePage";
import UserManagement from "../../pages/userManagement/UserManagement";
import TaskManagement from "../../pages/taskManagement/TaskManagement";
import EmployeeManagement from "../../pages/employeeManagement/EmployeeManagement";
import Account from "../../pages/account/Account";
import { GiHamburgerMenu } from "react-icons/gi";

const NavbarComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className="navbar container-fluid">
        <div className="navbar-logo">
          <Link to="/" element={<HomePage />}>
            <img src={logo} className="brand" alt="logo" />
          </Link>
        </div>
        <div className="navbar-profile">
          <GiHamburgerMenu
            className="menu-bar"
            onClick={handleDropdownToggle}
          />
          {isDropdownOpen && (
            <div className="profile-dropdown open">
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                  element={<HomePage />}
                >
                  Active Sprint
                </Link>{" "}
              </p>
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/account" ? "active" : ""
                  }`}
                  to="/account"
                  element={<Account />}
                >
                  Sukhrob Ruzmetov
                </Link>{" "}
              </p>
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/backlog" ? "active" : ""
                  }`}
                  to="/backlog"
                  element={<Backlogg />}
                >
                  Backlog
                </Link>{" "}
              </p>
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/userManagement" ? "active" : ""
                  }`}
                  to="/userManagement"
                  element={<UserManagement />}
                >
                  User Management
                </Link>{" "}
              </p>
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/taskManagement" ? "active" : ""
                  }`}
                  to="/taskManagement"
                  element={<TaskManagement />}
                >
                  Task Management
                </Link>{" "}
              </p>
              <p>
                <Link
                  className={`links ${
                    location.pathname === "/employeeManagement" ? "active" : ""
                  }`}
                  to="/employeeManagement"
                  element={<EmployeeManagement />}
                >
                  Employee Management
                </Link>{" "}
              </p>
              <p>Log Out</p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
