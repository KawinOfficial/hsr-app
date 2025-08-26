import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

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
});

export const DocumentListSchema = z.object({
  data: z.array(DocumentTypeSchema),
  pagination: PaginationSchema,
});

export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type DocumentList = z.infer<typeof DocumentListSchema>;
