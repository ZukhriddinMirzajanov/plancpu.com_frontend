import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../plancpu.svg";
import "./NavbarComponent.css";
import Backlogg from "../../pages/backLogg/Backlogg";
import HomePage from "../../pages/homePage/HomePage";
import UserManagement from "../../pages/userManagement/UserManagement";
import TaskManagement from "../../pages/taskManagement/TaskManagement";
import EmployeeManagement from "../../pages/employeeManagement/EmployeeManagement";
import Account from "../../pages/profile/Profile";
import { GiHamburgerMenu } from "react-icons/gi";
import LoginPage from "../../pages/loginPage/LoginPage";

const NavbarComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    // Check if the user is logged in based on localStorage data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage and update state
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };  

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
              {isLoggedIn && ( // Display links conditionally based on login status
                <>
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
                  to="/profile"
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
                        location.pathname === "/employeeManagement"
                          ? "active"
                          : ""
                      }`}
                      to="/employeeManagement"
                      element={<EmployeeManagement />}
                    >
                      Employee Management
                    </Link>{" "}
                  </p>
                  <Link className="links" to="/login"><p onClick={handleLogout}>Log Out</p></Link>
                </>
              )}
              {!isLoggedIn && ( // Display the Login link if not logged in
                <p>
                  <Link
                    className={`links ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                    to="/login"
                    element={<LoginPage />} // You need to replace with your actual Login page component
                  >
                    Log In
                  </Link>{" "}
                </p>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
