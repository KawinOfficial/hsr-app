import { useState } from "react";
import { Workflow } from "@/features/document-types/schemas/Workflow.schema";
import { useOptions } from "@/hooks/use-option";
import { useWorkflow } from "@/features/document-types/hooks/use-workflow";
import { useDebouncedValue } from "@/hooks/use-debouce";

export const useWorkflowProvider = () => {
  const [createWorkflowOpen, setCreateWorkflowOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(
    null
  );
  const [editWorkflowOpen, setEditWorkflowOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const { data: options } = useOptions();
  const { data: workflows, refetch } = useWorkflow({
    page,
    limit: 10,
    keyword: debouncedKeyword,
  });

  function handleWorkflowDialog(id: string) {
    const workflow = workflows?.data?.find((workflow) => workflow.id === id);
    if (!workflow) return;
    setSelectedWorkflow(workflow);
    setWorkflowDialogOpen(true);
  }

  function onChangePage(page: number) {
    setPage(page);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  return {
    createWorkflowOpen,
    setCreateWorkflowOpen,
    workflowDialogOpen,
    setWorkflowDialogOpen,
    selectedWorkflow,
    setSelectedWorkflow,
    handleWorkflowDialog,
    editWorkflowOpen,
    setEditWorkflowOpen,
    options,
    workflows,
    refetch,
    onChangePage,
    handleSearch,
  };
};
