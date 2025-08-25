import { useForm } from "react-hook-form";
import { Category } from "@/features/category/schemas/Category.schema";
import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "../category-provider/CategoryProvider";
import { useEffect } from "react";

const defaultValues: Category = {
  name: "",
  categoryId: "",
  description: "",
  isActive: true,
  budget: 0,
};

export interface UseCategoryForm {
  onClose: () => void;
}

export const useCategoryForm = ({ onClose }: UseCategoryForm) => {
  const selectedCategory = useContextSelector(
    CategoryContext,
    (state) => state?.selectedCategory
  );
  const setSelectedCategory = useContextSelector(
    CategoryContext,
    (state) => state?.setSelectedCategory
  );

  const methods = useForm<Category>({
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  function onSubmit(data: Category) {
    console.log(data);
    onClose();
    setSelectedCategory?.(null);
  }

  function onReset() {
    reset();
  }

  useEffect(() => {
    if (!selectedCategory) {
      reset(defaultValues);
      return;
    }
    reset(selectedCategory);
  }, [selectedCategory]);

  return { methods, onSubmit: handleSubmit(onSubmit), onReset };
};
