import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "@/features/category/components/category-provider/CategoryProvider";

export const useEditCategoryDialog = () => {
  const editOpen = useContextSelector(
    CategoryContext,
    (state) => state?.editOpen
  );
  const setEditOpen = useContextSelector(
    CategoryContext,
    (state) => state?.setEditOpen
  );

  return { editOpen, setEditOpen };
};
