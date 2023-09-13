import axios from "axios";
import authHeader from "./auth-header";

// const API_BASE_URL_PROD = 'https://www.softlatency.com/api/users';
const API_BASE_URL = 'http://localhost:5000/api/users';


const getUserById = (id) => {
    return axios
        .get(API_BASE_URL + "/profile/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error.response;
        })
};
const addCompanyToUser = (userData, companyId) => {
    return axios
        .put(API_BASE_URL + "/" + userData.id + "/company/" + companyId, userData, { headers: authHeader() })
        .then(res => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        })
}

const addCompanyProjectToUser = (userData, companyProjectId) => {
    return axios
        .put(API_BASE_URL + "/" + userData.id + "/companyProject/" + companyProjectId, userData, { headers: authHeader() })
        .then(res => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        })
}

const updateUser = (id, updatedUser) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedUser, { headers: authHeader() })
        .then((response) => {
            const user = JSON.parse(localStorage.getItem("user"));
            const userDataToLocal = {
                token: user.token,
                id: user.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: user.role
            }
            localStorage.setItem("user", JSON.stringify(userDataToLocal));
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        })
};

const userService = {
    getUserById,
    updateUser,
    addCompanyToUser,
    addCompanyProjectToUser
};

export default userService;