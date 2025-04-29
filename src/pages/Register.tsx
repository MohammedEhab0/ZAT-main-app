
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import RegistrationFields from "@/components/register/RegistrationFields";
import SubscriptionPlans from "@/components/register/SubscriptionPlans";
import { registrationFormSchema, type RegistrationFormData } from "@/utils/registrationSchema";

export default function Register() {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      age: "",
      phone: "",
      gender: "",
      email: "",
      password: "",
      education: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: RegistrationFormData) => {
    setIsSubmitting(true);
    console.log("Form values:", values);
    // Here you would implement the actual registration process
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to login or dashboard after successful registration
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />
      
      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
              <CardDescription className="text-center">Start your skill assessment journey today</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <RegistrationFields form={form} />
                  <SubscriptionPlans />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
