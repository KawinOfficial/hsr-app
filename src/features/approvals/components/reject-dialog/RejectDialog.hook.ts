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
  const remark = useContextSelector(ApprovalContext, (state) => state?.remark);
  const onChangeRemark = useContextSelector(
    ApprovalContext,
    (state) => state?.onChangeRemark
  );

  return {
    rejectOpen,
    setRejectOpen,
    isLoading,
    selectedItem,
    handleApprove,
    remark,
    onChangeRemark,
  };
};
