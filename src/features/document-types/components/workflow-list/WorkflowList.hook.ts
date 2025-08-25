import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";
import { WorkflowStep } from "@/features/document-types/schemas/Workflow.schema";

export const useWorkflowList = () => {
  const setCreateWorkflowOpen = useContextSelector(
    WorkflowContext,
    (state) => state?.setCreateWorkflowOpen
  );
  const handleWorkflowDialog = useContextSelector(
    WorkflowContext,
    (state) => state?.handleWorkflowDialog
  );
  const workflows = useContextSelector(
    WorkflowContext,
    (state) => state?.workflows
  );
  const onChangePage = useContextSelector(
    WorkflowContext,
    (state) => state?.onChangePage
  );
  const handleSearch = useContextSelector(
    WorkflowContext,
    (state) => state?.handleSearch
  );

  function calculateTotalTimeLimit(steps: WorkflowStep[]) {
    return steps.reduce((acc, step) => acc + Number(step.timeLimit), 0);
  }

  return {
    setCreateWorkflowOpen,
    handleWorkflowDialog,
    list: workflows?.data ?? [],
    pagination: workflows?.pagination,
    onChangePage,
    handleSearch,
    calculateTotalTimeLimit,
  };
};
