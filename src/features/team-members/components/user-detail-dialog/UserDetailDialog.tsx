"use client";

import { useUserDetailDialog } from "./UserDetailDialog.hook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/features/team-members/utils/colorStatus";
import { Save, Edit, X, Key, Mail, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UserDetailTabs } from "@/features/team-members/components/user-detail-tabs";

const UserDetailDialog = () => {
  const {
    userDetails: user,
    editMode,
    handleSave,
    handleEdit,
    handleCancel,
    isOpen,
    setIsOpen,
  } = useUserDetailDialog();

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
                <DialogTitle className="text-2xl">
                  {editMode ? (
                    <Input className="text-2xl font-bold border-none p-0 h-auto" />
                  ) : (
                    user.name
                  )}
                </DialogTitle>
                <DialogDescription>
                  {user.role} • {user.department}
                </DialogDescription>
                <div className="mt-2">
                  <Badge className={getStatusColor(user.status ?? "")}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {editMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen?.(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 p-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    {editMode ? (
                      <Input type="email" className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm">{user.email}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </Label>
                    {editMode ? (
                      <Input className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm">{user.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Role
                    </Label>
                    {editMode ? (
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Project Manager">
                            Project Manager
                          </SelectItem>
                          <SelectItem value="QS Officer">QS Officer</SelectItem>
                          <SelectItem value="Engineer">Engineer</SelectItem>
                          <SelectItem value="Finance Manager">
                            Finance Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm">{user.role}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Department
                    </Label>
                    {editMode ? (
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Project Management">
                            Project Management
                          </SelectItem>
                          <SelectItem value="Quality Surveying">
                            Quality Surveying
                          </SelectItem>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 text-sm">{user.department}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Location
                    </Label>
                    {editMode ? (
                      <Input className="mt-1" />
                    ) : (
                      <p className="mt-1 text-sm">{user.location}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Join Date
                    </Label>
                    <p className="mt-1 text-sm">{user.joinDate}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Assigned Projects
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.projects?.map((project) => (
                      <Badge key={project} variant="outline">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

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

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Welcome Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <UserDetailTabs user={user} editMode={editMode} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
