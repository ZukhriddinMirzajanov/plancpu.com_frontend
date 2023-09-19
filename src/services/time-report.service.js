import axios from "axios";
import authHeader from "./auth-header";

const API_BASE_URL = "https://www.softlatency.com/api/time-reports";
// const API_BASE_URL = 'http://localhost:5000/api/time-reports';

const getAllTimeReportsByCompanyId = (companyId) => {
    return axios
        .get(API_BASE_URL + "/companyId/" + companyId, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((err) => {
            return err;
        });
};

const getAllTimeReportsByUserId = (id) => {
    return axios
        .get(API_BASE_URL + "/userId/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((err) => {
            return err;
        });
};

const getTimeReportById = (id) => {
    return axios
        .get(API_BASE_URL + "/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
};

const createTimeReport = (timeReportData) => {
    return axios
        .post(API_BASE_URL + "/create", timeReportData, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
};

const addUserToTimeReport = (timeReport, userId) => {
    return axios
        .put(API_BASE_URL + "/" + timeReport.id + "/user/" + userId, timeReport, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
}

const updateTimeReport = (id, updatedTimeReport) => {
    return axios
        .put(API_BASE_URL + "/update/" + id, updatedTimeReport, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
};
const deleteTimeReport = (id) => {
    return axios
        .delete(API_BASE_URL + "/delete/" + id, { headers: authHeader() })
        .then((response) => {
            if (response.data) {
                return response;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
};

const timeReportService = {
    getAllTimeReportsByCompanyId,
    getAllTimeReportsByUserId,
    getTimeReportById,
    createTimeReport,
    addUserToTimeReport,
    updateTimeReport,
    deleteTimeReport,
};

export default timeReportService;
