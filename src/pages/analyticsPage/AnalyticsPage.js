import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import "./AnalyticsPage.css";
import {
    LineChart,
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import userService from "../../services/user.service";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import taskService from "../../services/task.service";

const AnalyticsPage = () => {
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [dataForChart, setDataForChart] = useState([]);
    const [complatedTasksHour, setComplatedTasksHours] = useState(0);
    const [uncomplatedTasksHour, setUncomplatedTasksHours] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState("");
    const selectedIndexFromLocal = JSON.parse(localStorage.getItem("plancpu.com.selectedIndexFromLocal"));

    useEffect(() => {
        setIsLoading(true);
        userService
            .getUserById(userFromLocal.id)
            .then((resUser) => {
                setIsLoading(false);
                if (resUser.status === 403) {
                    navigate("/login");
                    return;
                }
                if (resUser !== null && resUser.company !== undefined) {
                    setUserData(resUser);
                }
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [userFromLocal.id, navigate]);

    // useEffect(() => {
    //     setIsLoading(true);

    // }, [])

    function setProFunc(index) {
        localStorage.setItem("plancpu.com.selectedIndexFromLocal", index);
        setSelectedIndex(index);
    }

    const getFormatDate = (date) => {
        const createdAtDate = new Date(date); // Convert seconds to milliseconds
        const year = createdAtDate.getFullYear();
        // Note: getMonth() returns values from 0 to 11, so you need to add 1 to get the correct month.
        const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
        const day = String(createdAtDate.getDate()).padStart(2, '0');

        // Create the formatted date string in "YYYY-MM-DD" format
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    function fetchAllTasksByCompanyProject() {
        if (selectedIndexFromLocal) {
            setSelectedIndex(selectedIndexFromLocal);
        }
        if (userData.companyProjects && userData.companyProjects.length > 0) {
            if (userData.companyProjects.length <= selectedIndex) {
                localStorage.removeItem("plancpu.com.selectedIndexFromLocal");
                selectedIndex(0);
            }

            setIsLoading(true);
            taskService
                .getAllTasksByCompanyProjectId(
                    userData.companyProjects[Number(selectedIndex)].id
                )
                .then((res) => {
                    setIsLoading(false);
                    if (res !== null) {
                        if (res.length > 0) {
                            let totalComplatedTasksHours = 0;
                            let totalUnComplatedTasksHours = 0;
                            res.map((task) => {
                                if (task.statusOfTask === 4) {
                                    totalComplatedTasksHours += task.hour;
                                } else {
                                    totalUnComplatedTasksHours += task.hour
                                }
                                return task;
                            });
                            const dateRange = userData.companyProjects[Number(selectedIndex)].createdDate + " - " + userData.companyProjects[Number(selectedIndex)].finishedDate;

                            // Split the date range into start and end dates
                            const [startDateStr, endDateStr] = dateRange.split(' - ');
                            const startDate = new Date(startDateStr);
                            let endDate = new Date(endDateStr);

                            // Get today's date
                            const today = new Date();

                            // Ensure endDate is not greater than today
                            if (endDate > today) {
                                endDate = today;
                            }

                            // Initialize an array to store working days
                            const workingDays = [];

                            // Define a function to check if a date is a weekend (Saturday or Sunday)
                            function isWeekend(date) {
                                const day = date.getDay();
                                return day === 0 || day === 6; // Sunday (0) or Saturday (6)
                            }

                            // Iterate through the dates within the date range
                            const currentDate = new Date(startDate);
                            while (currentDate <= endDate) {
                                let complatedTaskHour = 0;


                                // Check if the current date is not a weekend
                                if (!isWeekend(currentDate)) {
                                    res.map((task) => {
                                        if (task.statusOfTask === 4 && getFormatDate(task.lastUpdatedDate) === currentDate.toISOString().split('T')[0]) {
                                            complatedTaskHour += task.hour;
                                        }
                                        return task;
                                    });
                                    workingDays.push({ workingDay: currentDate.toISOString().split('T')[0], complatedTaskHour: complatedTaskHour });
                                }

                                // Move to the next day
                                currentDate.setDate(currentDate.getDate() + 1);
                            }
                            setDataForChart(workingDays);
                            setComplatedTasksHours(totalComplatedTasksHours);
                            setUncomplatedTasksHours(totalUnComplatedTasksHours);

                        } else {
                            setDataForChart([]);
                        }
                    } else {
                        toast.error("Error while getting tasks");
                    }
                })
                .catch((err) => {
                    toast.error("Error!");
                    setIsLoading(false);
                    console.log(err);
                    // navigate("/login");
                });
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(fetchAllTasksByCompanyProject, [
        selectedIndex,
        userData,
        selectedIndexFromLocal,
    ]);

    const data = dataForChart.length > 0 ? dataForChart : [];

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
        zIndex: "9999",
    };

    return (
        <>
            <NavbarComponent />
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <div className="container-fluid">
                <div className="body-nav">
                    <p>
                        {userData.company ? userData.company.name : ""} selected project:
                    </p>
                    <p>
                        {userData.companyProjects ? (
                            <Form.Select
                                as="select"
                                value={selectedIndex}
                                onChange={(e) => setProFunc(e.target.value)}
                                required
                            >
                                {/* <option>
                                    {selectedIndexFromLocal
                                        ? userData.companyProjects[selectedIndexFromLocal]
                                            ? userData.companyProjects[selectedIndexFromLocal].name
                                            : "No project"
                                        : userData.companyProjects.length > 0
                                            ? userData.companyProjects[0].name
                                            : "No project"}
                                </option> */}
                                {userData.companyProjects.map((project, index) => (
                                    <option key={project.id} value={index}>
                                        {project.name} ({"From: " + userData.companyProjects[index].createdDate + " till: " + userData.companyProjects[index].finishedDate})
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            ""
                        )}
                    </p>
                </div>
                <div className="main-box">
                    <h1 className="text-center">Analytics</h1>
                    <div className="line-graph">
                        <p><strong style={{color:"green"}}>{complatedTasksHour}</strong> hours of work done.</p>
                        <p><strong style={{color:"red"}}>{uncomplatedTasksHour}</strong> hours of work is waiting to be done</p>
                        {dataForChart.length > 0 ? (
                            <LineChart width={800} height={400} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="workingDay" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="complatedTaskHour" stroke="#8884d8" />
                            </LineChart>
                        ) : <p style={{ textAlign: "center" }}>Line Chart: You don't have data yet for Analytics</p>}

                    </div>
                    <div>
                        {dataForChart.length > 0 ? (
                            <BarChart
                                width={800}
                                height={400}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="workingDay" />
                                <YAxis dataKey="complatedTaskHour" />
                                <Tooltip />
                                <Legend />
                                {/* <Bar dataKey="minCountdaily" stackId="a" fill="#8884d8" /> */}
                                <Bar dataKey="complatedTaskHour" stackId="a" fill="#82ca9d" />
                            </BarChart>
                        ) : <p style={{ textAlign: "center" }}>Bar Chart: You don't have data yet for Analytics</p>}
                    </div>
                </div>

            </div>
        </>
    );
};

export default AnalyticsPage;
