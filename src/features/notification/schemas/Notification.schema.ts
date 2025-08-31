import { z } from "zod";

export const NotificationSchema = z.object({
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

export const BaseNotificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  priority: z.string().optional().nullable(),
});

export const NotificationDetailSchema = NotificationSchema.extend({
  payment: BaseNotificationSchema.optional().nullable(),
  asset: BaseNotificationSchema.optional().nullable(),
  liability: BaseNotificationSchema.optional().nullable(),
  currentUser: z
    .object({
      firstName: z.string(),
      lastName: z.string(),
    })
    .optional()
    .nullable(),
});

export const NotificationListSchema = z.array(NotificationDetailSchema);

export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationDetail = z.infer<typeof NotificationDetailSchema>;
export type NotificationList = z.infer<typeof NotificationListSchema>;
