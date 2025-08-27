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
  const projectOptions = useContextSelector(
    FinancialContext,
    (context) => context?.projectOptions
  );
  const documentTypes = useContextSelector(
    FinancialContext,
    (context) => context?.documentTypes
  );

  function getProjectName(projectId: string) {
    return projectOptions?.find((project) => project.id === projectId)?.name;
  }

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
    getProjectName,
    getDocumentTypeName,
  };
};
