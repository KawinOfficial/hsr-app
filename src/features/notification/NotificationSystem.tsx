import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  CheckCircle,
  Clock,
  FileText,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Eye,
  Mail,
  Trash2,
  Settings,
} from "lucide-react";

interface NotificationSystemProps {
  onNotificationClick?: (notification: any) => void;
}

const NotificationSystem = ({
  onNotificationClick,
}: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState([
    {
      id: "NOTIF-001",
      type: "approval_request",
      title: "Purchase Request Requires Your Approval",
      message:
        "Steel Materials for Section A12-A15 - Purchase request worth ฿15,000,000 is pending your approval",
      documentId: "DOC-2024-001",
      priority: "High",
      isRead: false,
      timestamp: "2024-02-17 09:30",
      from: "Anupong Thavorn",
      avatar: "/placeholder.svg",
      action: "approval_required",
    },
    {
      id: "NOTIF-002",
      type: "status_update",
      title: "Document Approved",
      message:
        "Your invoice submission INV-2024-0156 has been approved by Finance Department",
      documentId: "DOC-2024-002",
      priority: "Medium",
      isRead: false,
      timestamp: "2024-02-16 14:20",
      from: "Siriporn Wattana",
      avatar: "/placeholder.svg",
      action: "status_update",
    },
    {
      id: "NOTIF-003",
      type: "document_returned",
      title: "Document Returned for Revision",
      message:
        "Electrical Systems Installation Contract has been returned with comments from Finance Department",
      documentId: "DOC-2024-003",
      priority: "High",
      isRead: false,
      timestamp: "2024-02-16 16:30",
      from: "Siriporn Wattana",
      avatar: "/placeholder.svg",
      action: "revision_required",
    },
    {
      id: "NOTIF-004",
      type: "deadline_reminder",
      title: "Approval Deadline Approaching",
      message:
        "Payment Request - Track Installation Phase 1 requires approval by 2024-02-22",
      documentId: "DOC-2024-004",
      priority: "Medium",
      isRead: true,
      timestamp: "2024-02-16 08:00",
      from: "System",
      avatar: "/placeholder.svg",
      action: "deadline_reminder",
    },
    {
      id: "NOTIF-005",
      type: "new_document",
      title: "New Document Submitted",
      message:
        "Work Delivery Note for concrete installation has been submitted for your review",
      documentId: "DOC-2024-005",
      priority: "Low",
      isRead: true,
      timestamp: "2024-02-15 16:45",
      from: "Pranee Chotirat",
      avatar: "/placeholder.svg",
      action: "new_submission",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
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
  };

  const getPriorityColor = (priority: string) => {
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
  };

  const getActionColor = (action: string) => {
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
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "priority") return notif.priority === "High";
    return true;
  });

  return (
    <>
      {/* Notification Bell Button */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
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
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-1 mb-3">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("unread")}
                className="text-xs"
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === "priority" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("priority")}
                className="text-xs"
              >
                Priority
              </Button>
            </div>

            <Separator className="mb-3" />

            {/* Notifications List */}
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
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
                              className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}
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
                        <h4 className="font-medium text-sm mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{notification.from}</span>
                            <span>•</span>
                            <span>{notification.timestamp}</span>
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
                ))
              )}
            </div>

            {filteredNotifications.length > 0 && (
              <>
                <Separator className="my-3" />
                <div className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View all notifications
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>All Notifications</DialogTitle>
                        <DialogDescription>
                          Complete notification history and management
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {notifications.map((notification) => (
                          <Card
                            key={notification.id}
                            className={`hover:shadow-md transition-shadow cursor-pointer ${
                              !notification.isRead
                                ? "border-l-4 border-l-primary"
                                : ""
                            }`}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                <Avatar>
                                  <AvatarImage src={notification.avatar} />
                                  <AvatarFallback>
                                    {notification.from
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      {getNotificationIcon(notification.type)}
                                      <h4 className="font-medium">
                                        {notification.title}
                                      </h4>
                                      {!notification.isRead && (
                                        <Badge variant="secondary">New</Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span
                                        className={`text-sm font-medium ${getPriorityColor(notification.priority)}`}
                                      >
                                        {notification.priority}
                                      </span>
                                      <Badge
                                        className={getActionColor(
                                          notification.action,
                                        )}
                                      >
                                        {notification.action.replace("_", " ")}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center space-x-4">
                                      <span>From: {notification.from}</span>
                                      <span>
                                        Doc ID: {notification.documentId}
                                      </span>
                                    </div>
                                    <span>{notification.timestamp}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNotificationClick(notification);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
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
