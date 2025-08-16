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
import { Controller } from "react-hook-form";
import { locations } from "@/constants/options";
import { statusOptions } from "@/features/departments/constants/status";

const DepartmentDetailDialog = () => {
  const {
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    options,
    form,
    onSubmit,
    isUpdating,
    fields,
    onAddResponsibility,
    onRemoveResponsibility,
    onReset,
  } = useDepartmentDetailDialog();

  if (!selectedDepartment) return null;

  return (
    <Dialog open={departmentEditOpen} onOpenChange={setDepartmentEditOpen}>
      <DialogContent className="max-w-lg p-6">
        <form id="edit-department-form" onSubmit={onSubmit} onReset={onReset}>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-dept-name">Department Name</Label>
              <Input id="edit-dept-name" {...form.fieldName} />
            </div>
            <div>
              <Label htmlFor="edit-dept-description">Description</Label>
              <Textarea
                id="edit-dept-description"
                {...form.fieldDescription}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dept-head">Department Head</Label>
                <Controller
                  control={form.control}
                  name="headId"
                  render={({ field }) => (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {options?.users.map((user) => (
                          <SelectItem key={user.value} value={user.value}>
                            {user.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="edit-dept-budget">Budget (THB)</Label>
                <Input
                  id="edit-dept-budget"
                  type="number"
                  {...form.fieldBudget}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-dept-location">Location</Label>
              <Controller
                control={form.control}
                name="location"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label>Key Responsibilities</Label>
              <div className="space-y-2 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Input
                      {...form.register(`keyResponsibilities.${index}.value`)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveResponsibility(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onAddResponsibility}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="reset" variant="outline" form="edit-department-form">
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-department-form"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDetailDialog;
