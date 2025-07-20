import { z } from "zod";

export const PaymentSchema = z.object({
  id: z.string(),
  type: z.string(),
  vendor: z.string(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
  description: z.string(),
  project: z.string(),
  approvedBy: z.string(),
  paymentMethod: z.string(),
  reference: z.string(),
});

export const PaymentsArraySchema = z.array(PaymentSchema);

export type Payment = z.infer<typeof PaymentSchema>;
