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
import { Plus } from "lucide-react";
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
import { useCreateDepartment } from "./CreateDepartments.hook";
import { Controller } from "react-hook-form";
import { locations } from "@/constants/options";

const CreateDepartments = () => {
  const { options, form, onSubmit, isPending, open, setOpen, onReset } =
    useCreateDepartment();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <form id="create-department-form" onSubmit={onSubmit} onReset={onReset}>
          <DialogHeader>
            <DialogTitle>Create New Department</DialogTitle>
            <DialogDescription>
              Add a new department to the organization.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dept-name">Department Name</Label>
              <Input
                id="dept-name"
                placeholder="Department name"
                {...form.fieldName}
              />
            </div>
            <div>
              <Label htmlFor="dept-description">Description</Label>
              <Textarea
                id="dept-description"
                placeholder="Department description"
                {...form.fieldDescription}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dept-head">Department Head</Label>
                <Controller
                  control={form.control}
                  name="headId"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select head" />
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
                <Label htmlFor="dept-budget">Budget (THB)</Label>
                <Input
                  id="dept-budget"
                  type="number"
                  placeholder="0"
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
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="reset"
              variant="outline"
              form="create-department-form"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              form="create-department-form"
            >
              {isPending ? "Creating..." : "Create Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartments;
