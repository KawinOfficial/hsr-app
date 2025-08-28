"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCreateCategoryDialog } from "./CreateCategoryDialog.hook";
import { CategoryForm } from "@/features/category/components/category-form";

const CreateCategoryDialog = () => {
  const { createOpen, setCreateOpen } = useCreateCategoryDialog();

  return (
    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Create a new cost category for your project
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <CategoryForm onClose={() => setCreateOpen?.(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
