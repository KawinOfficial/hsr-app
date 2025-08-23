import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const MilestoneSchema = z
  .object({
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
  })
  .transform((data) => ({
    ...data,
    progress: data.actualCost ? (data.actualCost / data.budget) * 100 : 0,
  }));

export const MilestoneListSchema = z.object({
  data: z.array(MilestoneSchema),
  pagination: PaginationSchema,
});

export const MilestoneFormSchema = z.object({
  milestoneId: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  targetDate: z.string(),
  startDate: z.string(),
  priority: z.string(),
  phase: z.string(),
  budget: z.number(),
  actualCost: z.number().optional(),
  deliverables: z.array(
    z.object({
      name: z.string(),
    })
  ),
  projectId: z.string().nullable().optional(),
  id: z.string().optional(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
export type MilestoneList = z.infer<typeof MilestoneListSchema>;
export type MilestoneForm = z.infer<typeof MilestoneFormSchema>;
