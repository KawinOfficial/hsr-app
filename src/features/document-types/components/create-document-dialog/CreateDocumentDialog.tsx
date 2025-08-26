"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateDocumentDialog } from "./CreateDocumentDialog.hook";
import DocumentForm from "@/features/document-types/components/document-form/DocumentForm";

const CreateDocumentDialog = () => {
  const { createOpen, setCreateOpen, selectedDocumentType } =
    useCreateDocumentDialog();

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle>
            {selectedDocumentType
              ? "Edit Document Type"
              : "Create New Document Type"}
          </DialogTitle>
          <DialogDescription>
            {selectedDocumentType
              ? "Edit document type and assign an approval workflow"
              : "Define a new document type and assign an approval workflow"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <DocumentForm onClose={() => setCreateOpen?.(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentDialog;
