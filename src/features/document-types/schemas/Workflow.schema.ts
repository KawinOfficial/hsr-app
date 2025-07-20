import { z } from "zod";

export const WorkflowStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  assignedRole: z.string(),
  assignedUsers: z.array(z.string()),
  timeLimit: z.string(),
  required: z.boolean(),
  conditions: z.array(z.string()),
});

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  active: z.boolean(),
  steps: z.array(WorkflowStepSchema),
  averageCompletionTime: z.string(),
  successRate: z.number(),
  totalExecutions: z.number(),
  createdBy: z.string(),
  createdDate: z.string(),
  lastModified: z.string(),
});

export const WorkflowTemplatesSchema = z.array(WorkflowSchema);

export type Workflow = z.infer<typeof WorkflowSchema>;
