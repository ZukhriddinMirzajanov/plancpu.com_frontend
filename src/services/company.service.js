import axios from "axios";
import authHeader from "./auth-header";

// const API_BASE_URL = 'https://www.softlatency.com/api/company';
const API_BASE_URL = 'http://localhost:5000/api/company';

const getAllCompany = (companyId) => {
    return axios
        .get(API_BASE_URL + "/getAll/" + companyId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                console.log("some error happend");
                return null;
            }
        })
        .catch(err => {
            return err;
        });
};

const getCompanyById = (companyId) => {
    return axios
        .get(API_BASE_URL + "/" + companyId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};

const createCompany = (companyData) => {
    return axios
        .post(API_BASE_URL + "/create", companyData, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("Company Created")
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};
const updateCompany = (id, updatedCompany) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedCompany, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};
const deleteCompany = (id) => {
    return axios
        .delete(API_BASE_URL + "/delete/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            console.log(error);
            return error;
        });
};

const companyService = {
    getAllCompany,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
};

export default companyService;