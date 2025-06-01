import { z } from "zod";

export const registrationFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be  10 digits" })
    .max(10, { message: "Phone number must be  10 digits" }),

  email: z.string().email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  countryCode: z.string().min(1, { message: "CountryCode is required" }),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
