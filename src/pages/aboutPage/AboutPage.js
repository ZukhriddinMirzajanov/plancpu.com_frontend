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
                    Plancpu is a project management SaaS company that is transforming the
                    way organizations plan, execute, and succeed in their projects. Our
                    passion for excellence and commitment to streamlining project
                    workflows make us your ultimate partner in driving productivity,
                    collaboration, and success.
                </p>
                <p>Key features:</p>
                <ul>
                    <li>
                        Intuitive and User-Friendly Interface: Our SaaS solution boasts an
                        intuitive and user-friendly interface that ensures quick adoption
                        across teams, maximizing productivity from day one.
                    </li>
                    <li>
                        Advanced Project Planning: Say goodbye to scattered spreadsheets and
                        endless emails. With ProjectMasterPro, you can create comprehensive
                        project roadmaps, set clear milestones, and establish dependencies
                        for better project visibility and resource allocation.
                    </li>
                    <li>
                        Real-Time Collaboration: Foster a united team spirit with our
                        platform's real-time communication and collaboration features,
                        enabling seamless sharing of ideas, files, and updates.
                    </li>
                    <li>
                        Security and Reliability: Your data security is our top priority.
                        With state-of-the-art encryption and security protocols, your
                        sensitive project information is protected at all times.
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
                            <h6>Address:</h6>
                            <li>Tashkent, Uzbekistan</li>
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
