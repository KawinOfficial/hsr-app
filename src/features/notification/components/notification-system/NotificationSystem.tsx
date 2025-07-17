import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { NotificationDialog } from "@/features/notification/components/notification-dialog";
import { useNotificationSystem } from "./NotificationSystem.hook";
import { NofiticationItem } from "@/features/notification/components/notification-item";
import { Separator } from "@/components/ui/separator";

const NotificationSystem = () => {
  const {
    markAllAsRead,
    unreadCount,
    isOpen,
    setIsOpen,
    filter,
    setFilter,
    filteredNotifications,
    filterOptions,
  } = useNotificationSystem();

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {!!unreadCount && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-96 max-h-96 overflow-y-auto"
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            </div>

            <div className="flex space-x-1 mb-3">
              {filterOptions.map(({ label, value }) => (
                <Button
                  key={value}
                  variant={filter === value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(value)}
                  className="text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
            <Separator className="mb-3" />

            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <NofiticationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              )}
            </div>

            {!!filteredNotifications.length && (
              <>
                <Separator className="my-3" />
                <div className="text-center">
                  <NotificationDialog />
                </div>
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default NotificationSystem;
