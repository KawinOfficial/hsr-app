import { useContextSelector } from "use-context-selector";
import { WorkflowContext } from "@/features/document-types/components/workflow-provider";
import { DocumentContext } from "../document-provider/DocumentProvider";

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
  const canCreate = useContextSelector(
    DocumentContext,
    (state) => state?.canCreate
  );

  return {
    setCreateWorkflowOpen,
    handleWorkflowDialog,
    list: workflows?.data ?? [],
    pagination: workflows?.pagination,
    onChangePage,
    handleSearch,
    canCreate,
  };
};
