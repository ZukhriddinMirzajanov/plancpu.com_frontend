import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./AboutPage.css";
import plancpu from "../../plancpu.svg";
import { Link } from "react-router-dom";
import SliderCpu from "../../components/slider/SliderCpu";
import { Nav } from "react-bootstrap";

function AboutPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const currentDate = new Date().toLocaleDateString();

    useEffect(() => {
        // Check if the user is logged in based on localStorage data
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <SliderCpu />
            <div className="container project-body">
                <br />
                <img src={plancpu} alt="logo" className="plancpu" />

                <br />
                <br />
                {isLoggedIn && (
                    <>
                        <Link to="/">
                            <Button variant="outline-primary" className="about-signup-btn">
                                Home
                            </Button>
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <Link to="/login">
                            <Button variant="outline-primary" className="about-login-btn">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline-primary" className="about-signup-btn">
                                Signup
                            </Button>
                        </Link>
                    </>
                )}
                <p>
                    Plancpu is a project management platform.
                </p>
                <p>Key features:</p>
                <ul>
                    <li>
                        User Authentication: Implemented secure user authentication for Managers, Employees, and Admin, ensuring controlled access to the system.
                    </li>
                    <li>
                        Employee Management: Designed the Manager Dashboard, enabling the management of employees, project creation, analytics tracking, and more. Facilitated Employee Profile Update, allowing employees to maintain their personal information. Developed an Admin Dashboard for system control, including user account management.
                    </li>
                    <li>
                        Task Management: Created a robust task management system, enabling Managers and Employees to create, edit, and delete tasks within specific projects. Implemented task status management with real-time communication between clients and servers, ensuring seamless updates and collaboration. Established a task workflow, including Open, In Progress, In Review, and Closed statuses.
                    </li>
                    <li>
                        Project Management: Allowed Managers to create projects and assign employees to specific projects. Enabled Managers to filter and manage projects.
                    </li>
                    <li>
                        Project Analytics: Implemented line and bar charts for project analytics, providing Managers and Employees with valuable insights.
                    </li>
                    <li>
                        Time Registration: Enabled Employees to report their working hours. Facilitated the Manager's ability to view working hours reports of employees under their supervision.
                    </li>
                    <li>
                        Technologies Used: Front-End: JavaScript, ReactJS, HTML, CSS, Bootstrap, Websocket. Back-End: Java Spring Boot, Websocket, JWT. Database: PostgreSQL. Hosting Platform: AWS, Heroku, Firebase.
                    </li>
                </ul>
                <p>
                    Join us today and experience the future of project management with
                    plancpu. Together, let's build a world where every project thrives!{" "}
                    <small>
                        <a href="https://plancpu.com">plancpu.com</a>
                    </small>
                </p>
            </div>
            <footer>
                <div className="container ">
                    <Nav className="footer-nav">
                        <ul className="footer-left">
                            {/* <h6>Address:</h6>
                            <li>Tashkent, Uzbekistan</li> */}
                        </ul>
                        <ul className="footer-right">
                            <h6>Contacts:</h6>
                            <li>+998940644222</li>
                            <li>plancpu.com@gmail.com</li>
                        </ul>
                    </Nav>
                    <div className="f-bottom">
                        <span>©️ {currentDate}: www.plancpu.com</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default AboutPage;
