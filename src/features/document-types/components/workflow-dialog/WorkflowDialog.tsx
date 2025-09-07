"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useWorkflowDialog } from "./WorkflowDialog.hook";
import { Button } from "@/components/ui/button";
import { calculateTotalTimeLimit } from "@/lib/format";

const WorkflowDialog = () => {
  const {
    workflowDialogOpen,
    setWorkflowDialogOpen,
    selectedWorkflow,
    findRoleName,
    handleEditWorkflow,
    canUpdate,
  } = useWorkflowDialog();

  if (!selectedWorkflow) return null;

  return (
    <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{selectedWorkflow.name}</DialogTitle>
          <DialogDescription>
            Workflow ID: {selectedWorkflow.workflowId} • Description:{" "}
            {selectedWorkflow.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground">
                Total Document Types
              </p>
              <p className="text-2xl font-bold text-rail-blue">
                {selectedWorkflow.totalDocs}
              </p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm text-muted-foreground">Total Time Limit</p>
              <p className="text-2xl font-bold text-success-green">
                {calculateTotalTimeLimit(selectedWorkflow.steps)}
              </p>
            </div>
          </div>

          <div>
            <p className="font-medium text-lg">Workflow Steps</p>
            <div className="space-y-4 mt-4">
              {selectedWorkflow.steps.map((step, index) => (
                <div
                  key={`${index}-${step.name}`}
                  className="flex items-start space-x-4"
                >
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
                          <p className="text-sm text-muted-foreground">
                            Step Name
                          </p>
                          <p>{step.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="capitalize">{step.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Assignees
                          </p>
                          <p>{findRoleName(step.userId)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Time Limit
                          </p>
                          <p>
                            {step.timeLimit ? step.timeLimit + " hours" : "-"}
                          </p>
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
          {canUpdate && (
            <Button onClick={handleEditWorkflow}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Workflow
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowDialog;
