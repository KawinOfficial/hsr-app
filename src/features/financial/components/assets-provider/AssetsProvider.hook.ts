import { useDebouncedValue } from "@/hooks/use-debouce";
import { useState } from "react";
import { useAssetsList } from "@/features/financial/hooks/use-assets";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "../financial-provider";
import { useSearchParams } from "next/navigation";

export const useAssetsProvider = () => {
  const params = useSearchParams();

  const selectedProject = useContextSelector(
    FinancialContext,
    (state) => state?.selectedProject
  );

  const [assetsOpen, setAssetsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(params.get("id") ?? "");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const {
    data: assets,
    isLoading,
    refetch,
  } = useAssetsList({
    page,
    limit: 10,
    keyword: debouncedKeyword,
    projectId: selectedProject ?? "",
  });

  function handleChangePage(page: number) {
    setPage(page);
  }

  function handleChangeKeyword(keyword: string) {
    setKeyword(keyword);
  }

  function handleOpenAssets() {
    setAssetsOpen(true);
    setSelectedId(undefined);
  }

  function handleCloseAssets() {
    setAssetsOpen(false);
  }

  function handleViewAssets(id: string) {
    setSelectedId(id);
    setAssetsOpen(true);
  }

  return {
    assetsOpen,
    setAssetsOpen,
    selectedId,
    handleOpenAssets,
    handleCloseAssets,
    handleViewAssets,
    assets,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
    refetch,
    keyword,
  };
};
