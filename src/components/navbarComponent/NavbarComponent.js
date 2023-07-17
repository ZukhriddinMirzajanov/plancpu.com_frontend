import React, { useState } from 'react';
import logo from '../../makeoson.svg';
import {Link} from 'react-router-dom';
import './NavbarComponent.css';
import Backlogg from '../../pages/backLogg/Backlogg';
import HomePage from '../../pages/homePage/HomePage';
import UserManagment from '../../pages/userManagment/UserManagment';
import TaskManagment from '../../pages/taskManagment/TaskManagment';
import EmployeeManagment from '../../pages/employeeManagment/EmployeeManagment';
import Account from '../../pages/account/Account';

const NavbarComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <nav className="navbar container-fluid">
        <div className="navbar-logo">
         <Link to="/" element={<HomePage/>}>
         <img src={logo} height={50} alt="logo" />
         </Link>
        </div>
        <div className="navbar-profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/NewTux.svg/1707px-NewTux.svg.png"
            height={50}
            alt="Profile"
            onClick={handleDropdownToggle}
          />
          {isDropdownOpen && (
            <div className="profile-dropdown open">
             
              <p><Link className="links" to="/" element={<HomePage/>} >Active Sprint</Link> </p>
              <p><Link className="links" to="/account" element={<Account/>} >Sukhrob Ruzmetov</Link> </p>
              <p><Link className="links" to="/backlog" element={<Backlogg/>} >Backlog</Link> </p>
              <p><Link className="links" to="/userManagment" element={<UserManagment/>} >User Managment</Link> </p>
              <p><Link className="links" to="/taskManagment" element={<TaskManagment/>} >Task Managment</Link> </p>
              <p><Link className="links" to="/employeeManagment" element={<EmployeeManagment/>} >Employee Managment</Link> </p>
              
              <p>Log Out</p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
