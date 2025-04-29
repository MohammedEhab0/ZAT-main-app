
import { z } from "zod";

export const registrationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 16 && num <= 120;
  }, { message: "Age must be between 16 and 120" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  dob: z.date({
    required_error: "Please select a date of birth",
  }),
  education: z.string().min(1, { message: "Education is required" }),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
