import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // agar cookies / session bhejna ho
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
