import axios from "axios";
import authHeader from "./auth-header";

// const API_BASE_URL = 'https://www.softlatency.com/api/managers';
const API_BASE_URL = 'http://localhost:5000/api/managers';

// const ADD_EMPLOYEE_URL = 'https://www.softlatency.com/api/auth/register';
const ADD_EMPLOYEE_URL = 'http://localhost:5000/api/auth/register';
const getUsersByCompanyId = (companyId) => {
    return axios
        .get(API_BASE_URL + "/users-by-companyId/" + companyId, { headers: authHeader() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
};

const addEmployee = (userData) => {
    return axios
        .post(ADD_EMPLOYEE_URL, userData)
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error("Error during signup:", error);
            return error;
        });
};

const deleteEmployee = (id) => {
    return axios
        .delete(API_BASE_URL + "/users/delete/" + id, { headers: authHeader() })
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}

const managerService = {
    getUsersByCompanyId,
    addEmployee,
    deleteEmployee
};

export default managerService;