import { useDebouncedValue } from "@/hooks/use-debouce";
import { useState } from "react";
import { usePaymentList } from "@/features/financial/hooks/use-payment";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "@/features/financial/components/financial-provider";

export const usePaymentProvider = () => {
  const selectedProject = useContextSelector(
    FinancialContext,
    (state) => state?.selectedProject
  );

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const {
    data: payments,
    isLoading,
    refetch,
  } = usePaymentList({
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

  function handleOpenPayment() {
    setPaymentOpen(true);
    setSelectedId(undefined);
  }

  function handleClosePayment() {
    setPaymentOpen(false);
  }

  function handleViewPayment(id: string) {
    setSelectedId(id);
    setPaymentOpen(true);
  }

  return {
    paymentOpen,
    setPaymentOpen,
    selectedId,
    handleOpenPayment,
    handleClosePayment,
    handleViewPayment,
    payments,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
    refetch,
  };
};
