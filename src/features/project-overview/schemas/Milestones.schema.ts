import { z } from "zod";

export const MilestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  progress: z.number(),
  targetDate: z.string(),
  startDate: z.string(),
  completionDate: z.string().optional(),
  assignedTo: z.string(),
  priority: z.string(),
  budget: z.number(),
  actualCost: z.number(),
  deliverables: z.array(z.string()),
  dependencies: z.array(z.string()),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
