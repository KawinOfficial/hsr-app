import { AssetSchema } from "@/features/financial/schemas/Asset.schema";
import { LiabilitySchema } from "@/features/financial/schemas/Liability.schema";
import { PaymentSchema } from "@/features/financial/schemas/Payment.schema";
import { formatDate, formatDateWithTime } from "@/lib/format";
import { z } from "zod";

export const ApprovalSchema = z.object({
  id: z.string().optional().nullable(),
  updatedAt: z.string(),
  userIds: z.array(z.string()),
  currentType: z.string(),
  currentUserId: z.string().optional().nullable(),
  paymentId: z.string().optional().nullable(),
  assetId: z.string().optional().nullable(),
  liabilityId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
});

export const ApprovalDetailSchema = ApprovalSchema.extend({
  payment: PaymentSchema.optional().nullable(),
  asset: AssetSchema.optional().nullable(),
  liability: LiabilitySchema.optional().nullable(),
  currentUser: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
}).transform((data) => {
  const paymentItems = [
    { label: "Amount/Value (THB)", value: data.payment?.amount },
    {
      label: "Payment Date",
      value: formatDate(data.payment?.paymentDate ?? ""),
    },
    {
      label: "Created By",
      value: [data.currentUser?.firstName, data.currentUser?.lastName].join(
        " "
      ),
    },
    {
      label: "Last Updated",
      value: formatDateWithTime(data.payment?.updatedAt ?? ""),
    },
  ];
  const assetItems = [
    { label: "Amount/Value (THB)", value: data.asset?.amount },
    {
      label: "Purchase Date",
      value: formatDate(data.asset?.purchaseDate ?? ""),
    },
    {
      label: "Warranty Until",
      value: formatDate(data.asset?.warrantyDate ?? ""),
    },
    { label: "Location", value: data.asset?.location },
    {
      label: "Created By",
      value: [data.currentUser?.firstName, data.currentUser?.lastName].join(
        " "
      ),
    },
    {
      label: "Last Updated",
      value: formatDateWithTime(data.asset?.updatedAt ?? ""),
    },
  ];
  const liabilityItems = [
    { label: "Amount/Value (THB)", value: data.liability?.amount },
    { label: "Due Date", value: formatDate(data.liability?.dueDate ?? "") },
    { label: "Creditor", value: data.liability?.creditor },
    {
      label: "Created By",
      value: [data.currentUser?.firstName, data.currentUser?.lastName].join(
        " "
      ),
    },
    {
      label: "Last Updated",
      value: formatDateWithTime(data.liability?.updatedAt ?? ""),
    },
  ];
  const isPayment = !!data.paymentId;
  const isAsset = !!data.assetId;

  const approveItems = {
    name: isPayment
      ? data.payment?.name
      : isAsset
      ? data.asset?.name
      : data.liability?.name,
    approveId: isPayment
      ? data.payment?.paymentId
      : isAsset
      ? data.asset?.assetId
      : data.liability?.liabilityId,
    projectId: isPayment
      ? data.payment?.projectId
      : isAsset
      ? data.asset?.projectId
      : data.liability?.projectId,
    documentTypesId: isPayment
      ? data.payment?.documentTypesId
      : isAsset
      ? data.asset?.documentTypesId
      : data.liability?.documentTypesId,
    currentType: data.currentType,
    priority: isPayment
      ? data.payment?.priority
      : data.liability?.priority || "",
    description: isPayment
      ? data.payment?.description
      : isAsset
      ? data.asset?.description
      : data.liability?.description,
    itemsDetail: isPayment
      ? paymentItems
      : isAsset
      ? assetItems
      : liabilityItems,
  };

  return {
    ...data,
    approveItems,
  };
});

export const ApprovalListSchema = z.array(ApprovalDetailSchema);

export type Approval = z.infer<typeof ApprovalSchema>;
export type ApprovalDetail = z.infer<typeof ApprovalDetailSchema>;
export type ApprovalList = z.infer<typeof ApprovalListSchema>;
