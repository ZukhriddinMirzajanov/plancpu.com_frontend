import axios from "axios";
import authHeader from "./auth-header";

// const API_BASE_URL_PROD = 'https://www.softlatency.com/api/tasks';
const API_BASE_URL = 'http://localhost:5000/api/companyProject';

const getAllCompanyProjectsByCompanyId = (companyId) => {
    return axios
        .get(API_BASE_URL + "/getAllByCompanyId/" + companyId, { headers: authHeader() })
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

const getCompanyProjectById = (companyProjectId) => {
    return axios
        .get(API_BASE_URL + "/" + companyProjectId, { headers: authHeader() })
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

const createCompanyProject = (companyProjectData) => {
    return axios
        .post(API_BASE_URL + "/create", companyProjectData, { headers: authHeader() })
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
const updateCompanyProject = (id, updatedProjectCompany) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedProjectCompany, { headers: authHeader() })
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

const addCompanyToCompanyProject = (companyProjectId, companyId, companyProject) => {
    return axios
        .put(API_BASE_URL + "/" + companyProjectId + "/company/" + companyId, companyProject, {headers: authHeader()})
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
const deleteCompanyProject = (id) => {
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

const companyProjectService = {
    getAllCompanyProjectsByCompanyId,
    getCompanyProjectById,
    createCompanyProject,
    updateCompanyProject,
    addCompanyToCompanyProject,
    deleteCompanyProject
};

export default companyProjectService;