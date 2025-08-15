import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone is required"),
    nationality: z.string().min(1, "Nationality is required"),
    otherNationality: z.string().optional(),
    employeeId: z.string().min(1, "Employee ID is required"),
    departmentId: z.string().min(1, "Department is required"),
    roleId: z.string().min(1, "Position is required"),
    reportingTo: z.string().min(1, "Reporting to is required"),
    workLocation: z.string().min(1, "Work location is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean(),
    agreePrivacy: z.boolean(),
    agreeCode: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
