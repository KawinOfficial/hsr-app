"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { usePermissionDetail } from "./PermissionDetail.hook";
import { Controller } from "react-hook-form";
import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";

const PermissionDetail = () => {
  const {
    editOpen,
    setEditOpen,
    selectedPermissionGroup,
    form,
    onSubmit,
    onReset,
  } = usePermissionDetail();

  if (!selectedPermissionGroup) return null;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 pb-0">
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="flex justify-between items-center mb-4">
            <DialogHeader>
              <DialogTitle>Edit Permission Group</DialogTitle>
              <DialogDescription>
                Update role permissions and access control settings
              </DialogDescription>
            </DialogHeader>

            <p className="text-2xl font-bold text-rail-blue">
              {selectedPermissionGroup.userCount}{" "}
              <span className="text-sm text-muted-foreground font-light">
                users assigned
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-role-name">Role Name</Label>
                <Input id="edit-role-name" {...form.fieldName} />
              </div>
              <div>
                <Label htmlFor="edit-role-status">Status</Label>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-role-description">Description</Label>
              <Textarea
                id="edit-role-description"
                {...form.fieldDescription}
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium">
                Permissions Matrix
              </Label>
              <div className="mt-4 space-y-4">
                {Object.entries(selectedPermissionGroup.permissions).map(
                  ([module]) => (
                    <Card key={module} className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium capitalize">{module}</h4>
                        <div className="grid grid-cols-3 gap-4">
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
                              }.write`}
                              render={({
                                field: { value, onChange, ...rest },
                              }) => (
                                <Switch
                                  id={`${module}-write`}
                                  checked={!!value}
                                  onCheckedChange={onChange}
                                  {...rest}
                                />
                              )}
                            />
                            <Label htmlFor={`${module}-write`}>Write</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Controller
                              control={form.control}
                              name={`permissions.${
                                module.toLowerCase() as keyof PermissionsMatrix
                              }.admin`}
                              render={({
                                field: { value, onChange, ...rest },
                              }) => (
                                <Switch
                                  id={`${module}-admin`}
                                  checked={!!value}
                                  onCheckedChange={onChange}
                                  {...rest}
                                />
                              )}
                            />
                            <Label htmlFor={`${module}-admin`}>Admin</Label>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="sticky bottom-0 left-0 right-0 bg-white py-4">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionDetail;
