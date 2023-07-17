import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    // reset form

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container text-center">
     
      <div className="login-box">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="input-box">
            <Form.Control
              type="email"
              placeholder="Email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-5"
            />
          </Form.Group>
          <Form.Group className="input-box">
            <Form.Control
              type="password"
              placeholder="Password"
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$"
              title="Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
              value={password}
              onChange={handlePasswordChange}
              required
              className="mt-4"
            />
          </Form.Group>

          <Button variant="primary" className="mt-4" type="submit">
            Login
          </Button>
        </Form>
        <div className="register-link">
          <p className="mt-5">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
