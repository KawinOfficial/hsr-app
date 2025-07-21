import { useMemo, useState } from "react";
import { Notification } from "@/features/notification/schemas/Notification.schema";

const mockNotifications = [
  {
    id: "NOTIF-001",
    type: "approval_request",
    title: "Purchase Request Requires Your Approval",
    message:
      "Steel Materials for Section A12-A15 - Purchase request worth ฿15,000,000 is pending your approval",
    documentId: "DOC-2024-001",
    priority: "High",
    isRead: false,
    createdAt: "2024-02-17 09:30",
    from: "Anupong Thavorn",
    avatar: "/placeholder.svg",
    action: "approval_required",
  },
  {
    id: "NOTIF-002",
    type: "status_update",
    title: "Document Approved",
    message:
      "Your invoice submission INV-2024-0156 has been approved by Finance Department",
    documentId: "DOC-2024-002",
    priority: "Medium",
    isRead: false,
    createdAt: "2024-02-16 14:20",
    from: "Siriporn Wattana",
    avatar: "/placeholder.svg",
    action: "status_update",
  },
  {
    id: "NOTIF-003",
    type: "document_returned",
    title: "Document Returned for Revision",
    message:
      "Electrical Systems Installation Contract has been returned with comments from Finance Department",
    documentId: "DOC-2024-003",
    priority: "High",
    isRead: false,
    createdAt: "2024-02-16 16:30",
    from: "Siriporn Wattana",
    avatar: "/placeholder.svg",
    action: "revision_required",
  },
  {
    id: "NOTIF-004",
    type: "deadline_reminder",
    title: "Approval Deadline Approaching",
    message:
      "Payment Request - Track Installation Phase 1 requires approval by 2024-02-22",
    documentId: "DOC-2024-004",
    priority: "Medium",
    isRead: true,
    createdAt: "2024-02-16 08:00",
    from: "System",
    avatar: "/placeholder.svg",
    action: "deadline_reminder",
  },
  {
    id: "NOTIF-005",
    type: "new_document",
    title: "New Document Submitted",
    message:
      "Work Delivery Note for concrete installation has been submitted for your review",
    documentId: "DOC-2024-005",
    priority: "Low",
    isRead: true,
    createdAt: "2024-02-15 16:45",
    from: "Pranee Chotirat",
    avatar: "/placeholder.svg",
    action: "new_submission",
  },
];

export const useNotificationProvider = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = useMemo(
    () =>
      notifications.filter((notif) => {
        if (filter === "unread") return !notif.isRead;
        if (filter === "priority") return notif.priority === "High";
        return true;
      }),
    [notifications, filter]
  );

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  }

  function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  }

  function deleteNotification(id: string) {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }

  function handleNotificationClick(notification: Notification) {
    markAsRead(notification.id);
  }

  return {
    notifications,
    setNotifications,
    handleNotificationClick,
    filteredNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    unreadCount,
    isOpen,
    setIsOpen,
    filter,
    setFilter,
  };
};
