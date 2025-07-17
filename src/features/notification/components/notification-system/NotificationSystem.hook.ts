import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";

export const useNotificationSystem = () => {
  const {
    markAllAsRead,
    unreadCount,
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    filteredNotifications,
  } = useContextSelector(NotificationContext, (context) => context!);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: `Unread (${unreadCount})`, value: "unread" },
    { label: "Priority", value: "priority" },
  ];

  return {
    markAllAsRead,
    unreadCount,
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    filteredNotifications,
    filterOptions,
  };
};
