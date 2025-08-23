import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  riskLevel: z.string(),
  startDate: z.string(),
  targetDate: z.string(),
  location: z.string(),
  departmentId: z.string().nullable(),
  managerId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budget: z.number(),
  spent: z.number(),
  progress: z.number(),
  variance: z.number(),
  milestones: z.object({
    total: z.number(),
    completed: z.number(),
  }),
  team: z.number(),
});

export const ProjectListSchema = z.object({
  data: z.array(ProjectSchema),
  pagination: PaginationSchema,
});

export type ProjectList = z.infer<typeof ProjectListSchema>;
export type Project = z.infer<typeof ProjectSchema>;
