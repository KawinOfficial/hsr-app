import { z } from "zod";
import { MaintanceListSchema } from "./Maintance.schema";
import { PaginationSchema } from "@/types/pagination";

export const AssetSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  assetId: z.string(),
  description: z.string(),
  amount: z.number(),
  purchaseDate: z.string(),
  location: z.string(),
  warrantyDate: z.string().optional().nullable(),
  documentTypesId: z.string().optional(),
  projectId: z.string().optional(),
  maintances: MaintanceListSchema.optional().nullable(),
  createdBy: z.string().optional(),
  status: z.string().optional(),
  remark: z.string().optional().nullable(),
  canDelete: z.boolean().optional(),
  userCreatedBy: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
    })
    .optional(),
});

export const AssetsListSchema = z.object({
  data: z.array(AssetSchema),
  pagination: PaginationSchema,
});
export type Asset = z.infer<typeof AssetSchema>;
export type AssetsList = z.infer<typeof AssetsListSchema>;
