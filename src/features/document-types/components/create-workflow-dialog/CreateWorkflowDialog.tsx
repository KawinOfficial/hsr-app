"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Save, X } from "lucide-react";
import { useCreateWorkflowDialog } from "./CreateWorkflowDialog.hook";
import {
  ROLES,
  TIME_LIMITS,
  WORKFLOW_STEPS,
  CATEGORIES,
} from "@/features/document-types/constants/options";

const CreateWorkflowDialog = () => {
  const { createWorkflowOpen, setCreateWorkflowOpen } =
    useCreateWorkflowDialog();

  return (
    <Dialog open={createWorkflowOpen} onOpenChange={setCreateWorkflowOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Design a new approval workflow template
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input id="workflow-name" placeholder="e.g., Contract Approval" />
            </div>
            <div>
              <Label htmlFor="workflow-category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="workflow-description">Description</Label>
            <Textarea
              id="workflow-description"
              placeholder="Describe the workflow purpose and process"
              rows={3}
            />
          </div>

          {/* Workflow Steps Configuration */}
          <div>
            <Label className="text-base font-medium">Workflow Steps</Label>
            <div className="space-y-4 mt-4">
              {[1, 2, 3].map((stepNum) => (
                <Card key={stepNum} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Step {stepNum}</h4>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`step-${stepNum}-name`}>
                          Step Name
                        </Label>
                        <Input
                          id={`step-${stepNum}-name`}
                          placeholder="e.g., Manager Review"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`step-${stepNum}-type`}>Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {WORKFLOW_STEPS.map((step) => (
                              <SelectItem key={step.value} value={step.value}>
                                {step.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`step-${stepNum}-role`}>
                          Assigned Role
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLES.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`step-${stepNum}-time`}>
                          Time Limit
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time limit" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_LIMITS.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setCreateWorkflowOpen?.(false)}
          >
            Cancel
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
