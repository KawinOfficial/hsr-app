"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCreateWorkflowDialog } from "./CreateWorkflowDialog.hook";
import { WorkflowForm } from "@/features/document-types/components/workflow-form";

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
          <WorkflowForm onClose={() => setCreateWorkflowOpen?.(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
