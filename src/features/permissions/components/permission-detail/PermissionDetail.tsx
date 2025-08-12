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

const PermissionDetail = () => {
  const { editOpen, setEditOpen, selectedPermissionGroup, handleSave } =
    usePermissionDetail();

  if (!selectedPermissionGroup) return null;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 pb-0">
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
              <Input
                id="edit-role-name"
                defaultValue={selectedPermissionGroup.name}
              />
            </div>
            <div>
              <Label htmlFor="edit-role-status">Status</Label>
              <Select defaultValue={selectedPermissionGroup.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="edit-role-description">Description</Label>
            <Textarea
              id="edit-role-description"
              defaultValue={selectedPermissionGroup.description}
              rows={3}
            />
          </div>

          <div>
            <Label className="text-base font-medium">Permissions Matrix</Label>
            <div className="mt-4 space-y-4">
              {Object.entries(selectedPermissionGroup.permissions).map(
                ([module, perms]) => (
                  <Card key={module} className="p-4">
                    <div className="space-y-3">
                      <h4 className="font-medium capitalize">
                        {module.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${module}-read`}
                            defaultChecked={perms.read}
                          />
                          <Label htmlFor={`${module}-read`}>Read</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${module}-write`}
                            defaultChecked={perms.write}
                          />
                          <Label htmlFor={`${module}-write`}>Write</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${module}-admin`}
                            defaultChecked={perms.admin}
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
          <Button variant="outline" onClick={() => setEditOpen?.(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSave?.(selectedPermissionGroup)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionDetail;
