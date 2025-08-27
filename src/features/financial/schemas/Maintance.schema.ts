import { z } from "zod";

export const MaintanceSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  description: z.string(),
  date: z.string(),
  cost: z.number(),
  maintenanceBy: z.string().optional(),
  assetId: z.string().optional(),
});

export const MaintanceListSchema = z.array(MaintanceSchema);

export type Maintance = z.infer<typeof MaintanceSchema>;
export type MaintanceList = z.infer<typeof MaintanceListSchema>;
