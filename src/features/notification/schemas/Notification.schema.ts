import { z } from "zod";

export const NotificationSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  message: z.string(),
  documentId: z.string(),
  from: z.string(),
  avatar: z.string(),
  action: z.string(),
  isRead: z.boolean(),
  priority: z.string(),
  createdAt: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;
