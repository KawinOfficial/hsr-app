import { useDebouncedValue } from "@/hooks/use-debouce";
import { useState } from "react";
import { useLiabilitiesList } from "@/features/financial/hooks/use-liability";
import { FinancialContext } from "../financial-provider";
import { useContextSelector } from "use-context-selector";

export const useLiabilityProvider = () => {
  const selectedProject = useContextSelector(
    FinancialContext,
    (state) => state?.selectedProject
  );

  const [liabilityOpen, setLiabilityOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const {
    data: liabilities,
    isLoading,
    refetch,
  } = useLiabilitiesList({
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

  function handleOpenLiability() {
    setLiabilityOpen(true);
    setSelectedId(undefined);
  }

  function handleCloseLiability() {
    setLiabilityOpen(false);
  }

  function handleViewLiability(id: string) {
    setSelectedId(id);
    setLiabilityOpen(true);
  }

  return {
    liabilityOpen,
    setLiabilityOpen,
    selectedId,
    handleOpenLiability,
    handleCloseLiability,
    handleViewLiability,
    liabilities,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
    refetch,
  };
};
