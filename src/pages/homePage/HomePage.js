import React, { useState } from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PopUpWindow from "../../components/modal/PopUpWindow";

const HomePage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
 

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  // Replace this with your actual task data, or fetch the data based on the taskId
  const taskData = {
    id: selectedTask,
    title: "Task Title va nmadur",
    description: "Task Description",
    // Add other task data fields as needed
  };

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid">
        <div className="body-nav">
          <h4>

            <b>Plancpu 1.0.0</b>
          </h4>
          <p>🕐 5 days remaining</p>
        </div>
        <div className="table-box">
          <div className="open-table">
            <p className="table-headers">OPEN</p>
            <div className="open-body">
              <div className="open-task" onClick={() => handleTaskClick(1)}>
                <div className="card-top">
                  <p>Task Id:1</p>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="user"
                  />
                </div>
                <div className="card-middle">
                <p>Title:adfafsfsfvd</p>
                </div>
                <div className="card-bottom">
                  <span>🅾️⏬</span>
                  <Link to="/about">next ⏭️</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="progress-table">
            <p className="table-headers">IN PROGRESS</p>
            <div className="open-body">
              <div className="open-task" onClick={() => handleTaskClick(2)}>
                {/* Task card content */}
                <div className="card-top">
                  <p>Task Id:1</p>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="user"
                  />
                </div>
                <div className="card-middle">
                  <p>Title:somthing bla bla</p>
                </div>
                <div className="card-bottom">
                  <span>🅾️⏬</span>
                  <Link>next ⏭️</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="review-table">
            <p className="table-headers">IN REVIEW</p>
            <div className="open-body">
              <div className="open-task" onClick={() => handleTaskClick(3)}>
                {/* Task card content */}
                <div className="card-top">
                  <p>Task Id:1</p>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="user"
                  />
                </div>
                <div className="card-middle">
                  <p>Title:somthing bla bla</p>
                </div>
                <div className="card-bottom">
                  <span>🅾️⏬</span>
                  <Link>next ⏭️</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="closed-table">
            <p className="table-headers">CLOSED</p>
            <div className="open-body">
              <div className="open-task" onClick={() => handleTaskClick(4)}>
                {/* Task card content */}
                <div className="card-top">
                  <p>Task Id:1</p>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="user"
                  />
                </div>
                <div className="card-middle">
                  <p>Title:somthing bla bla</p>
                </div>
                <div className="card-bottom">
                  <span>🅾️⏬</span>
                  <Link>next ⏭️</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedTask && (
        <PopUpWindow
          show={true}
          onHide={handleCloseModal}
          taskData={taskData}
        />
      )}
    </>
  );
};

export default HomePage;
