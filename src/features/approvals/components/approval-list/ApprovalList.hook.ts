import { ApprovalContext } from "@/features/approvals/components/approval-provider";
import { useContextSelector } from "use-context-selector";

export const useApprovalList = () => {
  const approvals = useContextSelector(
    ApprovalContext,
    (context) => context?.approvals
  );
  const isLoading = useContextSelector(
    ApprovalContext,
    (context) => context?.isLoading
  );
  const projectOptions = useContextSelector(
    ApprovalContext,
    (context) => context?.projectOptions
  );
  const documentTypes = useContextSelector(
    ApprovalContext,
    (context) => context?.documentTypes
  );
  const handleOpenApprove = useContextSelector(
    ApprovalContext,
    (context) => context?.handleOpenApprove
  );
  const handleOpenReject = useContextSelector(
    ApprovalContext,
    (context) => context?.handleOpenReject
  );
  const handleOpenInReview = useContextSelector(
    ApprovalContext,
    (context) => context?.handleOpenInReview
  );

  function getProject(value: string) {
    const project = projectOptions?.find((option) => option.value === value);
    return project?.label || "-";
  }

  function getDocumentType(value: string) {
    const documentType = documentTypes?.find(
      (option) => option.value === value
    );
    return documentType?.label || "-";
  }

  return {
    approvals,
    isLoading,
    getProject,
    getDocumentType,
    handleOpenApprove,
    handleOpenReject,
    handleOpenInReview,
  };
};
