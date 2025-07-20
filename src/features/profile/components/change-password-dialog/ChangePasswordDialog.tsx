"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useChangePasswordDialog } from "./ChangePasswordDialog.hook";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save } from "lucide-react";

const ChangePasswordDialog = () => {
  const {
    changePasswordOpen,
    setChangePasswordOpen,
    showPassword,
    setShowPassword,
  } = useChangePasswordDialog();

  return (
    <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Password must be at least 8 characters long and contain uppercase,
            lowercase, numbers, and special characters.
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setChangePasswordOpen?.(false)}
          >
            Cancel
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
