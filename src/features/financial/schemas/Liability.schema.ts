import { PaginationSchema } from "@/types/pagination";
import { z } from "zod";
import { PaymentScheduleSchema } from "./PaymentSchedule.schema";

export const LiabilitySchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  description: z.string(),
  liabilityId: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  terms: z.string(),
  creditor: z.string(),
  interestRate: z.number().optional(),
  documentTypesId: z.string(),
  projectId: z.string(),
  priority: z.string(),
  paymentSchedules: z.array(PaymentScheduleSchema).optional(),
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

export const LiabilitiesListSchema = z.object({
  data: z.array(LiabilitySchema),
  pagination: PaginationSchema,
});

export type Liability = z.infer<typeof LiabilitySchema>;

export type LiabilitiesList = z.infer<typeof LiabilitiesListSchema>;
