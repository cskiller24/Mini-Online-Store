import axios from "axios";
const BASE_URL = "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// axiosClient.interceptors.request.use((config) => {
//   const { token } = useAuth();
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default axiosClient;
