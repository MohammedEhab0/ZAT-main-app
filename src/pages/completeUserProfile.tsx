// src/pages/CompleleteForm.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import CompleteFormFields from "@/components/register/completeUserProfileFields";
import { completeUserProfile } from "@/api/auth.api";
import { SuccessResponse, ErrorResponse } from "@/api/common.types";
import {
  completeFormSchema,
  type CompleteFormData,
} from "@/utils/completeUserProfileSchema";
import { isErrorResponse } from "@/utils/typeGuards";

export default function CompleleteForm() {
  const form = useForm<CompleteFormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: {
      age: 0,
      gender: "",
      education: "",
      birthDate: undefined, // Still undefined, as DatePicker expects Date | undefined
    },
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (values: CompleteFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    console.log("Form values submitted (pre-API call):", values); // values.birthDate will be a Date object here

    try {
      const currentUserId = "YOUR_ACTUAL_USER_ID_HERE"; // IMPORTANT: Fetch this from your auth!

      const apiPayload = {
        userId: currentUserId,
        age: values.age.toString(), // Convert number to string for the API
        gender: values.gender,
        // --- CRITICAL CHANGE HERE ---
        // Convert the Date object to "YYYY-MM-DD" string for the API
        birthDate: values.birthDate
          ? values.birthDate.toISOString().split("T")[0]
          : undefined,
        // --- END CRITICAL CHANGE ---
        education: values.education,
      };

      console.log("Sending to API:", apiPayload);

      const response = await completeUserProfile(apiPayload);

      if (response.success) {
        console.log("Profile completion successful:", response);
        setSuccessMessage(
          response.message || "Profile completed successfully!"
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else if (isErrorResponse(response)) {
        setErrorMessage(
          response.error?.message ||
            "An unexpected error occurred during profile completion."
        );
      } else {
        setErrorMessage(
          "An unknown response type encountered during profile completion."
        );
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
      } else if (caughtError instanceof Error) {
        displayMessage = caughtError.message;
      } else {
        displayMessage = String(caughtError);
      }
      console.error("Profile completion API call failed:", caughtError);
      setErrorMessage(displayMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-b from-white to-[#ac6af7] ">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-center">
                Provide a few more details to get started on your skill
                assessment journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <CompleteFormFields form={form} />
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
                  <Button
                    type="submit"
                    className="w-full bg-[#5300B3] text-white hover:bg-[#ac6af7] focus:ring-2 focus:ring-[#ac6af7] focus:ring-opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Complete Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
