import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(5, { message: "Username must be at least of 5 characters long." })
  .max(14, { message: "Username should not be more than 14 characters long" })
  .regex(/^[a-zA-Z][a-zA-Z0-9_.]{4,13}$/, {
    message: "Username must start with a letter",
  });

export const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email address." });

export const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    {
      message: "Enter a strong password.",
    }
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
