import { useApprovals } from "@/features/approvals/hooks/use-approvals";
import { useDocumentTypeOptions, useProjectOptions } from "@/hooks/use-option";
import { useState } from "react";
import {
  ApprovalDetail,
  ApproveForm,
} from "@/features/approvals/schemas/Approval.schema";
import { useApprove } from "@/features/approvals/hooks/use-approve";
import { useToast } from "@/hooks/use-toast";

export const useApprovalProvider = () => {
  const { toast } = useToast();
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [inReviewOpen, setInReviewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApprovalDetail | null>(null);
  const [remark, setRemark] = useState<string | null>(
    selectedItem?.remark ?? ""
  );
  const { data: approvals, isLoading, refetch } = useApprovals();
  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();
  const { mutate: mutateApprove, isPending: isLoadingApprove } = useApprove();

  function handleOpenApprove(item: ApprovalDetail) {
    setApproveOpen(true);
    setRejectOpen(false);
    setInReviewOpen(false);
    setSelectedItem(item);
  }

  function handleOpenReject(item: ApprovalDetail) {
    setRejectOpen(true);
    setApproveOpen(false);
    setInReviewOpen(false);
    setSelectedItem(item);
  }

  function onChangeRemark(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setRemark(e.target.value);
  }

  function handleOpenInReview(item: ApprovalDetail) {
    setInReviewOpen(true);
    setApproveOpen(false);
    setRejectOpen(false);
    setSelectedItem(item);
  }

  function handleApprove(type: "approve" | "reject" | "inReview") {
    const payload: ApproveForm = {
      id: selectedItem?.id ?? "",
      documentTypesId: selectedItem?.approveItems?.documentTypesId ?? "",
      isRejected: type === "reject",
      isInReview: type === "inReview",
      remark: type === "reject" ? remark : selectedItem?.remark || "",
    };

    mutateApprove(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Approval updated",
        });
        setApproveOpen(false);
        setRejectOpen(false);
        setInReviewOpen(false);
        setSelectedItem(null);
        refetch();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      },
    });
  }

  return {
    approvals,
    isLoading,
    documentTypes,
    projectOptions,
    approveOpen,
    selectedItem,
    rejectOpen,
    inReviewOpen,
    isLoadingApprove,
    remark,
    onChangeRemark,
    setRejectOpen,
    setInReviewOpen,
    setApproveOpen,
    handleOpenApprove,
    handleOpenReject,
    handleOpenInReview,
    handleApprove,
  };
};
