
import React, { useState } from "react";
import axios from "axios";
import './ProfileModal.css'

const ProfileModal = ({ closeModal }) => {
  const [updatedProfileData, setUpdatedProfileData] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('URL', updatedProfileData);

      if (response.status === 200) {
        closeModal(); 
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="modal">
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
              value={updatedProfileData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={updatedProfileData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            UserId:
            <input
              type="number"
              name="userId"
              value={updatedProfileData.userId}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedProfileData.email}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;