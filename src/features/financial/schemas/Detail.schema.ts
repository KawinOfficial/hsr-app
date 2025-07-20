import { z } from "zod";

// Base schemas for common structures
export const ApprovalHistorySchema = z.object({
  date: z.string(),
  action: z.string(),
  user: z.string(),
  role: z.string(),
  comment: z.string(),
});

export const AttachmentSchema = z.object({
  name: z.string(),
  size: z.string(),
  uploadDate: z.string(),
  type: z.string(),
});

// Payment-specific schemas
export const BankDetailsSchema = z.object({
  bankName: z.string(),
  accountNumber: z.string(),
  swiftCode: z.string(),
  beneficiary: z.string(),
});

export const TaxInfoSchema = z.object({
  vatRate: z.number(),
  vatAmount: z.number(),
  withholdingTax: z.number(),
  netAmount: z.number(),
});

// Asset-specific schemas
export const MaintenanceHistorySchema = z.object({
  date: z.string(),
  type: z.string(),
  description: z.string(),
  cost: z.number(),
  technician: z.string(),
});

export const SpecificationsSchema = z.object({
  manufacturer: z.string(),
  model: z.string(),
  serialNumber: z.string(),
  capacity: z.string(),
  powerRating: z.string(),
});

export const InsuranceSchema = z.object({
  provider: z.string(),
  policyNumber: z.string(),
  coverage: z.number(),
  expiryDate: z.string(),
});

// Liability-specific schemas
export const PaymentScheduleSchema = z.object({
  date: z.string(),
  amount: z.number(),
  status: z.string(),
  description: z.string(),
});

export const ContractTermsSchema = z.object({
  interestRate: z.string(),
  penaltyRate: z.string(),
  gracePeriod: z.string(),
  collateral: z.string(),
});

// Enhanced Details Schema
export const EnhancedDetailsSchema = z.object({
  approvalHistory: z.array(ApprovalHistorySchema),
  attachments: z.array(AttachmentSchema),
  bankDetails: BankDetailsSchema.optional(),
  taxInfo: TaxInfoSchema.optional(),
  maintenanceHistory: z.array(MaintenanceHistorySchema).optional(),
  specifications: SpecificationsSchema.optional(),
  insurance: InsuranceSchema.optional(),
  paymentSchedule: z.array(PaymentScheduleSchema).optional(),
  contractTerms: ContractTermsSchema.optional(),
});

export type EnhancedDetails = z.infer<typeof EnhancedDetailsSchema>;
export type ApprovalHistory = z.infer<typeof ApprovalHistorySchema>;
export type Attachment = z.infer<typeof AttachmentSchema>;
export type BankDetails = z.infer<typeof BankDetailsSchema>;
export type TaxInfo = z.infer<typeof TaxInfoSchema>;
export type MaintenanceHistory = z.infer<typeof MaintenanceHistorySchema>;
export type Specifications = z.infer<typeof SpecificationsSchema>;
export type Insurance = z.infer<typeof InsuranceSchema>;
export type PaymentSchedule = z.infer<typeof PaymentScheduleSchema>;
export type ContractTerms = z.infer<typeof ContractTermsSchema>;
