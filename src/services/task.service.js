import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = 'https://www.softlatency.com/api/tasks';
// const API_BASE_URL = 'http://localhost:5000/api/tasks';

const getAllTasksByCompanyProjectId = (companyProjectId) => {
    return axios
        .get(API_BASE_URL + "/companyProjectId/" + companyProjectId, { headers: authHeader() })
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

const getAllStatusZeroTasksByCompanyProjectId = (companyProjectId) => {
    return axios
        .get(API_BASE_URL + "/statusZeroTasksByCompanyProjectId/" + companyProjectId, { headers: authHeader() })
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
            return error;
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
            return error;
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
            return error;
        });
};

const addCompanyProjectToTask = (task, companyProjectId) => {
    return axios
        .put(API_BASE_URL + "/" + task.id + "/companyProject/" + companyProjectId, task, {headers: authHeader()})
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
}

const addUserCreatedToTask = (task, userCreatedId) => {
    return axios
        .put(API_BASE_URL + "/" + task.id + "/userCreated/" + userCreatedId, task, {headers: authHeader()})
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
}

const addUserWorkedToTask = (task, userWorkedId) => {
    return axios
        .put(API_BASE_URL + "/" + task.id + "/userWorked/" + userWorkedId, task, {headers: authHeader()})
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
}

const addUserReviewedToTask = (task, userReviewedId) => {
    return axios
        .put(API_BASE_URL + "/" + task.id + "/userReviewed/" + userReviewedId, task, {headers: authHeader()})
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return error;
        });
}

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
            return error;
        });
};

const taskService = {
    getAllTasksByCompanyProjectId,
    getAllStatusZeroTasksByCompanyProjectId,
    getTaskById,
    createTask,
    addCompanyProjectToTask,
    addUserCreatedToTask,
    addUserWorkedToTask,
    addUserReviewedToTask,
    updateTask,
    deleteTask
};

export default taskService;