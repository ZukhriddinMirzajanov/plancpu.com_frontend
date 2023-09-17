import axios from "axios";
import authHeader from "./auth-header";
// const API_BASE_URL = 'https://www.softlatency.com/api/admin';
const API_BASE_URL = 'http://localhost:5000/api/admin';

const getUsers = () => {
    return axios
        .get(API_BASE_URL + "/users", { headers: authHeader() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        })
};

const getManagers = () => {
    return axios
        .get(API_BASE_URL + "/managers", {headers:authHeader()})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error during get:", error);
            return error;
        });
};

const deleteUser = (id) => {
    return axios
        .delete(API_BASE_URL + "/users/delete/" + id, {headers:authHeader()})
        .then((res) => {
            console.log("deleted");
            return res;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
};

const adminService = {
    getUsers,
    getManagers,
    deleteUser
};

export default adminService;