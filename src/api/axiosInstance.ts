import axios from "axios";
import { ErrorResponse } from "./common.types";

const axiosInstance = axios.create({
  baseURL: "YOUR_BACKEND_API_BASE_URL_HERE", // IMPORTANT: Ensure this is your actual backend URL!
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- MODIFIED: Function to set up the response interceptor and RETURN its ID ---
// This function will be called from a React component where useAuth is valid.
export const setupAxiosInterceptors = (logoutFn: () => void): number => {
  const interceptorId = axiosInstance.interceptors.response.use(
    (response) => response, // If response is successful, just pass it through
    (error) => {
      if (error.response && error.response.data) {
        const errorData: ErrorResponse = error.response.data;

        if (errorData.error && errorData.error.code === "INVALID_TOKEN") {
          console.error(
            "Authentication token is invalid or expired. Logging out..."
          );
          // Clear token and user data from local storage
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          logoutFn(); // Call the logout function passed from AuthContext
        }
        return Promise.reject(errorData);
      }
      return Promise.reject({
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: error.message || "An unexpected network error occurred.",
        },
      } as ErrorResponse);
    }
  );
  return interceptorId; // Return the ID of the registered interceptor
};

export default axiosInstance; // Export the instance itself
