"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PHASE_OPTIONS,
  PRIORITY_OPTIONS,
} from "@/features/milestones/constants/options";
import { useMilestoneForm } from "./MilestoneForm.hook";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2 } from "lucide-react";

const MilestoneForm = () => {
  const {
    form,
    onSubmit,
    fields,
    onRemoveResponsibility,
    onAddResponsibility,
    onReset,
  } = useMilestoneForm();

  return (
    <form
      className="space-y-4 mt-4 max-h-[75vh] overflow-y-auto p-4 pt-0"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="milestone-title">Milestone Title</Label>
          <Input id="milestone-title" placeholder="Enter milestone title" />
        </div>

        <div>
          <Label htmlFor="milestone-id">Milestone ID</Label>
          <Input id="milestone-id" placeholder="Enter milestone id" />
        </div>

        <div>
          <Label htmlFor="milestone-project">Project</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: "1", label: "Project 1" }].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="milestone-status">Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {[{ value: "1", label: "Status 1" }].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label htmlFor="milestone-description">Description</Label>
          <Textarea
            id="milestone-description"
            placeholder="Enter milestone description"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="milestone-phase">Phase</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              {PHASE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="milestone-priority">Priority</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="milestone-budget">Budget (THB)</Label>
          <Input id="milestone-budget" type="number" placeholder="0" />
        </div>

        <div>
          <Label htmlFor="milestone-actual-cost">Actual Cost (THB)</Label>
          <Input id="milestone-actual-cost" type="number" placeholder="0" />
        </div>

        <div>
          <Label htmlFor="milestone-start">Start Date</Label>
          <Input id="milestone-start" type="date" />
        </div>

        <div>
          <Label htmlFor="milestone-target">Target Date</Label>
          <Input id="milestone-target" type="date" />
        </div>

        <div className="col-span-2">
          <Label>Key Responsibilities</Label>
          <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...form.register(`deliverables.${index}.name`)}
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

      <div className="pt-4 flex justify-end gap-2 sticky bottom-0 bg-white">
        <Button variant="outline" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Create Milestone
        </Button>
      </div>
    </form>
  );
};

export default MilestoneForm;
