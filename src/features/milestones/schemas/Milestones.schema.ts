import { z } from "zod";

export const MilestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  progress: z.number(),
  targetDate: z.string(),
  startDate: z.string(),
  completionDate: z.string().optional().nullable(),
  assignedTo: z.string(),
  priority: z.string(),
  budget: z.number(),
  actualCost: z.number(),
  deliverables: z.array(z.string()),
  dependencies: z.array(z.string()),
  project: z.string(),
  projectName: z.string(),
  phase: z.string(),
  department: z.string(),
  risks: z.array(
    z.object({
      description: z.string(),
      impact: z.string(),
      mitigation: z.string(),
    })
  ),
  approvers: z.array(z.string()),
  lastUpdated: z.string(),
  variance: z.number(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
