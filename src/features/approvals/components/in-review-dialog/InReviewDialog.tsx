"use client";

import { useInReviewDialog } from "./InReviewDialog.hook";
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

const InReviewDialog = () => {
  const {
    inReviewOpen,
    setInReviewOpen,
    isLoading,
    selectedItem,
    handleApprove,
  } = useInReviewDialog();

  return (
    <Dialog open={inReviewOpen} onOpenChange={setInReviewOpen}>
      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-600 capitalize">
            In Review {selectedItem?.approveItems.approveId}
          </DialogTitle>
          <DialogDescription>
            Change {selectedItem?.approveItems.name} to in review status.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => setInReviewOpen?.(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="warning"
            disabled={isLoading}
            onClick={() => handleApprove?.("inReview")}
          >
            {isLoading ? "Changing..." : "Change"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InReviewDialog;
