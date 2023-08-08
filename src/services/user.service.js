import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/users'; 

const getUserById = (id) => {
    return null
};
const getUserByCompayId = (companyId) => {
    return null
};
const updateUser = (id, updatedUser) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedUser)
        .then((response) => {
            if (
                response.data.token &&
                response.data.id &&
                response.data.companyName &&
                response.data.firstName &&
                response.data.lastName &&
                response.data.email &&
                response.data.role
            ) {
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                console.log("some error happend");
            }
            return response.data;
        })
};

const userService = {
    getUserById,
    getUserByCompayId,
    updateUser
  };
  
  export default userService;