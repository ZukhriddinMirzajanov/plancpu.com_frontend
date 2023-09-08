import axios from "axios";
import authHeader from "./auth-header";

// const API_BASE_URL_PROD = 'https://www.softlatency.com/api/users';
const API_BASE_URL = 'http://localhost:5000/api/users';

const getUserById = (id) => {
    return axios
        .get(API_BASE_URL + "/profile/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
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
            console.log({headers: authHeader()});
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
                companyId: user.companyId,
                companyName: user.companyName,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: user.role
            }
            localStorage.setItem("user", JSON.stringify(userDataToLocal));
            console.log("success")
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
    addCompanyToUser
};

export default userService;