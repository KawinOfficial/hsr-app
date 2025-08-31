import { useState } from "react";
import { useNotification } from "@/features/notification/hooks/use-notification";

export const useNotificationProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications, isLoading } = useNotification();

  return {
    isOpen,
    setIsOpen,
    notifications,
    isLoading,
  };
};
