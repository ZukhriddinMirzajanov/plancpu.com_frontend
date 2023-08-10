import axios from "axios";
import authHeader from "./auth-header";
const API_BASE_URL = 'http://localhost:8080/api/admin';

const getUsers = () => {
    return axios
        .get(API_BASE_URL + "/users", { headers: authHeader() })
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

const getManagers = () => {
    return axios
        .get(API_BASE_URL + "/managers", {headers:authHeader()})
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error("Error during get:", error);
            throw error;
        });
};

const deleteUser = (id) => {
    return axios
        .delete(API_BASE_URL + "/users/delete/" + id, {headers:authHeader()})
        .then((res) => {
            console.log("deleted");
        })
        .catch((err) => {
            console.log(err);
        })
};

const adminService = {
    getUsers,
    getManagers,
    deleteUser
};

export default adminService;