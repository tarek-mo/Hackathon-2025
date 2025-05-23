import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
  name: z.string().nonempty("Name is required"),
  username: z.string().nonempty("Username is required"),
});

// Define the form values type
export type SignupValidation = z.infer<typeof signupFormSchema>;
