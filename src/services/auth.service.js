import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:8080/api/auth'; 

const signup = (userData) => {
    return axios
      .post(API_BASE_URL + "/register", userData)
      .then((response) => {
        if (response.data.token) {
            useNavigate("/login");
        //   localStorage.setItem("user", JSON.stringify(response.data));
        } else {
            console.log("some error happend");
        }
        return response.data;
      });
  };
  
  const login = (email, password) => {
    return axios
      .post(API_BASE_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {

            localStorage.setItem("user", JSON.stringify(response.data));
            useNavigate("/");
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