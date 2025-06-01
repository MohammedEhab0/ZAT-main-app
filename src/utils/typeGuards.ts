// src/utils/typeGuards.ts
import { SuccessResponse, ErrorResponse } from "@/api/common.types";

/**
 * Type guard to check if an API response is an ErrorResponse.
 * @param response The API response object.
 * @returns true if the response is an ErrorResponse, false otherwise.
 */
export function isErrorResponse(
  response: SuccessResponse<any> | ErrorResponse
): response is ErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false
  );
}
