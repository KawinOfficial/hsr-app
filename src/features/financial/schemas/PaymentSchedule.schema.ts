import z from "zod";

export const PaymentScheduleSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  description: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  liabilityId: z.string(),
});

export type PaymentSchedule = z.infer<typeof PaymentScheduleSchema>;
