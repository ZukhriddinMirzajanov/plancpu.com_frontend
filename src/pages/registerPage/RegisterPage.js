import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage.css";
import authService from "../../services/auth.service";

const RegisterPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleCompayNameChange = (event) => {
    setCompanyName(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const userData = {
        companyId: 2,
        companyName: companyName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password:password,
        role:"MANAGER"
    }

    authService.signup(userData)
    .then((data) => {
        navigate("/");
        console.log("Registered");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
    console.log(userData);
    // reset form
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-container text-center">
      <div className="register-box">
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              className="mt-4"
            />
          </Form.Group>
          <Form.Group className="input-box">
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
              className="mt-4"
            />
          </Form.Group>
          <Form.Group className="input-box">
            <Form.Control
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={handleCompayNameChange}
              required
              className="mt-4"
            />
          </Form.Group>
          <Form.Group className="input-box">
            <Form.Control
              type="email"
              placeholder="Email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-4"
            />
          </Form.Group>
          <Form.Group className="input-box">
            <Form.Control
              type="password"
              placeholder="Password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
              title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
              value={password}
              onChange={handlePasswordChange}
              required
              className="mt-4"
            />
          </Form.Group>

          <Button variant="outline-success" className="mt-4" type="submit">
            Register
          </Button>
        </Form>
        <div className="login-link">
          <p className="mt-4">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
         <Link to='/about'> <Button variant="outline-primary" >Learn more about Plancpu</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
