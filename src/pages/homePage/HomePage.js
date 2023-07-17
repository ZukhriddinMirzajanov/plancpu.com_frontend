import React from "react";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import PopUpWindow from "../../components/modal/PopUpWindow";

const HomePage = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <NavbarComponent />
      <div className="container-fluid ">
        <div className="body-nav">
          <h4>
            <b>Makeoson 1.0.0</b>
          </h4>
          <p>🕐 5 days remaining</p>
        </div>
        <div className="table-box">
          {/* open-table start */}
          <div className="open-table">
            <p className="table-headers">OPEN</p>
            <div className="open-body">
              {/* task cards here below */}
              <div className="open-task" onClick={() => setModalShow(true)}>
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
                <PopUpWindow
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              {/* task cards end */}
            </div>
          </div>
          {/* open table end */}
          <div className="progress-table">
            <p className="table-headers">IN PROGRESS</p>
            <div className="open-body">
              {/* task card below */}
              <div className="open-task" onClick={() => setModalShow(true)}>
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
                <PopUpWindow
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              {/* task card end */}
            </div>
          </div>
          {/* progress table end */}
          <div className="review-table">
            <p className="table-headers">IN REVIEW</p>
            <div className="open-body">
              {/* Task card here  */}
              <div className="open-task" onClick={() => setModalShow(true)}>
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
              <PopUpWindow
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              {/* Task card end */}
            </div>
          </div>
          {/* review table end */}
          <div className="closed-table">
            <p className="table-headers">CLOSED</p>
            <div className="open-body">
              {/* task card here */}
              <div className="open-task" onClick={() => setModalShow(true)}>
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
                <PopUpWindow
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              {/* task card end */}
            </div>
          </div>
          {/* closed table end */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
