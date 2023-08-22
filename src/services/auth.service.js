import axios from "axios";
import userService from "./user.service";

// const API_BASE_URL_PROD = 'https://www.softlatency.com/api/auth'; 
const API_BASE_URL = 'http://localhost:5000/api/auth';

const signup = (userData) => {
    return axios
      .post(API_BASE_URL + "/register", userData)
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
            const userDataToUpdate = {
                companyId: response.data.id,
                companyName: response.data.companyName,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                role: response.data.role
            }
            userService.updateUser(response.data.id, userDataToUpdate);
            localStorage.setItem("user", JSON.stringify(response.data));                
            console.log("Registered");  
        } else {
            console.log("some error happened");
            throw new Error("Some error occurred during registration");
          }
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          throw error;
        });
  };
  
  const login = (email, password) => {
    return axios
      .post(API_BASE_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (
            response.data.token &&
            response.data.id &&
            response.data.companyId &&
            response.data.companyName &&
            response.data.firstName &&
            response.data.lastName &&
            response.data.email &&
            response.data.role
            
        ) {
            localStorage.setItem("user", JSON.stringify(response.data));
        } else {
            console.log("Error");
        }
        return response.data;
      });
  };
  
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
  };
  
  export default authService;