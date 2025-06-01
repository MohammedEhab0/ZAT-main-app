// src/api/axiosInstance.ts

import axios from "axios";
import { ErrorResponse } from "./common.types"; // Assuming this file exists and is correct

const axiosInstance = axios.create({
  // *** IMPORTANT: REPLACE THIS WITH YOUR ACTUAL BACKEND API BASE URL ***
  // Example: 'http://localhost:5000/api' or 'https://api.yourdomain.com/api'
  baseURL: "YOUR_BACKEND_API_BASE_URL_HERE",
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage (where we saved it after login)
    const token = localStorage.getItem("authToken");
    if (token) {
      // Add the Authorization header for protected routes
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like token expiry)
axiosInstance.interceptors.response.use(
  (response) => response, // If response is successful, just pass it through
  (error) => {
    // If there's an error response from the server
    if (error.response && error.response.data) {
      const errorData: ErrorResponse = error.response.data;

      // Example: If the backend sends an "INVALID_TOKEN" error,
      // you might want to log the user out automatically.
      if (errorData.error && errorData.error.code === "INVALID_TOKEN") {
        console.error(
          "Authentication token is invalid or expired. Logging out..."
        );
        // Clear token and user data from local storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        // Redirect to login page (you might need to use a hook or history object if outside a component)
        // window.location.href = '/login'; // Use with caution, better to use navigate hook
      }
      // Reject with the backend's structured error object
      return Promise.reject(errorData);
    }
    // If it's a network error or another type of Axios error not from the backend
    return Promise.reject({
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error.message || "An unexpected network error occurred.",
      },
    } as ErrorResponse); // Ensure it conforms to ErrorResponse type
  }
);

export default axiosInstance;
