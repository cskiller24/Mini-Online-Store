import axios from "axios";
import useAuth from "../hooks/useAuth";

const { token } = useAuth;

export default axios.create({
  baseURL: "http://localhost:8000/api",
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
});
