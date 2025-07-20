import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useWorkflowList = () => {
  const workflowTemplates = useContextSelector(
    WorkflowContext,
    (state) => state?.workflowTemplates
  );
  const setCreateWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setCreateWorkflowOpen
  );
  const handleWorkflowDialog = useContextSelector(
    WorkflowContext,
    (state) => state?.handleWorkflowDialog
  );

  return { workflowTemplates, setCreateWorkflowOpen, handleWorkflowDialog };
};
