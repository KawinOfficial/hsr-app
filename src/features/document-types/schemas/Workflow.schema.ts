import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const WorkflowStepSchema = z.object({
  name: z.string(),
  type: z.string(),
  userId: z.string(),
  timeLimit: z.string().optional(),
});

export const WorkflowSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  workflowId: z.string(),
  description: z.string(),
  steps: z.array(WorkflowStepSchema),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  totalDocs: z.number().optional(),
});

export const WorkflowListSchema = z.object({
  data: z.array(WorkflowSchema),
  pagination: PaginationSchema,
});

export type Workflow = z.infer<typeof WorkflowSchema>;
export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;
export type WorkflowList = z.infer<typeof WorkflowListSchema>;
