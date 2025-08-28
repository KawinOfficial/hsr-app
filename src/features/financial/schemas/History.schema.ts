import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const HistorySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  paymentId: z.string().optional().nullable(),
  assetId: z.string().optional().nullable(),
  liabilityId: z.string().optional().nullable(),
  action: z.string(),
  createdBy: z.string(),
  email: z.string(),
  description: z.string().optional(),
});

export const HistoryListSchema = z.object({
  data: z.array(HistorySchema),
  pagination: PaginationSchema,
});

export type History = z.infer<typeof HistorySchema>;
export type HistoryList = z.infer<typeof HistoryListSchema>;
