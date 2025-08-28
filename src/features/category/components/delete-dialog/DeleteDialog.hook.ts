import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "../category-provider/CategoryProvider";
import { useDeleteCategory } from "@/features/category/hooks/use-delete-category";

export interface UseDeleteDialog {
  id: string;
}

export const useDeleteDialog = ({ id }: UseDeleteDialog) => {
  const { toast } = useToast();

  const refetch = useContextSelector(
    CategoryContext,
    (state) => state?.refetch
  );
  const [open, setOpen] = useState(false);
  const { mutate: deleteCategory, isPending } = useDeleteCategory({ id });

  function onDelete() {
    deleteCategory(undefined, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Category Deleted",
          description: "Your category has been deleted successfully.",
        });
        setOpen(false);
        refetch?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Category Deletion Failed",
          description: errorMessage,
        });
      },
    });
  }

  return { open, setOpen, onDelete, isLoading: isPending };
};
