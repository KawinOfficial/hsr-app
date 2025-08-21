import { z } from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Project description is required"),
  status: z.string().min(1, "Project status is required"),
  budget: z.number().min(0, "Budget must be a positive number"),
  startDate: z.string().min(1, "Start date is required"),
  completion: z.string().min(1, "Completion date is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  manager: z.string().min(1, "Project manager is required"),
  riskLevel: z.string().min(1, "Risk level is required"),
});

export type CreateProject = z.infer<typeof CreateProjectSchema>;
