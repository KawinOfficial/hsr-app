import { ApprovalContext } from "../approval-provider";
import { useContextSelector } from "use-context-selector";

export const useInReviewDialog = () => {
  const inReviewOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.inReviewOpen
  );
  const setInReviewOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.setInReviewOpen
  );
  const selectedItem = useContextSelector(
    ApprovalContext,
    (state) => state?.selectedItem
  );
  const handleApprove = useContextSelector(
    ApprovalContext,
    (state) => state?.handleApprove
  );
  const isLoading = useContextSelector(
    ApprovalContext,
    (state) => state?.isLoadingApprove
  );

  return {
    inReviewOpen,
    setInReviewOpen,
    isLoading,
    selectedItem,
    handleApprove,
  };
};
