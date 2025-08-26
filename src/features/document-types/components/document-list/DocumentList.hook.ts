import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";
import { useMemo } from "react";

export const useDocumentList = () => {
  const documentTypesData = useContextSelector(
    DocumentContext,
    (state) => state?.documentTypesData
  );
  const isLoading = useContextSelector(
    DocumentContext,
    (state) => state?.isLoading
  );
  const onOpenCreate = useContextSelector(
    DocumentContext,
    (state) => state?.onOpenCreate
  );
  const handleDetailView = useContextSelector(
    DocumentContext,
    (state) => state?.handleDetailView
  );
  const onChangePage = useContextSelector(
    DocumentContext,
    (state) => state?.onChangePage
  );
  const handleSearch = useContextSelector(
    DocumentContext,
    (state) => state?.handleSearch
  );
  const onChangeCategory = useContextSelector(
    DocumentContext,
    (state) => state?.onChangeCategory
  );
  const categories = useContextSelector(
    DocumentContext,
    (state) => state?.categories
  );

  const categoriesOptions = useMemo(() => {
    const options =
      categories?.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? [];
    return [
      {
        label: "All",
        value: "all",
      },
      ...options,
    ];
  }, [categories]);

  return {
    list: documentTypesData?.data ?? [],
    pagination: documentTypesData?.pagination,
    isLoading,
    onOpenCreate,
    handleDetailView,
    onChangePage,
    handleSearch,
    onChangeCategory,
    categoriesOptions,
  };
};
