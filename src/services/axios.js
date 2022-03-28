import * as axs from 'axios';

const API_URL = "/";

const api = axs.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;