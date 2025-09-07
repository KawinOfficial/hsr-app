import { useContextSelector } from "use-context-selector";
import { AssetsContext } from "../assets-provider";
import { FinancialContext } from "../financial-provider";

export const useAssets = () => {
  const handleViewAssets = useContextSelector(
    AssetsContext,
    (state) => state?.handleViewAssets
  );
  const handleOpenAssets = useContextSelector(
    AssetsContext,
    (state) => state?.handleOpenAssets
  );
  const assets = useContextSelector(AssetsContext, (state) => state?.assets);
  const isLoading = useContextSelector(
    AssetsContext,
    (state) => state?.isLoading
  );
  const handleChangeKeyword = useContextSelector(
    AssetsContext,
    (state) => state?.handleChangeKeyword
  );
  const handleChangePage = useContextSelector(
    AssetsContext,
    (state) => state?.handleChangePage
  );
  const documentTypes = useContextSelector(
    FinancialContext,
    (context) => context?.documentTypes
  );
  const keyword = useContextSelector(AssetsContext, (state) => state?.keyword);
  const canCreate = useContextSelector(
    FinancialContext,
    (context) => context?.canCreate
  );
  const canDelete = useContextSelector(
    FinancialContext,
    (context) => context?.canDelete
  );
  function getDocumentTypeName(documentTypeId: string) {
    return documentTypes?.find(
      (documentType) => documentType.id === documentTypeId
    )?.name;
  }

  return {
    list: assets?.data ?? [],
    pagination: assets?.pagination,
    handleViewAssets,
    handleOpenAssets,
    handleChangeKeyword,
    handleChangePage,
    isLoading,
    getDocumentTypeName,
    keyword,
    canCreate,
    canDelete,
  };
};
