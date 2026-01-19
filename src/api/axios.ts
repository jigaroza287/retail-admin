import axios from "axios";
import { queryClient } from "../lib/react-query";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      queryClient.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
