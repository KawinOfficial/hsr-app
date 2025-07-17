import { Notification } from "@/features/notification/schemas/Notification.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  FileText,
  Mail,
  Trash2,
} from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";

export function getNotificationIcon(type: string) {
  switch (type) {
    case "approval_request":
      return <CheckCircle className="h-4 w-4 text-warning-amber" />;
    case "status_update":
      return <FileText className="h-4 w-4 text-success-green" />;
    case "document_returned":
      return <AlertTriangle className="h-4 w-4 text-construction-orange" />;
    case "deadline_reminder":
      return <Clock className="h-4 w-4 text-destructive" />;
    case "new_document":
      return <Bell className="h-4 w-4 text-rail-blue" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "text-destructive";
    case "Medium":
      return "text-warning-amber";
    case "Low":
      return "text-success-green";
    default:
      return "text-muted-foreground";
  }
}

export function getActionColor(action: string) {
  switch (action) {
    case "approval_required":
      return "bg-warning-amber text-white";
    case "revision_required":
      return "bg-construction-orange text-white";
    case "status_update":
      return "bg-success-green text-white";
    case "deadline_reminder":
      return "bg-destructive text-white";
    default:
      return "bg-rail-blue text-white";
  }
}

interface NofiticationItemProps {
  notification: Notification;
}

const NofiticationItem = ({ notification }: NofiticationItemProps) => {
  const handleNotificationClick = useContextSelector(
    NotificationContext,
    (context) => context?.handleNotificationClick!
  );
  const markAsRead = useContextSelector(
    NotificationContext,
    (context) => context?.markAsRead!
  );
  const deleteNotification = useContextSelector(
    NotificationContext,
    (context) => context?.deleteNotification!
  );

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.isRead ? "bg-muted/30" : ""
      }`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={notification.avatar} />
          <AvatarFallback>
            {notification.from
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              {getNotificationIcon(notification.type)}
              {!notification.isRead && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>
            <div className="flex items-center space-x-1">
              <span
                className={`text-xs font-medium ${getPriorityColor(
                  notification.priority
                )}`}
              >
                {notification.priority}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    •••
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Mark as read
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{notification.from}</span>
              <span>•</span>
              <span>{notification.createdAt}</span>
            </div>
            <Badge
              className={getActionColor(notification.action)}
              variant="secondary"
            >
              {notification.action.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NofiticationItem;
