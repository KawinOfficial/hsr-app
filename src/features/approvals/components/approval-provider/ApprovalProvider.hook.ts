import { useApprovals } from "@/features/approvals/hooks/use-approvals";
import { useDocumentTypeOptions, useProjectOptions } from "@/hooks/use-option";

export const useApprovalProvider = () => {
  const { data: approvals, isLoading } = useApprovals();
  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();

  return {
    approvals,
    isLoading,
    documentTypes,
    projectOptions,
  };
};
