import axios,  { AxiosResponse, AxiosError } from "axios";


const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  withCredentials: true
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data || error.message);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("refreshtoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;