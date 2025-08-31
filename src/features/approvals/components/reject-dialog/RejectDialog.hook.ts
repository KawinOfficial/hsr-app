import { ApprovalContext } from "../approval-provider";
import { useContextSelector } from "use-context-selector";

export const useRejectDialog = () => {
  const rejectOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.rejectOpen
  );
  const setRejectOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.setRejectOpen
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
    rejectOpen,
    setRejectOpen,
    isLoading,
    selectedItem,
    handleApprove,
  };
};
