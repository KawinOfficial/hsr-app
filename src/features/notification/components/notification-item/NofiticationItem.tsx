import { NotificationDetail } from "@/features/notification/schemas/Notification.schema";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  SquareDashed,
} from "lucide-react";
import { getActionColor } from "@/features/notification/utils/color";
import { getPriorityColor } from "@/features/financial/utils/color";
import { formatDateWithTime } from "@/lib/format";

export function getNotificationIcon(type: string) {
  switch (type) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-success-green" />;
    case "approval_request":
      return <SquareDashed className="h-4 w-4 text-warning-amber" />;
    case "rejected":
      return <AlertTriangle className="h-4 w-4 text-construction-orange" />;
    case "deadline_reminder":
      return <Clock className="h-4 w-4 text-destructive" />;
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />;
  }
}

interface NofiticationItemProps {
  notification: NotificationDetail;
}

const NofiticationItem = ({ notification }: NofiticationItemProps) => {
  const { paymentId, assetId, liabilityId } = notification ?? {};
  const item =
    paymentId && notification?.payment
      ? notification.payment
      : assetId && notification?.asset
      ? notification.asset
      : liabilityId && notification?.liability
      ? notification.liability
      : null;

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50`}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>{getNotificationIcon(notification.currentType)}</div>
            <h4 className="font-medium text-sm">{item?.name}</h4>
          </div>
          <div className="flex items-center space-x-1">
            <span
              className={`text-xs font-medium ${getPriorityColor(
                item?.priority ?? ""
              )}`}
            >
              {item?.priority}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item?.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <span>
              {notification.currentUser?.firstName}{" "}
              {notification.currentUser?.lastName}
            </span>
            <span>•</span>
            <span>{formatDateWithTime(notification.updatedAt)}</span>
          </div>
          <Badge
            className={getActionColor(notification.currentType)}
            variant="secondary"
          >
            {notification.currentType.replace("_", " ")}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default NofiticationItem;
