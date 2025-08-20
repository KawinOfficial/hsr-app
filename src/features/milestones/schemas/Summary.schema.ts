import { z } from "zod";

export const SummarySchema = z.object({
  completed: z.number(),
  totalBudget: z.number(),
  totalSpent: z.number(),
  critical: z.number(),
  delayed: z.number(),
  total: z.number(),
  overallProgress: z.number(),
});

export type Summary = z.infer<typeof SummarySchema>;
