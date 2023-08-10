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
            companyId: user.companyId,
            companyName: user.companyName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: user.role
        }
        console.log(userData);
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
                <span className="close" onClick={closeModal}>
                    &times;
                </span>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
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