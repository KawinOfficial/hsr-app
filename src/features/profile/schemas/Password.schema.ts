import { z } from "zod";

export const PasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export type Password = z.infer<typeof PasswordSchema>;
