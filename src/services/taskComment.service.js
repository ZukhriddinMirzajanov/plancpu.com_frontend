import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = 'https://www.softlatency.com/api/taskComment';
// const API_BASE_URL = 'http://localhost:5000/api/taskComment';

const getAllCommentsByTaskId = (taskId) => {
    return axios
        .get(API_BASE_URL + "/byTaskId/" + taskId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                console.log("some error happend");
                return response;
            }
        })
        .catch(err => {
            return err;
        });
};

const getTaskCommentById = (taskCommentId) => {
    return axios
        .get(API_BASE_URL + "/" + taskCommentId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};

const createTaskComment = (taskCommentData) => {
    return axios
        .post(API_BASE_URL + "/create", taskCommentData, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};

const updateTaskComment = (id, updatedTaskComment) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedTaskComment, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
};

const deleteTaskComment = (id) => {
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
            return error;
        });
};


const taskCommentService = {
    getAllCommentsByTaskId,
    getTaskCommentById,
    createTaskComment,
    updateTaskComment,
    deleteTaskComment
};

export default taskCommentService;