import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = 'https://www.softlatency.com/api/tasks';

const getAllTasksByCompanyId = (companyId) => {
    return axios
        .get(API_BASE_URL + "/companyId/" + companyId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                console.log("some error happend");
                return null;
            }
        });
};

const getTaskById = (taskId) => {
    return axios
        .get(API_BASE_URL + "/" + taskId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
};

const createTask = (taskData) => {
    return axios
        .post(API_BASE_URL + "/create", taskData, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
};
const updateTask = (id, updatedTask) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedTask, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
};
const deleteTask = (id) => {
    return axios
        .delete(API_BASE_URL + "/delete/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response;
            } else {
                return null;
            }
        })
        .catch(error => {
            throw error;
        });
};

const taskService = {
    getAllTasksByCompanyId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};

export default taskService;