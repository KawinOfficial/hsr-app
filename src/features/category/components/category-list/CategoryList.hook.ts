import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "@/features/category/components/category-provider/CategoryProvider";

export const useCategoryList = () => {
  const categories = useContextSelector(
    CategoryContext,
    (state) => state?.categories
  );
  const onOpenCreate = useContextSelector(
    CategoryContext,
    (state) => state?.onOpenCreate
  );
  const onEditCategory = useContextSelector(
    CategoryContext,
    (state) => state?.onEditCategory
  );

  return { categories, onOpenCreate, onEditCategory };
};
