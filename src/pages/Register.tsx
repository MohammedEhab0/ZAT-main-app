// src/pages/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Keep useNavigate if Register is also used on a separate route
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RegistrationFields from "@/components/register/RegistrationFields";
import { registerUser } from "@/api/auth.api";
import { SuccessResponse, ErrorResponse } from "@/api/common.types";

import {
  registrationFormSchema,
  type RegistrationFormData,
} from "@/utils/registrationSchema";

// Helper function to check if a response is an error
function isErrorResponse(
  response: SuccessResponse<any> | ErrorResponse
): response is ErrorResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false
  );
}

// Define props for the Register component
interface RegisterProps {
  onRegistrationSuccess: () => void; // Function to call when registration is successful
}

export default function Register({ onRegistrationSuccess }: RegisterProps) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      countryCode: "", // Ensure this is handled by RegistrationFields for the select input
    },
  });

  const navigate = useNavigate(); // Keep navigate for potential future use or if Register is also used on a separate route

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (values: RegistrationFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const combinedPhoneNumber = `${values.countryCode || ""}${
        values.phoneNumber
      }`;

      const dataToSend = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: combinedPhoneNumber,
      };

      const response = await registerUser(dataToSend);

      if (response.success) {
        console.log("Registration successful:", response);
        setSuccessMessage(
          response.message || "Registration successful! You can now log in."
        );
        // Call the prop to switch to the login tab
        setTimeout(() => {
          // Add a small delay to show success message
          onRegistrationSuccess();
          // Optionally, reset the form after success
          form.reset();
        }, 1500);
      } else if (isErrorResponse(response)) {
        setErrorMessage(
          response.error?.message ||
            "An unexpected non-successful response occurred."
        );
      } else {
        setErrorMessage("An unknown response type encountered.");
      }
    } catch (caughtError: any) {
      let displayMessage = "An unexpected error occurred.";
      if (
        caughtError &&
        typeof caughtError === "object" &&
        "success" in caughtError &&
        caughtError.success === false &&
        "error" in caughtError &&
        caughtError.error &&
        typeof caughtError.error === "object" &&
        "message" in caughtError.error
      ) {
        displayMessage = caughtError.error.message;
      } else if (
        caughtError &&
        typeof caughtError === "object" &&
        "message" in caughtError
      ) {
        displayMessage = caughtError.message;
      }
      console.error("API call failed:", caughtError);
      setErrorMessage(displayMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-20 px-4 " id="register">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-transparent backdrop-blur-lg border-2 border-white rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#5300B3]">
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Start your Journey today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <RegistrationFields form={form} />

                {errorMessage && (
                  <p className="text-red-600 text-center text-sm mt-4">
                    {errorMessage}
                  </p>
                )}
                {successMessage && (
                  <p className="text-green-600 text-center text-sm mt-4">
                    {successMessage}
                  </p>
                )}

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className=" w-1/2 md:w-1/5 bg-[#5300B3] text-white hover:bg-[#ac6af7] focus:ring-2 focus:ring-[#ac6af7] focus:ring-opacity-50 md:text-2xl text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
