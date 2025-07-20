import { z } from "zod";

export const AssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  value: z.number(),
  depreciation: z.number(),
  currentValue: z.number(),
  location: z.string(),
  condition: z.string(),
  lastMaintenance: z.string(),
  nextMaintenance: z.string(),
  project: z.string(),
  supplier: z.string(),
  warrantyUntil: z.string(),
});

export const AssetsArraySchema = z.array(AssetSchema);

export type Asset = z.infer<typeof AssetSchema>;
