import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:8080/api'; 

const getUserById = (id) => {
    return null
};
const getUserByCompayId = (companyId) => {
    return null
};
const updateUser = (updatedUser) => {
    return null
};

const userService = {
    getUserById,
    getUserByCompayId,
    updateUser
  };
  
  export default userService;