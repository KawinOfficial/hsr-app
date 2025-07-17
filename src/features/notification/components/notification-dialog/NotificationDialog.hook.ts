import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";

export const useNotificationDialog = () => {
  const { notifications, handleNotificationClick, deleteNotification } =
    useContextSelector(NotificationContext, (context) => context!);

  return {
    notifications,
    handleNotificationClick,
    deleteNotification,
  };
};
