import { useForm } from "react-hook-form";
import { Category } from "@/features/category/schemas/Category.schema";
import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "../category-provider/CategoryProvider";
import { useEffect } from "react";
import { useCreateCategory } from "@/features/category/hooks/use-create-category";
import { useUpdateCategory } from "@/features/category/hooks/use-update-category";
import { useToast } from "@/hooks/use-toast";

const defaultValues: Category = {
  name: "",
  categoryId: "",
  description: "",
  isActive: true,
  budget: 0,
};

export interface UseCategoryForm {
  id?: string;
  onClose: () => void;
}

export const useCategoryForm = ({ id, onClose }: UseCategoryForm) => {
  const { toast } = useToast();

  const selectedCategory = useContextSelector(
    CategoryContext,
    (state) => state?.selectedCategory
  );
  const setSelectedCategory = useContextSelector(
    CategoryContext,
    (state) => state?.setSelectedCategory
  );
  const refetch = useContextSelector(
    CategoryContext,
    (state) => state?.refetch
  );
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory({ id: id ?? "" });

  const methods = useForm<Category>({
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  function onSubmit(data: Category) {
    if (id) {
      updateCategory(data, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Workflow Updated",
            description: "Your workflow has been updated successfully.",
          });
          refetch?.();
          setSelectedCategory?.(null);
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Category update failed";
          toast({
            variant: "destructive",
            title: "Category Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createCategory(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Category Created",
          description: "Your category has been created successfully.",
        });
        refetch?.();
        onClose();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Category creation failed";
        toast({
          variant: "destructive",
          title: "Category Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    onClose();
    reset(defaultValues);
  }

  useEffect(() => {
    if (!selectedCategory || !id) {
      reset(defaultValues);
      return;
    }
    reset(selectedCategory);
  }, [selectedCategory, reset, id]);

  return { methods, onSubmit: handleSubmit(onSubmit), onReset };
};
