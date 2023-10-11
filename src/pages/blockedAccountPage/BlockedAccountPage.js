import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';
import { ToastContainer, toast } from 'react-toastify';
import { HashLoader } from "react-spinners";
import "./BlockedAccountPage.css";
import plancpu from "../../plancpu.svg";

function BlockedAccountPage() {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function checkUserStatus() {
        setIsLoading(true)
        userService.getUserById(userFromLocal.id)
            .then(res => {
                setIsLoading(false);
                if (res.status === 403) {
                    navigate("/login");
                }
                if (res !== null) {
                    if (res.company.isActive) {
                        navigate("/");
                    }

                } else {
                    toast.error("Error while getting user");
                }
            })
    }
    useEffect(checkUserStatus, [userFromLocal.id, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
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
        <>
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <ToastContainer position="top-center" />
            <img src={plancpu} alt="logo" className="plancpu" />
            <div className="blockedAccountText">
                <p>Your Company account currently blocked! Please contact with plancpu support: <strong>plancpu.com@gmail.com</strong> <Link to="/login" onClick={handleLogout}>Logout</Link></p>
            </div>

        </>
    )
}

export default BlockedAccountPage