import { z } from "zod";

export const LiabilitySchema = z.object({
  id: z.string(),
  type: z.string(),
  creditor: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  status: z.string(),
  description: z.string(),
  project: z.string(),
  priority: z.string(),
  terms: z.string(),
});

export const LiabilitiesArraySchema = z.array(LiabilitySchema);

export type Liability = z.infer<typeof LiabilitySchema>;
