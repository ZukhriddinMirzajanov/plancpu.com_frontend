import React from "react";
import Button from "react-bootstrap/Button";
import "./AboutPage.css";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <>
      <div class="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      {/* for background animation  */}
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
        <div class="content">
          <h2>
            <i>plancpu</i>
          </h2>
          <h2>
            <i>plancpu</i>
          </h2>
        </div>
        {/* about text */}
        <h5 className="about-cpu">
          <h1>About Our SaaS(software as a service) Projects</h1>
          Plancpu is a project management SaaS company that is transforming the
          way organizations plan, execute, and succeed in their projects. Our
          passion for excellence and commitment to streamlining project
          workflows make us your ultimate partner in driving productivity,
          collaboration, and success. Key features: Intuitive and User-Friendly
          Interface: Our SaaS solution boasts an intuitive and user-friendly
          interface that ensures quick adoption across teams, maximizing
          productivity from day one. Advanced Project Planning: Say goodbye to
          scattered spreadsheets and endless emails. With ProjectMasterPro, you
          can create comprehensive project roadmaps, set clear milestones, and
          establish dependencies for better project visibility and resource
          allocation. Real-Time Collaboration: Foster a united team spirit with
          our platform's real-time communication and collaboration features,
          enabling seamless sharing of ideas, files, and updates. Security and
          Reliability: Your data security is our top priority. With
          state-of-the-art encryption and security protocols, your sensitive
          project information is protected at all times. Join us today and
          experience the future of project management with plancpu. Together,
          let's build a world where every project thrives!
        </h5>
      </div>
      {/* for logo animation */}.
    </>
  );
}

export default AboutPage;
