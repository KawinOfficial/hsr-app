import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useWorkflowDialog = () => {
  const workflowDialogOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.workflowDialogOpen
  );
  const setWorkflowDialogOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setWorkflowDialogOpen
  );
  const selectedWorkflow = useContextSelector(
    WorkflowContext,
    (state) => state?.selectedWorkflow
  );

  return { workflowDialogOpen, setWorkflowDialogOpen, selectedWorkflow };
};
