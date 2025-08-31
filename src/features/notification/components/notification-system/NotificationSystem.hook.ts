import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/routers/page";

export const useNotificationSystem = () => {
  const router = useRouter();
  const { isOpen, setIsOpen, notifications, isLoading } = useContextSelector(
    NotificationContext,
    (context) => context!
  );

  function onOpenApprovals() {
    setIsOpen(false);
    router.push(PAGE_ROUTES.APPROVALS);
  }

  return {
    isOpen,
    setIsOpen,
    notifications,
    isLoading,
    onOpenApprovals,
  };
};
