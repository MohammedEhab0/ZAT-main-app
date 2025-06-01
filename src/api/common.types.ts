// src/api/types/common.types.ts

// Generic Success Response structure from your backend
export interface SuccessResponse<T = any> {
  success: true; // <--- THIS MUST BE 'true' (literal boolean)
  message?: string; // Optional success message
  data: T;
}

// Generic Error Response structure from your backend
export interface ErrorResponse {
  success: false; // <--- THIS MUST BE 'false' (literal boolean)
  error: {
    code: string; // e.g., "EMAIL_ALREADY_EXISTS", "INVALID_CREDENTIALS"
    message: string; // Human-readable error message
    field?: string; // Optional: field causing the error (e.g., "email", "phoneNumber")
  };
}

// You can use this if you want to explicitly type your promises
export type ApiResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>;
