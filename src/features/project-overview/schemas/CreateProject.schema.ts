import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  budget: z.number(),
  startDate: z.string(),
  completion: z.string(),
  location: z.string(),
  category: z.string(),
  manager: z.string(),
  riskLevel: z.string(),
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;
