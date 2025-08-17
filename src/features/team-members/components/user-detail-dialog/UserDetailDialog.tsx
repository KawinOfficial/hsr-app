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
import { CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const UserDetailDialog = () => {
  const { userDetails: user, isOpen, setIsOpen } = useUserDetailDialog();

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">{user.name}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{user.name}</DialogTitle>
                <div className="mt-2">
                  <Badge className={getStatusColor(user.status ?? "")}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </Label>
                    <p className="mt-1 text-sm">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </Label>
                    <p className="mt-1 text-sm">{user.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Role
                    </Label>
                    <p className="mt-1 text-sm">{user.role}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Department
                    </Label>
                    <p className="mt-1 text-sm">{user.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Location
                    </Label>

                    <p className="mt-1 text-sm">{user.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Created At
                    </Label>
                    <p className="mt-1 text-sm">{user.joinDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Employee ID
                    </Label>
                    <p className="text-sm font-mono">
                      {user.employment.employeeId}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Reporting Manager
                    </Label>
                    <p className="text-sm">
                      {user.employment.reportingManager}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Work Location
                    </Label>
                    <p className="text-sm">{user.employment.workLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="text-sm font-medium">{user.lastLogin}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Account Status</span>
                    <Badge className={getStatusColor(user.status ?? "")}>
                      {user.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Auth</span>
                    <CheckCircle className="h-4 w-4 text-success-green" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Verified</span>
                    <CheckCircle className="h-4 w-4 text-success-green" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Complete</span>
                    <CheckCircle className="h-4 w-4 text-success-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Access Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Access Permissions</CardTitle>
              <CardDescription>
                Manage user access to different system modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(user.permissions).map(([module, perms]) => (
                  <div key={module} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3 capitalize">
                      {module.replace("-", " ")}
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${module}-read`}
                          checked={perms.read}
                          disabled
                        />
                        <Label htmlFor={`${module}-read`} className="text-sm">
                          Read Access
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${module}-write`}
                          checked={perms.write}
                          disabled
                        />
                        <Label htmlFor={`${module}-write`} className="text-sm">
                          Write Access
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${module}-admin`}
                          checked={perms.admin}
                          disabled
                        />
                        <Label htmlFor={`${module}-admin`} className="text-sm">
                          Admin Access
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
