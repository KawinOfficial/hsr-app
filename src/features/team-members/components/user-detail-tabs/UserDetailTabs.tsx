import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { UserDetail } from "@/features/team-members/schemas/User.schema";

interface UserDetailTabsProps {
  user: UserDetail;
  editMode?: boolean;
}

const UserDetailTabs = ({ user, editMode }: UserDetailTabsProps) => {
  if (!user) return null;

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="permissions">Permissions</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="employment">Employment</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-medium">Date of Birth</Label>
                <p className="text-sm">{user.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <Label className="font-medium">Nationality</Label>
                <p className="text-sm">{user.personalInfo.nationality}</p>
              </div>
              <div>
                <Label className="font-medium">ID Number</Label>
                <p className="text-sm font-mono">
                  {user.personalInfo.idNumber}
                </p>
              </div>
              <div>
                <Label className="font-medium">Emergency Contact</Label>
                <p className="text-sm">{user.personalInfo.emergencyContact}</p>
              </div>
            </div>
            <div>
              <Label className="font-medium">Address</Label>
              <p className="text-sm">{user.personalInfo.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.certifications.map((cert, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{cert.name}</h4>
                    <Badge
                      className={
                        cert.status === "Valid"
                          ? "bg-success-green text-white"
                          : "bg-warning-amber text-white"
                      }
                    >
                      {cert.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Issuer: </span>
                      {cert.issuer}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issued: </span>
                      {cert.issueDate}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires: </span>
                      {cert.expiryDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="permissions" className="space-y-4">
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
                        checked={(perms as any).read}
                        disabled={!editMode}
                      />
                      <Label htmlFor={`${module}-read`} className="text-sm">
                        Read Access
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module}-write`}
                        checked={(perms as any).write}
                        disabled={!editMode}
                      />
                      <Label htmlFor={`${module}-write`} className="text-sm">
                        Write Access
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module}-admin`}
                        checked={(perms as any).admin}
                        disabled={!editMode}
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
      </TabsContent>

      <TabsContent value="activity" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              User activity log and system interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.activityLog.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.success ? "bg-success-green" : "bg-destructive"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                    {activity.details && (
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                    )}
                    {activity.ip && (
                      <p className="text-xs text-muted-foreground">
                        {activity.device} • IP: {activity.ip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-medium">Last Password Change</Label>
                <p className="text-sm">{user.security.lastPasswordChange}</p>
              </div>
              <div>
                <Label className="font-medium">Two-Factor Auth</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={user.security.twoFactorEnabled}
                    disabled={!editMode}
                  />
                  <span className="text-sm">
                    {user.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
              <div>
                <Label className="font-medium">Failed Login Attempts</Label>
                <p className="text-sm">{user.security.loginAttempts}</p>
              </div>
              <div>
                <Label className="font-medium">Account Status</Label>
                <div className="flex items-center space-x-2 mt-1">
                  {user.security.accountLocked ? (
                    <Lock className="h-4 w-4 text-destructive" />
                  ) : (
                    <Unlock className="h-4 w-4 text-success-green" />
                  )}
                  <span className="text-sm">
                    {user.security.accountLocked ? "Locked" : "Unlocked"}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Security Actions</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Force Password Reset
                </Button>
                <Button variant="outline" size="sm">
                  Revoke Sessions
                </Button>
                <Button variant="outline" size="sm">
                  Security Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="employment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-medium">Employee ID</Label>
                <p className="text-sm font-mono">
                  {user.employment.employeeId}
                </p>
              </div>
              <div>
                <Label className="font-medium">Start Date</Label>
                <p className="text-sm">{user.employment.startDate}</p>
              </div>
              <div>
                <Label className="font-medium">Contract Type</Label>
                <p className="text-sm">{user.employment.contractType}</p>
              </div>
              <div>
                <Label className="font-medium">Reporting Manager</Label>
                <p className="text-sm">{user.employment.reportingManager}</p>
              </div>
              <div>
                <Label className="font-medium">Work Location</Label>
                <p className="text-sm">{user.employment.workLocation}</p>
              </div>
              <div>
                <Label className="font-medium">Monthly Salary</Label>
                <p className="text-sm font-medium">
                  ฿{user.employment.salary.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UserDetailTabs;
