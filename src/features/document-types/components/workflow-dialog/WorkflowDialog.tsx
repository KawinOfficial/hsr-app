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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { useWorkflowDialog } from "./WorkflowDialog.hook";
import { Button } from "@/components/ui/button";

const WorkflowDialog = () => {
  const { workflowDialogOpen, setWorkflowDialogOpen, selectedWorkflow } =
    useWorkflowDialog();

  if (!selectedWorkflow) return null;

  return (
    <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{selectedWorkflow.name}</DialogTitle>
          <DialogDescription>
            Workflow ID: {selectedWorkflow.id} • Category:{" "}
            {selectedWorkflow.category}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Executions</p>
              <p className="text-2xl font-bold text-rail-blue">
                {selectedWorkflow.totalExecutions}
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-success-green">
                {selectedWorkflow.successRate}%
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Completion</p>
              <p className="text-2xl font-bold text-construction-orange">
                {selectedWorkflow.averageCompletionTime}
              </p>
            </div>
          </div>

          <div>
            <Label className="font-medium text-lg">Workflow Steps</Label>
            <div className="space-y-4 mt-4">
              {selectedWorkflow.steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-rail-blue text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < selectedWorkflow.steps.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mx-auto mt-2" />
                    )}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Label className="font-medium">{step.name}</Label>
                          <p className="text-sm text-muted-foreground">
                            Type: {step.type}
                          </p>
                        </div>
                        <div>
                          <Label className="font-medium">Assigned Role</Label>
                          <p className="text-sm text-muted-foreground">
                            {step.assignedRole}
                          </p>
                        </div>
                        <div>
                          <Label className="font-medium">Assignees</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {step.assignedUsers.map((user: string) => (
                              <Badge
                                key={user}
                                variant="outline"
                                className="text-xs"
                              >
                                {user}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="font-medium">Time Limit</Label>
                          <p className="text-sm text-muted-foreground">
                            {step.timeLimit}
                          </p>
                          {step.conditions.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Conditions: {step.conditions.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setWorkflowDialogOpen?.(false)}
          >
            Close
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowDialog;
