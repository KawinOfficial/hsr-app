"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useCreatePermission } from "./CreatePermission.hook";
import { PERMISSIONS } from "@/features/permissions/constants/options";

const CreatePermission = () => {
  const { form, onSubmit, onReset, open, setOpen } = useCreatePermission();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg p-6">
        <form onSubmit={onSubmit} onReset={onReset}>
          <DialogHeader>
            <DialogTitle>Create Permission Group</DialogTitle>
            <DialogDescription>
              Define a new role with specific permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                placeholder="Role name"
                {...form.fieldName}
              />
            </div>
            <div>
              <Label htmlFor="role-description">Description</Label>
              <Textarea
                id="role-description"
                placeholder="Role description"
                {...form.fieldDescription}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="space-y-2">
                {PERMISSIONS.map((perm) => (
                  <div key={perm.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={perm.value}
                      {...form.fieldPermissions}
                      value={perm.value}
                    />
                    <Label htmlFor={perm.value} className="text-sm">
                      {perm.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePermission;
