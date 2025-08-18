import { z } from "zod";

export const DepartmentSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    headId: z.string(),
    teamMembers: z.number(),
    budget: z.number(),
    responsibilities: z.string(),
    status: z.enum(["active", "inactive", "suspended"]),
    location: z.string(),
  })
  .transform((data) => ({
    ...data,
    keyResponsibilities: data.responsibilities.split(", ") || [],
  }));

export const DepartmentFormSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  headId: z.string(),
  teamMembers: z.number(),
  budget: z.number(),
  responsibilities: z.string(),
  status: z.enum(["active", "inactive", "suspended"]),
  location: z.string(),
  keyResponsibilities: z
    .array(z.object({ id: z.string(), value: z.string() }))
    .optional(),
});

export const DepartmentListSchema = z.array(DepartmentSchema);

export type Department = z.infer<typeof DepartmentSchema>;
export type DepartmentForm = z.infer<typeof DepartmentFormSchema>;
export type DepartmentList = z.infer<typeof DepartmentListSchema>;
