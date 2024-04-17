import { z } from "zod";
import { passwordValidation } from "@/schema/signUpSchema";

export const signInSchema = z.object({
  identifier: z.string(),
  password: passwordValidation,
});
