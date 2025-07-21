"use client";

import { useSecurityTab } from "./SecurityTab.hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const SecurityTab = () => {
  const { userProfile, setChangePasswordOpen } = useSecurityTab();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Password & Authentication</CardTitle>
          <CardDescription>
            Manage your password and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex space-x-2">
              <Input
                type="password"
                value="••••••••••••"
                disabled
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => setChangePasswordOpen?.(true)}
              >
                Change
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Last changed: January 15, 2024
            </p>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Verify login with SMS code
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Login Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle>Security Information</CardTitle>
          <CardDescription>View your account security details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Account Status</span>
              <Badge className="bg-success-green text-white">Secure</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Last Login</span>
              <span className="text-sm text-muted-foreground">
                {userProfile?.lastLogin}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Password Strength</span>
              <div className="flex items-center space-x-2">
                <Progress value={85} className="w-16 h-2" />
                <span className="text-sm text-success-green">Strong</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
