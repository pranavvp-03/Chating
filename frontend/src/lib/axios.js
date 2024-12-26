import axios from "axios";
import { create } from "zustand"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true
})

// export default axiosInstance


console.log(axiosInstance,"dsdsdsds");