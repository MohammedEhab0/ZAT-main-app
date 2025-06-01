import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { RegistrationFormData } from "@/utils/registrationSchema";

interface RegistrationFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
}

const RegistrationFields = ({ form }: RegistrationFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frist Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="countryCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country Code</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={typeof field.value === "string" ? field.value : ""}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select country code" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="+1">United States (+1)</SelectItem>
                <SelectItem value="+44">United Kingdom (+44)</SelectItem>
                <SelectItem value="+91">India (+91)</SelectItem>
                <SelectItem value="+61">Australia (+61)</SelectItem>
                <SelectItem value="+81">Japan (+81)</SelectItem>
                <SelectItem value="+49">Germany (+49)</SelectItem>
                <SelectItem value="+33">France (+33)</SelectItem>
                <SelectItem value="+86">China (+86)</SelectItem>
                <SelectItem value="+7">Russia (+7)</SelectItem>
                <SelectItem value="+27">South Africa (+27)</SelectItem>
                <SelectItem value="+82">South Korea (+82)</SelectItem>
                <SelectItem value="+39">Italy (+39)</SelectItem>
                <SelectItem value="+34">Spain (+34)</SelectItem>
                <SelectItem value="+20">Egypt (+20)</SelectItem>
                <SelectItem value="+966">Saudi Arabia (+966)</SelectItem>
                <SelectItem value="+971">
                  United Arab Emirates (+971)
                </SelectItem>
                <SelectItem value="+212">Morocco (+212)</SelectItem>
                <SelectItem value="+213">Algeria (+213)</SelectItem>
                <SelectItem value="+216">Tunisia (+216)</SelectItem>
                <SelectItem value="+962">Jordan (+962)</SelectItem>
                <SelectItem value="+961">Lebanon (+961)</SelectItem>
                <SelectItem value="+965">Kuwait (+965)</SelectItem>
                <SelectItem value="+973">Bahrain (+973)</SelectItem>
                <SelectItem value="+968">Oman (+968)</SelectItem>
                <SelectItem value="+974">Qatar (+974)</SelectItem>
                {/* Add more country codes as needed */}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder=" (555) 123-4567" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="your.email@example.com"
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
              <Input type="password" placeholder="••••••••" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RegistrationFields;
