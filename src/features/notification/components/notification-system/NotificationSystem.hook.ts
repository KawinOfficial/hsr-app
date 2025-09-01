import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/routers/page";
import { ProfileContext } from "@/features/profile/components/profile-provider";
import { useMemo } from "react";

export const useNotificationSystem = () => {
  const router = useRouter();
  const { isOpen, setIsOpen, notifications, isLoading } = useContextSelector(
    NotificationContext,
    (context) => context!
  );
  const userId = useContextSelector(
    ProfileContext,
    (context) => context?.userProfile?.id
  );

  const getNotificationCount = useMemo(() => {
    return notifications?.filter((n) => n.currentUserId === userId).length ?? 0;
  }, [notifications, userId]);

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
    getNotificationCount,
  };
};
