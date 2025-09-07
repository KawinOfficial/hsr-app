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
import { Plus } from "lucide-react";
import { useCreatePermission } from "./CreatePermission.hook";
import { Card } from "@/components/ui/card";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";

const CreatePermission = () => {
  const { form, onSubmit, onReset, open, setOpen, canCreate } =
    useCreatePermission();
  if (!canCreate) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl p-6">
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
            <div>
              <Label className="text-base font-medium">
                Permissions Matrix
              </Label>
              <div className="mt-4 space-y-4">
                {Object.entries(form.watch("permissions")).map(([module]) => (
                  <Card key={module} className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium capitalize">{module}</h4>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Controller
                            control={form.control}
                            name={`permissions.${
                              module.toLowerCase() as keyof PermissionsMatrix
                            }.read`}
                            render={({
                              field: { value, onChange, ...rest },
                            }) => (
                              <Switch
                                id={`${module}-read`}
                                checked={!!value}
                                onCheckedChange={onChange}
                                {...rest}
                              />
                            )}
                          />
                          <Label htmlFor={`${module}-read`}>Read</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Controller
                            control={form.control}
                            name={`permissions.${
                              module.toLowerCase() as keyof PermissionsMatrix
                            }.create`}
                            render={({
                              field: { value, onChange, ...rest },
                            }) => (
                              <Switch
                                id={`${module}-create`}
                                checked={!!value}
                                onCheckedChange={onChange}
                                {...rest}
                              />
                            )}
                          />
                          <Label htmlFor={`${module}-create`}>Create</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Controller
                            control={form.control}
                            name={`permissions.${
                              module.toLowerCase() as keyof PermissionsMatrix
                            }.update`}
                            render={({
                              field: { value, onChange, ...rest },
                            }) => (
                              <Switch
                                id={`${module}-update`}
                                checked={!!value}
                                onCheckedChange={onChange}
                                {...rest}
                              />
                            )}
                          />
                          <Label htmlFor={`${module}-update`}>Update</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Controller
                            control={form.control}
                            name={`permissions.${
                              module.toLowerCase() as keyof PermissionsMatrix
                            }.delete`}
                            render={({
                              field: { value, onChange, ...rest },
                            }) => (
                              <Switch
                                id={`${module}-delete`}
                                checked={!!value}
                                onCheckedChange={onChange}
                                {...rest}
                              />
                            )}
                          />
                          <Label htmlFor={`${module}-delete`}>Delete</Label>
                        </div>
                      </div>
                    </div>
                  </Card>
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
