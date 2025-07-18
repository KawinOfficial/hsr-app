import { z } from "zod";

export const MilestoneSchema = z.object({
  completed: z.number(),
  total: z.number(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  progress: z.number(),
  budget: z.number(),
  spent: z.number(),
  variance: z.number(),
  startDate: z.string(),
  completion: z.string(),
  location: z.string(),
  category: z.string(),
  manager: z.string(),
  riskLevel: z.string(),
  team: z.number(),
  milestones: MilestoneSchema,
});

export const ProjectsSchema = z.array(ProjectSchema);

export type ProjectList = z.infer<typeof ProjectsSchema>;
export type Project = z.infer<typeof ProjectSchema>;
