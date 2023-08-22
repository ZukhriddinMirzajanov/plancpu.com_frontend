import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./Profile.css";
import ProfileModal from "./ProfileModal";
import { Button } from "react-bootstrap";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    function fetchUser() {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setAll(user);
            setIsLoading(false);
        } else {
            navigate("/login");
        }

    }

    useEffect(fetchUser, [userFromLocal, navigate]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const setAll = (user) => {
        setCompanyName(user.companyName);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setRole(user.role);
    }
    const spinnerContainerCss = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "9999"
    };


    return (
        <div>
            <NavbarComponent />
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <div className="profile">
                <div className="profile-box">
                    <h2 className="text-center mb-3">Your Profile</h2>
                    <img
                        src="https://c4.wallpaperflare.com/wallpaper/912/429/111/technology-anonymous-hacker-hd-wallpaper-preview.jpg"
                        alt="profile"
                        className="profiile-image"
                    />
                    <div className="profile-body">
                        <p>
                            <b>First Name:</b> <span>{firstName}</span>
                        </p>
                        <p>
                            <b>Last Name:</b> <span>{lastName}</span>
                        </p>
                        <p>
                            <b>Company Name:</b> <span>{companyName}</span>
                        </p>
                        <p>
                            <b>Email:</b> <span>{email}</span>
                        </p>
                        <p>
                            <b>Role:</b> <span>{role}</span>
                        </p>
                    </div>
                    <Button variant="outline-primary" onClick={openModal}>Edit Profile</Button>
                </div>
            </div>

            {showModal && <ProfileModal closeModal={closeModal} />}
        </div>
    );
};

export default Profile;