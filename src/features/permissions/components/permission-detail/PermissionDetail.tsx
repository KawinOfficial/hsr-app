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
import { LEVELS } from "@/features/permissions/constants/options";

const PermissionDetail = () => {
  const { editOpen, setEditOpen, selectedPermissionGroup, handleSave } =
    usePermissionDetail();

  if (!selectedPermissionGroup) return null;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Edit Permission Group</DialogTitle>
          <DialogDescription>
            Update role permissions and access control settings
          </DialogDescription>
        </DialogHeader>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Users</Label>
              <p className="text-2xl font-bold text-rail-blue">
                {selectedPermissionGroup.userCount}
              </p>
              <p className="text-sm text-muted-foreground">users assigned</p>
            </div>
            <div>
              <Label>Permission Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select permission level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
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
