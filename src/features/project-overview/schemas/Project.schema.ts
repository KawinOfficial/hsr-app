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
});

export const ProjectListSchema = z.object({
  data: z.array(ProjectSchema),
  pagination: PaginationSchema,
});

export type ProjectList = z.infer<typeof ProjectListSchema>;
export type Project = z.infer<typeof ProjectSchema>;
