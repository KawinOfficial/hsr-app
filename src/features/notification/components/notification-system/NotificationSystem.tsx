import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useNotificationSystem } from "./NotificationSystem.hook";
import { NofiticationItem } from "@/features/notification/components/notification-item";

const NotificationSystem = () => {
  const { isOpen, setIsOpen, notifications, isLoading, onOpenApprovals } =
    useNotificationSystem();

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {!!notifications?.length && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length > 9 ? "9+" : notifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[500px]">
          <div className="p-3 relative pt-12">
            <div className="flex items-center justify-between  absolute top-3 inset-x-3">
              <h3 className="font-semibold">Notifications</h3>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={onOpenApprovals}
              >
                Show All Approvals
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">Loading...</p>
                </div>
              ) : !notifications?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NofiticationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              )}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationSystem;
