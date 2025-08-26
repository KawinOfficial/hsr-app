import { useContextSelector } from "use-context-selector";
import { DocumentContext } from "@/features/document-types/components/document-provider";

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

  return {
    list: documentTypesData?.data ?? [],
    pagination: documentTypesData?.pagination,
    isLoading,
    onOpenCreate,
    handleDetailView,
    onChangePage,
  };
};
