import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const TotalDocumentSchema = z.object({
  paymentCount: z.number(),
  assetCount: z.number(),
  liabilityCount: z.number(),
  totalCount: z.number(),
});

export type TotalDocument = z.infer<typeof TotalDocumentSchema>;

export const DocumentTypeSchema = z.object({
  id: z.string().optional(),
  documentId: z.string(),
  name: z.string(),
  categoryId: z.string(),
  description: z.string(),
  workflowId: z.string(),
  isActive: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  totalDocuments: TotalDocumentSchema.optional(),
});

export const DocumentListSchema = z.object({
  data: z.array(DocumentTypeSchema),
  pagination: PaginationSchema,
});

export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type DocumentList = z.infer<typeof DocumentListSchema>;
