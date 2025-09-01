import { useContextSelector } from "use-context-selector";
import { LiabilityContext } from "../liability-provider";
import { FinancialContext } from "../financial-provider";

export const useLiability = () => {
  const handleViewLiability = useContextSelector(
    LiabilityContext,
    (state) => state?.handleViewLiability
  );
  const handleOpenLiability = useContextSelector(
    LiabilityContext,
    (state) => state?.handleOpenLiability
  );
  const liabilities = useContextSelector(
    LiabilityContext,
    (state) => state?.liabilities
  );
  const isLoading = useContextSelector(
    LiabilityContext,
    (state) => state?.isLoading
  );
  const handleChangePage = useContextSelector(
    LiabilityContext,
    (state) => state?.handleChangePage
  );
  const handleChangeKeyword = useContextSelector(
    LiabilityContext,
    (state) => state?.handleChangeKeyword
  );
  const documentTypes = useContextSelector(
    FinancialContext,
    (context) => context?.documentTypes
  );
  const keyword = useContextSelector(
    LiabilityContext,
    (state) => state?.keyword
  );

  function getDocumentTypeName(documentTypeId: string) {
    return documentTypes?.find(
      (documentType) => documentType.id === documentTypeId
    )?.name;
  }

  return {
    handleViewLiability,
    handleOpenLiability,
    list: liabilities?.data ?? [],
    pagination: liabilities?.pagination,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
    getDocumentTypeName,
    keyword,
  };
};
