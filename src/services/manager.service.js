import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = 'http://plancpu.ap-south-1.elasticbeanstalk.com/api/managers';
const getUsersByCompanyId = (companyId) => {
    return axios
        .get(API_BASE_URL + "/users-by-companyId/" + companyId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                console.log("success");
            } else {
                console.log("Error");
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        })
};

const addEmployee = (userData) => {
    return axios
        .post("http://plancpu.ap-south-1.elasticbeanstalk.com/api/auth/register", userData)
        .then((response) => {
            console.log("Employee added");
        })
        .catch((error) => {
            console.error("Error during signup:", error);
            throw error;
        });
};

const deleteEmployee = (id) => {
    return axios
        .delete(API_BASE_URL + "/users/delete/" + id, {headers:authHeader()})
        .then((res) => {
            console.log("deleted");
        })
        .catch((err) => {
            console.log(err);
        })
}

const managerService = {
    getUsersByCompanyId,
    addEmployee,
    deleteEmployee
};

export default managerService;