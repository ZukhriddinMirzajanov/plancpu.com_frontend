import React, { useState } from 'react';
import logo from '../../makeoson.svg';
import {Link} from 'react-router-dom';
import './NavbarComponent.css';
import Backlogg from '../../pages/backLogg/Backlogg';
import HomePage from '../../pages/homePage/HomePage';
import UserManagement from '../../pages/userManagement/UserManagement';
import TaskManagement from '../../pages/taskManagement/TaskManagement';
import EmployeeManagement from '../../pages/employeeManagement/EmployeeManagement';
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
              <p><Link className="links" to="/userManagement" element={<UserManagement/>} >User Managment</Link> </p>
              <p><Link className="links" to="/taskManagement" element={<TaskManagement/>} >Task Managment</Link> </p>
              <p><Link className="links" to="/employeeManagement" element={<EmployeeManagement/>} >Employee Managment</Link> </p>
              
              <p>Log Out</p>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
