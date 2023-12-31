import React, { useEffect, useState } from "react";
import "./CompanyManagment.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { Button, Form, FormControl, Modal, ToastContainer } from "react-bootstrap";
import { CircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import companyService from "../../services/company.service";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import userService from "../../services/user.service";

const CompanyManagment = () => {
    // const tasksPerPage = 10;
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [searchCompany, setSearchCompany] = useState("");
    const [indexForDel, setIndexForDel] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    function fetchAllData() {
        setIsLoading(true);
        userService.getUserById(userFromLocal.id)
            .then(resUser => {
                if (resUser !== null) {
                    if (resUser.status === 403) {
                        navigate("/login");
                    }
                    companyService.getAllCompany(resUser.company.id)
                        .then(resCompany => {
                            if (resCompany.length > 0) {
                                setIsLoading(false);
                                setCompanies(resCompany);
                            } else {
                                setIsLoading(false);
                            }
                        })
                } else {
                    setIsLoading(false);
                    toast.error("Error while getting user");
                }
            })
    }

    useEffect(fetchAllData, [userFromLocal.id, navigate]);

    const handleSearchInputChange = (event) => {
        setSearchCompany(event.target.value);
    };

    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(searchCompany.toLowerCase())
    );

    function deleteCompany() {
        const updatedCompanies = [...companies];
        const deletedCompany = companies[Number(indexForDel)];
        updatedCompanies.splice(Number(indexForDel), 1)
        setIsLoading(true);
        companyService.deleteCompany(deletedCompany.id)
            .then(res => {
                if (res !== null) {
                    setCompanies(updatedCompanies);
                    setIsLoading(false);
                    toast.info("Deleted");
                    setShowDeleteModal(false);
                } else {
                    setIsLoading(false);
                    toast.error("Error happened while deleting");
                }

            })
    }

    const showMadalForDel = (index) => {
        setIndexForDel(index);
        setShowDeleteModal(true);
    }
    const closeModalForDel = () => {
        setShowDeleteModal(false);
        setIndexForDel("");
    }

    const toggleCompanyStatus = (company, index) => {
        let updatedCompany = {
            id: company.id,
            name: company.name,
            isActive: !company.isActive,
            joinedDate: company.joinedDate
        }

        let companiesData = [...companies];
        companiesData[index] = updatedCompany;


        setIsLoading(true)
        companyService.updateCompany(company.id, updatedCompany)
            .then(res => {
                if (res != null) {
                    setIsLoading(false);
                    toast.info("Updated");
                    setCompanies(companiesData);
                } else {
                    setIsLoading(false);
                    toast.error("Error happened while updated");
                }
            })
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
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
            <NavbarComponent />
            {isLoading && (
                <div style={spinnerContainerCss}>
                    <HashLoader loading={isLoading} color="#62bdea" size={50} />
                </div>
            )}
            <ToastContainer position="top-center" />
            <div className="company-management container-fluid">
                <h1 className="text-center">Company List:</h1>

                <Form className="company-search-container">
                    <FormControl
                        type="text"
                        placeholder=" Search by company name"
                        value={searchCompany}
                        onChange={handleSearchInputChange}
                    />
                </Form>

                <div className="company-list">
                    {filteredCompanies.map((company, index) => (
                        <div key={company.id} className="company-card">
                            <div className="company-card-left">
                                <div
                                    className={`status-circle ${company.isActive ? "green" : "red"
                                        }`}
                                >
                                    <CircleFill />
                                </div>
                                <h5>{company.name}</h5>
                                <p>Joined Date: {formatDate(company.joinedDate)}</p>
                            </div>
                            <div className="company-card-right">
                                {company.isActive ? (
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => toggleCompanyStatus(company, index)}
                                    >
                                        Block
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline-success"
                                        onClick={() => toggleCompanyStatus(company, index)}
                                    >
                                        Unblock
                                    </Button>
                                )}
                                <Button
                                    variant="outline-danger"
                                    className="company-delete-btn"
                                    onClick={() => showMadalForDel(index)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal show={showDeleteModal} size="lg" centered>
                    <Modal.Body>
                        <Modal.Title>Do you want to Delete?</Modal.Title>
                        <Modal.Body className="showDelModalBody">
                            <Button variant="outline-success" onClick={() => closeModalForDel()}>No</Button>
                            <Button style={{ marginLeft: "10px" }} variant="outline-danger" onClick={() => deleteCompany()}>Yes</Button>
                        </Modal.Body>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default CompanyManagment;