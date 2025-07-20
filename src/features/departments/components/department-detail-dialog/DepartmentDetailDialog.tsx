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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { useDepartmentDetailDialog } from "./DepartmentDetailDialog.hook";

const DepartmentDetailDialog = () => {
  const { departmentEditOpen, setDepartmentEditOpen, selectedDepartment } =
    useDepartmentDetailDialog();

  if (!selectedDepartment) return null;

  return (
    <Dialog open={departmentEditOpen} onOpenChange={setDepartmentEditOpen}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>
            Update department information and settings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-dept-name">Department Name</Label>
            <Input id="edit-dept-name" defaultValue={selectedDepartment.name} />
          </div>
          <div>
            <Label htmlFor="edit-dept-description">Description</Label>
            <Textarea
              id="edit-dept-description"
              defaultValue={selectedDepartment.description}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-dept-head">Department Head</Label>
              <Select defaultValue={selectedDepartment.head}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Somchai Tanakorn">
                    Somchai Tanakorn
                  </SelectItem>
                  <SelectItem value="Pranee Chotirat">
                    Pranee Chotirat
                  </SelectItem>
                  <SelectItem value="Liu Wei Chen">Liu Wei Chen</SelectItem>
                  <SelectItem value="Siriporn Wattana">
                    Siriporn Wattana
                  </SelectItem>
                  <SelectItem value="Malee Jitpakdee">
                    Malee Jitpakdee
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-dept-budget">Budget (THB)</Label>
              <Input
                id="edit-dept-budget"
                type="number"
                defaultValue={selectedDepartment.budget}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-dept-location">Location</Label>
            <Input
              id="edit-dept-location"
              defaultValue={selectedDepartment.location}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select defaultValue={selectedDepartment.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Key Responsibilities</Label>
            <div className="space-y-2 mt-2">
              {selectedDepartment.responsibilities.map(
                (resp: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input defaultValue={resp} className="flex-1" />
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Responsibility
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setDepartmentEditOpen?.(false)}
          >
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDetailDialog;
