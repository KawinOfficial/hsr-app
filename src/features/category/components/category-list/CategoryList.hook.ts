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
  const isLoading = useContextSelector(
    CategoryContext,
    (state) => state?.isLoading
  );
  const onChangePage = useContextSelector(
    CategoryContext,
    (state) => state?.onChangePage
  );
  const handleSearch = useContextSelector(
    CategoryContext,
    (state) => state?.handleSearch
  );
  const canCreate = useContextSelector(
    CategoryContext,
    (state) => state?.canCreate
  );
  const canDelete = useContextSelector(
    CategoryContext,
    (state) => state?.canDelete
  );
  const canUpdate = useContextSelector(
    CategoryContext,
    (state) => state?.canUpdate
  );

  return {
    list: categories?.data ?? [],
    pagination: categories?.pagination,
    onOpenCreate,
    onEditCategory,
    isLoading,
    onChangePage,
    handleSearch,
    canCreate,
    canDelete,
    canUpdate,
  };
};
