"use client";

import { useUserDetailDialog } from "./UserDetailDialog.hook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/features/team-members/utils/colorStatus";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const UserDetailDialog = () => {
  const {
    userDetails: user,
    isOpen,
    setIsOpen,
    getRoleName,
    getDepartmentName,
  } = useUserDetailDialog();

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6 text-left">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={""} />
                <AvatarFallback className="text-lg">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">
                  {user.firstName} {user.lastName}
                </DialogTitle>
                <div className="mt-2">
                  <Badge className={getStatusColor(user.status ?? "")}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen?.(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6 pt-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="grid lg:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-muted-foreground">
                    Email Address
                  </p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Phone Number
                  </Label>
                  <p>{user.phoneNumber}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Role
                  </Label>
                  <p>{getRoleName?.(user.employeeInfo?.roleId ?? "")}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Department
                  </Label>
                  <p>
                    {getDepartmentName?.(user.employeeInfo?.departmentId ?? "")}
                  </p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Location
                  </Label>
                  <p>{user.employeeInfo?.workLocation}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Created At
                  </Label>
                  <p>{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Employee ID
                  </Label>
                  <p className="font-mono">{user.employeeInfo?.employeeId}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Reporting Manager
                  </Label>
                  <p>{user.employeeInfo?.managerName}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Work Location
                  </Label>
                  <p>{user.employeeInfo?.workLocation}</p>
                </div>
                <div>
                  <Label className="font-medium text-muted-foreground">
                    Nationality
                  </Label>
                  <p>
                    {user.nationality === "Other"
                      ? user.otherNationality
                      : user.nationality}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Access Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Access Permissions</CardTitle>
                <CardDescription>
                  Manage user access to different system modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(user?.permissions ?? {}).map(
                    ([module, perms]) => (
                      <div key={module} className="border-b pb-4">
                        <h4 className="font-medium mb-3 capitalize">
                          {module.replace("-", " ")}
                        </h4>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${module}-read`}
                              checked={perms.read}
                              disabled
                            />
                            <Label
                              htmlFor={`${module}-read`}
                              className="text-sm"
                            >
                              Read
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${module}-write`}
                              checked={perms.create}
                              disabled
                            />
                            <Label
                              htmlFor={`${module}-write`}
                              className="text-sm"
                            >
                              Create
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${module}-admin`}
                              checked={perms.update}
                              disabled
                            />
                            <Label
                              htmlFor={`${module}-admin`}
                              className="text-sm"
                            >
                              Update
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`${module}-admin`}
                              checked={perms.delete}
                              disabled
                            />
                            <Label
                              htmlFor={`${module}-admin`}
                              className="text-sm"
                            >
                              Delete
                            </Label>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
