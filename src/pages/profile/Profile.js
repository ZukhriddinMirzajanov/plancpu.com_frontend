import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./Profile.css";
import ProfileModal from "./ProfileModal";
import { Button } from "react-bootstrap";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    function fetchUser() {
        setIsLoading(true);
        userService.getUserById(userFromLocal.id)
            .then(user => {
                if (user !== null) {
                    if (user.status === 403) {
                        navigate("/login");
                    }
                    setUser(user);
                    setIsLoading(false);
                }
            })

    }

    useEffect(fetchUser, [userFromLocal.id, navigate]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
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
                    <div className="profile-body">
                        <p>
                            <b>First Name:</b> <span>{user.firstName}</span>
                        </p>
                        <p>
                            <b>Last Name:</b> <span>{user.lastName}</span>
                        </p>
                        <p>
                            {/* <b>Company Name:</b> <span>{user.company.name}</span> */}
                        </p>
                        <p>
                            <b>Email:</b> <span>{user.email}</span>
                        </p>
                        <p>
                            <b>Role:</b> <span>{user.role}</span>
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