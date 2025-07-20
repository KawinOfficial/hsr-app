import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  head: z.string(),
  memberCount: z.number(),
  budget: z.number(),
  responsibilities: z.array(z.string()),
  status: z.enum(["Active", "Inactive", "Suspended"]),
  location: z.string(),
});

export type Department = z.infer<typeof DepartmentSchema>;
