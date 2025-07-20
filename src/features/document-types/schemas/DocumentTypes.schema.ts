import { z } from "zod";

export const DocumentTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  active: z.boolean(),
  workflowId: z.string(),
  workflowName: z.string(),
  requiredFields: z.array(z.string()),
  approvalLevels: z.number(),
  averageProcessingTime: z.string(),
  totalDocuments: z.number(),
  pendingDocuments: z.number(),
  createdBy: z.string(),
  createdDate: z.string(),
  lastModified: z.string(),
  permissions: z.array(z.string()),
});

export const DocumentTypesSchema = z.array(DocumentTypeSchema);

export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type DocumentTypes = z.infer<typeof DocumentTypesSchema>;
