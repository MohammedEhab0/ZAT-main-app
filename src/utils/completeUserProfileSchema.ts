// src/utils/completeUserProfileSchema.ts
import { z } from "zod";

export const completeFormSchema = z.object({
  age: z.coerce
    .number()
    .int() // Ensures the number is an integer
    .min(16, { message: "Age must be at least 16" })
    .max(120, { message: "Age must be at most 120" }),

  gender: z.enum(["", "male", "female", "other", "prefer-not-to-say"], {
    required_error: "Gender is required",
    invalid_type_error: "Please select a valid gender",
  }),

  // --- CRITICAL CHANGE HERE ---
  // 'birthDate' now solely expects a Date object from the date picker for validation.
  // The transformation to "YYYY-MM-DD" string will happen manually before the API call.
  birthDate: z.date({
    // <--- REMOVED .transform()
    required_error: "Please select a date of birth",
  }),
  // --- END CRITICAL CHANGE ---

  education: z.string().min(1, { message: "Education is required" }),

  // --- IMPORTANT: Consider adding these if your API expects them for a complete profile ---
  // countryCode: z.string().min(1, { message: "Country Code is required" }).optional(),
  // phoneNumber: z.string()
  //   .min(10, { message: "Phone number must be 10 digits" })
  //   .max(10, { message: "Phone number must be 10 digits" })
  //   .optional(),
  // firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).optional(),
  // lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).optional(),
});

// Now, CompleteFormData['birthDate'] will be type `Date`.
export type CompleteFormData = z.infer<typeof completeFormSchema>;
