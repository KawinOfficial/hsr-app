import { ApprovalContext } from "../approval-provider";
import { useContextSelector } from "use-context-selector";

export const useApproveDialog = () => {
  const approveOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.approveOpen
  );
  const setApproveOpen = useContextSelector(
    ApprovalContext,
    (state) => state?.setApproveOpen
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
    approveOpen,
    setApproveOpen,
    isLoading,
    selectedItem,
    handleApprove,
  };
};
