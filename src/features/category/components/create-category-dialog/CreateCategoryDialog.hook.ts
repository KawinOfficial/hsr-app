import { useContextSelector } from "use-context-selector";
import { CategoryContext } from "@/features/category/components/category-provider/CategoryProvider";

export const useCreateCategoryDialog = () => {
  const createOpen = useContextSelector(
    CategoryContext,
    (state) => state?.createOpen
  );
  const setCreateOpen = useContextSelector(
    CategoryContext,
    (state) => state?.setCreateOpen
  );

  return { createOpen, setCreateOpen };
};
