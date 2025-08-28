import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useEditWorkflowDialog = () => {
  const editWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.editWorkflowOpen
  );
  const setEditWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setEditWorkflowOpen
  );
  const selectedWorkflow = useContextSelector(
    WorkflowContext,
    (state) => state?.selectedWorkflow
  );

  return { editWorkflowOpen, setEditWorkflowOpen, selectedWorkflow };
};
