import axios from "axios";
import { queryClient } from "../lib/react-query";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url?.includes("/admin/auth")
    ) {
      localStorage.removeItem("token");
      queryClient.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
