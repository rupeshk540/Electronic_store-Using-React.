import axios from "axios";
import { BASE_URL } from "./HelperService";
import { 
  doLoginLocalStorage, 
  doLogoutFromLocalStorage, 
  getTokenFromLocalStorage 
} from "../auth/HelperAuth";

// Public Axios instance
export const publicAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 👈 important for cookie-based refresh
});

// Private Axios instance
export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 👈 allow sending cookies automatically
});

// Attach JWT (access token) to every private request
privateAxios.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-refresh token when access token expires
privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 👇 Request new access token using refresh token from cookie
        const response = await publicAxios.post("/auth/regenerate-token");

        if (response?.data?.token) {
          doLoginLocalStorage(response.data);

          // Retry the failed request with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return privateAxios(originalRequest);
        } else {
          doLogoutFromLocalStorage();
        }
      } catch (refreshError) {
        doLogoutFromLocalStorage();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
