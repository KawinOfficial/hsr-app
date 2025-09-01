import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  budget: z.number(),
  startDate: z.string(),
  targetDate: z.string(),
  location: z.string(),
  departmentId: z.string(),
  managerId: z.string(),
  riskLevel: z.string(),
  projectId: z.string(),
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;
