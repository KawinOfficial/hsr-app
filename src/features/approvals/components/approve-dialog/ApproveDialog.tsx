"use client";

import { useApproveDialog } from "./ApproveDialog.hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ApproveDialog = () => {
  const {
    approveOpen,
    setApproveOpen,
    isLoading,
    selectedItem,
    handleApprove,
  } = useApproveDialog();

  return (
    <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600 capitalize">
            Approve {selectedItem?.approveItems.approveId}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this{" "}
            {selectedItem?.approveItems.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => setApproveOpen?.(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="success"
            disabled={isLoading}
            onClick={() => handleApprove?.("approve")}
          >
            {isLoading ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveDialog;
