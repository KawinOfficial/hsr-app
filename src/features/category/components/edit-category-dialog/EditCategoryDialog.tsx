"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEditCategoryDialog } from "./EditCategoryDialog.hook";
import { CategoryForm } from "@/features/category/components/category-form";

const EditCategoryDialog = () => {
  const { editOpen, setEditOpen } = useEditCategoryDialog();

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Edit the cost category for your project
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <CategoryForm onClose={() => setEditOpen?.(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
