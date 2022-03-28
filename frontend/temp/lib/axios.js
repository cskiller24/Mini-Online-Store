import 'axios' from 'axios';
import {getToken} from "./TokenManager";

const axiosClient = axios.create({
  baseURL: 'https://localhost:8000/api'
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getToken()}`
})

export default axiosClient
