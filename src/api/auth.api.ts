// src/api/auth.api.ts

import axiosInstance from "./axiosInstance";
import { SuccessResponse, ErrorResponse } from "./common.types"; // Make sure this path is correct and common.types.ts is as discussed!

// --- User Registration API Call ---
export const registerUser = async (
  userData: any
): Promise<SuccessResponse | ErrorResponse> => {
  // This return type is crucial
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    // Explicitly assert that if the call is successful, the data conforms to SuccessResponse
    return response.data as SuccessResponse;
  } catch (rawError: any) {
    // The interceptor should ideally throw an ErrorResponse.
    // We'll throw it as an ErrorResponse, or a default one if structure is unexpected.
    if (rawError && rawError.error) {
      throw rawError as ErrorResponse; // Assume it's our structured ErrorResponse
    }
    // Fallback for unexpected errors (e.g., network issues that don't go through interceptor's full formatting)
    throw {
      success: false,
      error: {
        code: "UNEXPECTED_API_ERROR",
        message:
          rawError.message ||
          "An unknown error occurred during registration API call.",
      },
    } as ErrorResponse;
  }
};

// --- User Login API Call ---
export const loginUser = async (
  credentials: any
): Promise<SuccessResponse | ErrorResponse> => {
  // This return type is crucial
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    // Explicitly assert that if the call is successful, the data conforms to SuccessResponse
    return response.data as SuccessResponse;
  } catch (rawError: any) {
    if (rawError && rawError.error) {
      throw rawError as ErrorResponse; // Assume it's our structured ErrorResponse
    }
    throw {
      success: false,
      error: {
        code: "UNEXPECTED_API_ERROR",
        message:
          rawError.message ||
          "An unknown error occurred during login API call.",
      },
    } as ErrorResponse;
  }
};

// --- Complete User Profile API Call ---
export const completeUserProfile = async (
  profileData: any
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const response = await axiosInstance.put(
      "/user/complete-profile",
      profileData
    );
    return response.data as SuccessResponse;
  } catch (rawError: any) {
    if (rawError && rawError.error) {
      throw rawError as ErrorResponse;
    }
    throw {
      success: false,
      error: {
        code: "UNEXPECTED_API_ERROR",
        message:
          rawError.message ||
          "An unknown error occurred during profile completion API call.",
      },
    } as ErrorResponse;
  }
};
