import axios from "axios";
import { toast } from "react-toastify";


const axiosCustom = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosCustom.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosCustom.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.message) {
            const messageError = error.response.data.message;
            toast.error(messageError);
        }
        return Promise.reject(error);
    }
);

export default axiosCustom;