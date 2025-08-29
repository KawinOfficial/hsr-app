import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";

export const useNotificationSystem = () => {
  const { isOpen, setIsOpen, notifications, isLoading } = useContextSelector(
    NotificationContext,
    (context) => context!
  );

  return {
    isOpen,
    setIsOpen,
    notifications,
    isLoading,
  };
};
