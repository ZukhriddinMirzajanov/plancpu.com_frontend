import axios from "axios";
import { useNavigate } from "react-router-dom";
import authHeader from "./auth-header";

const API_BASE_URL = 'http://localhost:8080/api/tasks'; 

const getAllTasksByCompanyId = (companyId) => {
    return axios
      .get(API_BASE_URL + "/companyId/" + companyId, {headers:authHeader()})
      .then((response) => {
        if (response.data) {
            console.log(response.data);
            return response.data;
        } else {
            console.log("some error happend");
            return null;
        }
      });
  };
  
  const getTaskById = (taskId) => {
    return axios
      .get(API_BASE_URL + "/" + taskId, {headers:authHeader()})
      .then((response) => {
        if (response.data) {
            console.log(response.data);
            return response.data;
        } else {
            console.log("Error");
            return null;
        }
      });
  };

  const createTask = null;
  const updateTask = null;
  const deleteTask = null;
  
  const taskService = {
    getAllTasksByCompanyId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  };
  
  export default taskService;