import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';
import { ToastContainer, toast } from 'react-toastify';
import { HashLoader } from "react-spinners";

function BlockedAccountPage() {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    function checkUserStatus() {
        setIsLoading(true)
        userService.getUserById(userFromLocal.id)
            .then(res => {
                if (res.status === 403) {
                    setIsLoading(false);
                    navigate("/login");
                }
                if (res !== null) {
                    if (res.company.isActive) {
                        navigate("/");
                    }

                } else {
                    setIsLoading(false);
                    toast.error("Error while getting user");
                }
            })
    }
    useEffect(checkUserStatus, [userFromLocal.id, navigate]);

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
            <div>
                <h1 className="blockedAccountText">Your Company account currently blocked!</h1>
            </div>

        </>
    )
}

export default BlockedAccountPage