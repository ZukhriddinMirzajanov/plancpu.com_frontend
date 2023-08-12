import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = 'http://plancpu.ap-south-1.elasticbeanstalk.com/api/users';

const getUserById = (id) => {
    return axios
        .get(API_BASE_URL + "/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        })
};
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
                role:user.role
            }
            localStorage.setItem("user", JSON.stringify(userDataToLocal));
            console.log("success")
            return response;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        })
};

const userService = {
    getUserById,
    updateUser
};

export default userService;