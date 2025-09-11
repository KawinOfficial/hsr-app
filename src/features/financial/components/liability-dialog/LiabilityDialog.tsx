"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLiabilityDialog } from "./LiabilityDialog.hook";
import { LiabilityForm } from "../liability-form";

const LiabilityDialog = () => {
  const { liabilityOpen, setLiabilityOpen, handleCloseLiability, selectedId } =
    useLiabilityDialog();
  return (
    <Dialog open={liabilityOpen} onOpenChange={setLiabilityOpen}>
      <DialogContent className="max-w-[90vw] lg:max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6">
          <DialogTitle>
            {selectedId ? "Edit Liability" : "Create New Liability"}
          </DialogTitle>
          <DialogDescription>
            {selectedId
              ? "Edit the liability details"
              : "Fill in the liability details to start the approval workflow"}
          </DialogDescription>
        </DialogHeader>
        <LiabilityForm onClose={handleCloseLiability} />
      </DialogContent>
    </Dialog>
  );
};

export default LiabilityDialog;
