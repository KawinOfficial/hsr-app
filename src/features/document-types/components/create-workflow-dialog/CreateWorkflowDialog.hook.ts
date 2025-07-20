import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";

export const useCreateWorkflowDialog = () => {
  const createWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.createWorkflowOpen
  );
  const setCreateWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setCreateWorkflowOpen
  );

  return { createWorkflowOpen, setCreateWorkflowOpen };
};
