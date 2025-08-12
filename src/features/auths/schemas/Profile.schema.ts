import { z } from "zod";

const EmployeeInfoSchema = z.object({
  id: z.string(),
  userId: z.string(),
  employeeId: z.string(),
  department: z.string(),
  position: z.string(),
  managerName: z.string(),
  workLocation: z.string(),
});

export const ProfileSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  nationality: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  employeeInfo: EmployeeInfoSchema.nullable(),
  status: z.string(),
});

export type EmployeeInfo = z.infer<typeof EmployeeInfoSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
