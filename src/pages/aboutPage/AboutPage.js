import React from "react";
import Button from "react-bootstrap/Button";
import "./AboutPage.css";
import { Link } from "react-router-dom";
import logo from "../../plancpu.svg";

function AboutPage() {

  return (
    <>
      <div className="container-fluid">
        <Link to="/login">
          {" "}
          <Button className="about-login-btn" variant="outline-success">
            Login
          </Button>
        </Link>
        <Link to="/register">
          {" "}
          <Button className="about-sign-btn" variant="outline-success">
            Sign in
          </Button>
        </Link>
        <img className="about-logo" src={logo} alt="logo" />

        <Link to='/'><div class="content">
          <h2>
            <i>plancpu</i>
          </h2>
          <h2>
            <i>plancpu</i>
          </h2>
        </div></Link>
        <div className="about-box">
          <h1 className="about-title">
            Our SaaS(software as a service) Projects
          </h1>
          <h3 className="about-text">
            Plancpu is a project management SaaS company that is transforming
            the way organizations plan, execute, and succeed in their projects.
            Our passion for excellence and commitment to streamlining project
            workflows make us your ultimate partner in driving productivity,
            collaboration, and success.
          </h3>
          <h4>Key features:</h4>
          <h6>
            Intuitive and User-Friendly Interface: Our SaaS solution boasts an
            intuitive and user-friendly interface that ensures quick adoption
            across teams, maximizing productivity from day one. Advanced Project
            Planning: Say goodbye to scattered spreadsheets and endless emails.
            With ProjectMasterPro, you can create comprehensive project
            roadmaps, set clear milestones, and establish dependencies for
            better project visibility and resource allocation. Real-Time
            Collaboration: Foster a united team spirit with our platform's
            real-time communication and collaboration features, enabling
            seamless sharing of ideas, files, and updates. Security and
            Reliability: Your data security is our top priority. With
            state-of-the-art encryption and security protocols, your sensitive
            project information is protected at all times.
          </h6>
          <h5>
            Join us today and experience the future of project management with
            plancpu. Together, let's build a world where every project thrives! 
            <a href="https//plancpu.com">plancpu.com</a>
          </h5>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
