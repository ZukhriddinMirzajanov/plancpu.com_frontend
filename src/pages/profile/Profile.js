import React, { useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./Profile.css";
import ProfileModal from "./ProfileModal";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const profileData = {
    firstName: "Sukhrob",
    lastName: "Ruzmetov",
    userId: 1,
    companyName: "Softcompy",
    email: "sukhrob2707@gmail.com",
    role: "Manager",
  };

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
              <b>First Name:</b> <span>{profileData.firstName}</span>
            </p>
            <p>
              <b>Last Name:</b> <span>{profileData.lastName}</span>
            </p>
            <p>
              <b>User Id:</b> {profileData.userId}
            </p>
            <p>
              <b>Company Name:</b> <span>{profileData.companyName}</span>
            </p>
            <p>
              <b>Email:</b> <span>{profileData.email}</span>
            </p>
            <p>
              <b>Role:</b> <span>{profileData.role}</span>
            </p>
          </div>
          <button className="btn btn-success" onClick={openModal}>
            Edit Profile
          </button>
        </div>
      </div>

      {showModal && <ProfileModal closeModal={closeModal} profileData={profileData} />}
    </div>
  );
};

export default Profile;