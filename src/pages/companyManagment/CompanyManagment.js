import React, { useState } from "react";
import "./CompanyManagment.css";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { Form, FormControl } from "react-bootstrap";
import { CircleFill } from "react-bootstrap-icons";

const CompanyManagment = () => {
  const companiesData = [
    {
      id: 1,
      name: "softcompy",
      description: "Description for Companyds gsg sgsr grs ger grg  A",
      manager: "Suhrob",
      joinedDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Company B",
      description: " fewf fe few fweDescription for fvsd fsefCompany B",
      manager: "Suhrob",
      joinedDate: "2023-02-20",
      status: "active",
    },
    {
      id: 3,
      name: "Company C",
      description: "Description for Company C",
      manager: "Suhrob",
      joinedDate: "2023-03-25",
      status: "active",
    },
    {
      id: 4,
      name: "Company D",
      description: "Descriptionfefe fe for Company D",
      manager: "Suhrob",
      joinedDate: "2023-04-30",
      status: "active",
    },
    {
      id: 4,
      name: "Company D",
      description:
        "Description for dv fewf wrw rwr r3q rq r3q3 r3q r3rqwrqrq Company D",
      manager: "Suhrob",
      joinedDate: "2023-04-30",
      status: "",
    },
  ];

  const [companies] = useState(companiesData);
  const [searchCompany, setSearchCompany] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchCompany(event.target.value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchCompany.toLowerCase())
  );

  return (
    <>
      <NavbarComponent />

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
          {filteredCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className={`status-circle ${company.status}`}>
              <CircleFill /> 
              </div>
              <h5>{company.name}</h5>
              <p>{company.manager}</p>
              <p>Joined Date: {company.joinedDate}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CompanyManagment;