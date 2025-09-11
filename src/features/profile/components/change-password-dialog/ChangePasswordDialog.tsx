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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Eye, EyeOff, Save, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const ChangePasswordDialog = () => {
  const {
    changePasswordOpen,
    setChangePasswordOpen,
    showPassword,
    toggleShowPassword,
    methods,
    onSubmit,
    onReset,
    passwordValidation,
    isPending,
  } = useChangePasswordDialog();

  return (
    <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
      <DialogContent className="max-w-md p-4 lg:p-6">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and choose a new one
          </DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={onSubmit} onReset={onReset}>
            <div className="space-y-4 mt-4">
              <FormField
                control={methods.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Current Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter current password"
                          {...field}
                          type={
                            showPassword.currentPassword ? "text" : "password"
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => toggleShowPassword("currentPassword")}
                        >
                          {showPassword.currentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter new password"
                          {...field}
                          type={showPassword.newPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => toggleShowPassword("newPassword")}
                        >
                          {showPassword.newPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="text-xs list-disc list-inside space-y-0.5">
                {passwordValidation.map((requirement) => (
                  <div
                    key={requirement.id}
                    className={cn(
                      "flex items-center gap-2",
                      requirement.isValid ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {requirement.isValid ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    <p>{requirement.message}</p>
                  </div>
                ))}
              </div>

              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter confirm password"
                          {...field}
                          type={
                            showPassword.confirmPassword ? "text" : "password"
                          }
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => toggleShowPassword("confirmPassword")}
                        >
                          {showPassword.confirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button type="reset" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                <Save className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
