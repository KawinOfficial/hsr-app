import { Notification } from "@/features/notification/schemas/Notification.schema";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { NotificationContext } from "@/features/notification/components/notification-provider";
import {
  getActionColor,
  getPriorityColor,
} from "@/features/notification/utils/color";

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

interface NofiticationItemProps {
  notification: Notification;
}

const NofiticationItem = ({ notification }: NofiticationItemProps) => {
  const handleNotificationClick = useContextSelector(
    NotificationContext,
    (context) => context?.handleNotificationClick
  );

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.isRead ? "bg-muted/30" : ""
      }`}
      onClick={() => handleNotificationClick?.(notification)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <div>{getNotificationIcon(notification.type)}</div>
              <h4 className="font-medium text-sm">{notification.title}</h4>
            </div>
            <div className="flex items-center space-x-1">
              <span
                className={`text-xs font-medium ${getPriorityColor(
                  notification.priority
                )}`}
              >
                {notification.priority}
              </span>
            </div>
          </div>

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
