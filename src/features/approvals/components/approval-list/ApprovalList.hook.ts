import { ApprovalContext } from "@/features/approvals/components/approval-provider";
import { useContextSelector } from "use-context-selector";
import { ApprovalDetail } from "@/features/approvals/schemas/Approval.schema";
import { PAGE_ROUTES } from "@/routers/page";
import { useRouter } from "next/navigation";

export const useApprovalList = () => {
  const router = useRouter();
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

  function onViewApproval(approval: ApprovalDetail) {
    const isPayment = !!approval.paymentId;
    const isAsset = !!approval.assetId;
    const path = isPayment
      ? PAGE_ROUTES.PAYMENTS
      : isAsset
      ? PAGE_ROUTES.ASSETS
      : PAGE_ROUTES.LIABILITIES;
    const params = ["id", approval.approveItems.approveId].join("=");
    router.push([path, params].join("?"));
  }

  return {
    approvals,
    isLoading,
    getProject,
    getDocumentType,
    handleOpenApprove,
    handleOpenReject,
    handleOpenInReview,
    onViewApproval,
  };
};
