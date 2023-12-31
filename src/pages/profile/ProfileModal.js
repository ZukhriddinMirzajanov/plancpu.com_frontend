import React, { useEffect, useState } from "react";
import './ProfileModal.css'
import userService from "../../services/user.service";
import { Button } from "react-bootstrap";

const ProfileModal = ({ closeModal }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setAll(user);
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const setAll = (user) => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            id: user.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: user.role,
            company: user.company,
            companyProjects: user.companyProjects
        }
        userService.updateUser(user.id, userData)
            .then((response) => {
                console.log("ok");
                if (response.status === 200) {
                    closeModal();
                } else {
                    console.error('Failed to update profile');
                }
            })
            .catch((error) => {
                console.log(error);
            })

    };

    return (
        <div className="profile-modal">
            <div className="modal-content">
                <span className="profile-close" onClick={closeModal}>
                    &times;
                </span>
                <h2>Edit Profile</h2>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <label className="profile-label">
                        First Name:
                        <input
                            className="profile-input"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </label>
                    <label className="profile-label">
                        Last Name:
                        <input
                            className="profile-input"
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </label>
                    <label className="profile-label">
                        Email:
                        <input
                            className="profile-input"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </label>
                    <Button variant="outline-success" type="submit">Update</Button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;