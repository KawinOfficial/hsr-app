import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";

export const AttachmentSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string().optional(),
  uploadDate: z.string().optional(),
});

export const PaymentSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  paymentId: z.string().optional(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  paymentDate: z.string(),
  priority: z.string(),
  vendor: z.string(),
  documentTypesId: z.string(),
  createdBy: z.string().optional(),
  projectId: z.string(),
  tax: z.number().optional(),
  vat: z.number().optional(),
  attachments: z.array(AttachmentSchema).optional(),
  status: z.string().optional(),
  userCreatedBy: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
    })
    .optional(),
});

export const PaymentListSchema = z.object({
  data: z.array(PaymentSchema),
  pagination: PaginationSchema,
});

export type Payment = z.infer<typeof PaymentSchema>;
export type PaymentList = z.infer<typeof PaymentListSchema>;
