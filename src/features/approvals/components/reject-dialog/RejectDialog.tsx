"use client";

import { useRejectDialog } from "./RejectDialog.hook";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RejectDialog = () => {
  const { rejectOpen, setRejectOpen, isLoading, selectedItem, handleApprove } =
    useRejectDialog();

  return (
    <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
      <DialogContent className="max-w-md p-6 space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 capitalize">
            Reject {selectedItem?.approveItems.approveId}
          </DialogTitle>
          <DialogDescription>
            {selectedItem?.approveItems.name}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label>Reason for Rejection</Label>
          <Textarea />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => setRejectOpen?.(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={() => handleApprove?.("reject")}
          >
            {isLoading ? "Rejecting..." : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectDialog;
