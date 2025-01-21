import { object, string } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})


export const registerSchema = object({
  email: string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email"),
  username: string({ required_error: "Username is required" })
  .min(1, "Username is required"),
  name: string().min(2, "Name must be more than 2 characters"),
  password: string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters"),
  passwordRepeat: string({ required_error: "Password is required" })
  .min(1, "Password is required")
  .min(8, "Password must be more than 8 characters")
  .max(32, "Password must be less than 32 characters")
}).refine((data) => data.password === data.passwordRepeat, {
  message: "Passwords don't match",
  path: ["passwordRepeat"]
})
