import { z } from "zod";

export const MilestoneSchema = z.object({
  id: z.string(),
  milestoneId: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  targetDate: z.string(),
  startDate: z.string(),
  priority: z.string(),
  phase: z.string(),
  budget: z.number(),
  actualCost: z.number().nullable(),
  deliverables: z.array(
    z.object({
      name: z.string(),
    })
  ),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  projectId: z.string().nullable().optional(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
