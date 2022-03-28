import axiosInstance from './axios';
import {userState} from '../store'
const token = localStorage.getItem("token");
const setupInterceptors = (_store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (!!token) {
                config.headers["Authorization"] = "Bearer " + token; // for Node.js Express back-end
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

export default setupInterceptors;