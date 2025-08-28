import { useState } from "react";
import { useHistory } from "@/features/financial/hooks/use-history";

export interface UsePaymentHistory {
  paymentId?: string;
  assetId?: string;
  liabilityId?: string;
}

export const usePaymentHistory = ({
  paymentId,
  assetId,
  liabilityId,
}: UsePaymentHistory) => {
  const [page, setPage] = useState(1);

  const { data: historyList } = useHistory({
    page,
    limit: 10,
    paymentId,
    assetId,
    liabilityId,
  });

  function handlePageChange(page: number) {
    setPage(page);
  }

  return {
    list: historyList?.data ?? [],
    pagination: historyList?.pagination,
    handlePageChange,
  };
};
