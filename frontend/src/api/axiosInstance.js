import axios from "axios";

// Dynamic endpoint selection based on build environment
const API_BASE_URL =
    import.meta.env.PROD ?
    "https://your-backend-app-name.onrender.com/api" // Your future live Render URL
    :
    "/api"; // Keeps your local development proxy fully functional

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — inject JWT from localStorage
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle expired/invalid token
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("admin_token");
            window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;