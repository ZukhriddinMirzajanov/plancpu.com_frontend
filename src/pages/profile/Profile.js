import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./Profile.css";
import ProfileModal from "./ProfileModal";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userFromLocal = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setAll(user);
    }, [userFromLocal]);

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



    return (
        <div>
            <NavbarComponent />
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
                    <button className="btn btn-success" onClick={openModal}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {showModal && <ProfileModal closeModal={closeModal} />}
        </div>
    );
};

export default Profile;