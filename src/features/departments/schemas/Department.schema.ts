import { z } from "zod";

export const DepartmentSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    headId: z.string(),
    teamMembers: z.number(),
    budget: z.number(),
    responsibilities: z.string(),
    status: z.enum(["Active", "Inactive", "Suspended"]),
    location: z.string(),
  })
  .transform((data) => ({
    ...data,
    responsibilities: data.responsibilities.split(", "),
  }));

export const DepartmentListSchema = z.array(DepartmentSchema);

export type Department = z.infer<typeof DepartmentSchema>;
export type DepartmentList = z.infer<typeof DepartmentListSchema>;
