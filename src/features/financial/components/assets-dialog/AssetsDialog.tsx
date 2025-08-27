"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAssetsDialog } from "./AssetsDialog.hook";
import { AssetsForm } from "../assets-form";

const AssetsDialog = () => {
  const { assetsOpen, setAssetsOpen, handleCloseAssets, selectedId } =
    useAssetsDialog();
  return (
    <Dialog open={assetsOpen} onOpenChange={setAssetsOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background border-b py-4 px-6">
          <DialogTitle>
            {selectedId ? "Edit Asset" : "Create New Asset"}
          </DialogTitle>
          <DialogDescription>
            {selectedId
              ? "Edit the asset details"
              : "Fill in the asset details to start the approval workflow"}
          </DialogDescription>
        </DialogHeader>
        <AssetsForm onClose={handleCloseAssets} />
      </DialogContent>
    </Dialog>
  );
};

export default AssetsDialog;
