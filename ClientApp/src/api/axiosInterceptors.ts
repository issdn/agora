import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token ? token : ""}`;
  return config;
});
