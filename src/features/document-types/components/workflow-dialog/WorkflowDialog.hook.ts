import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";
import { DocumentContext } from "../document-provider/DocumentProvider";

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
  const options = useContextSelector(
    WorkflowContext,
    (state) => state?.options
  );
  const setEditWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setEditWorkflowOpen
  );
  const canUpdate = useContextSelector(
    DocumentContext,
    (state) => state?.canUpdate
  );

  function findRoleName(roleId: string) {
    return options?.users.find((role) => role.value === roleId)?.label;
  }

  function handleEditWorkflow() {
    setEditWorkflowOpen?.(true);
    setWorkflowDialogOpen?.(false);
  }

  return {
    workflowDialogOpen,
    setWorkflowDialogOpen,
    selectedWorkflow,
    findRoleName,
    handleEditWorkflow,
    canUpdate,
  };
};
