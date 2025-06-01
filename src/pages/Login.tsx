// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Keep useNavigate for potential future use or if Login is also used on a separate route
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUser } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { SuccessResponse, ErrorResponse } from "@/api/common.types";

// --- ADD THIS HELPER TYPE GUARD FUNCTION ---
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
// --- END HELPER TYPE GUARD FUNCTION ---

const formSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email or Phone Number is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const navigate = useNavigate(); // Keep navigate, but we'll use it conditionally
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Added for displaying success on the same tab

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null); // Clear previous success messages

    try {
      const response = await loginUser({
        identifier: values.identifier,
        password: values.password,
      });

      if (response.success) {
        console.log("Login successful:", response);

        if (response.data) {
          login(
            {
              userId: response.data.userId,
              userType: response.data.userType,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              planType: response.data.planType,
              hasCompleteProfile: response.data.hasCompleteProfile,
            },
            response.data.token
          );

          setSuccessMessage("Login successful! Redirecting..."); // Display success message

          // --- Role-Based Navigation Logic (now explicitly navigates away from Index) ---
          // This logic will only trigger if the Login component is used outside of the Index page,
          // or if you explicitly want to redirect after login even when on the Index page.
          // If you want to stay on the Index page after login, remove these navigate calls.
          if (response.data.userType === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else if (
            response.data.userType === "basic" ||
            response.data.userType === "premium"
          ) {
            // Check for profile completion for basic/premium users
            if (!response.data.hasCompleteProfile) {
              navigate("/complete-profile", { replace: true });
            } else {
              navigate("/dashboard", { replace: true }); // General user dashboard
            }
          } else {
            // Fallback for any unexpected userType, or if profile isn't complete
            if (!response.data.hasCompleteProfile) {
              navigate("/complete-profile", { replace: true });
            } else {
              navigate("/dashboard", { replace: true }); // Default user dashboard
            }
          }
          // --- End Role-Based Navigation ---
        } else {
          setErrorMessage("Login successful, but user data was missing.");
        }
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
    <div className="pb-20 px-4" id="login">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-transparent backdrop-blur-lg border-2 border-white rounded-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#5300B3]">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Login to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="your.email@example.com or +1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <div className="text-sm text-right"></div>
                    </FormItem>
                  )}
                />

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
                    className="w-1/2 md:w-1/5 bg-[#5300B3] text-white hover:bg-[#ac6af7] focus:ring-2 focus:ring-[#ac6af7] focus:ring-opacity-50 md:text-2xl text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </div>
                <CardFooter className="flex justify-center -mb-8">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
