"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEditWorkflowDialog } from "./EditWorkflowDialog.hook";
import { WorkflowForm } from "@/features/document-types/components/workflow-form";

const EditWorkflowDialog = () => {
  const { editWorkflowOpen, setEditWorkflowOpen, selectedWorkflow } =
    useEditWorkflowDialog();

  return (
    <Dialog open={editWorkflowOpen} onOpenChange={setEditWorkflowOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Edit Workflow</DialogTitle>
          <DialogDescription>Edit the workflow template</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <WorkflowForm
            onClose={() => setEditWorkflowOpen?.(false)}
            id={selectedWorkflow?.id}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkflowDialog;
