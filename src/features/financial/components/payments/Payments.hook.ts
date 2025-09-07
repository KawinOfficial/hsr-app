import { useContextSelector } from "use-context-selector";
import { PaymentContext } from "../payment-provider";
import { FinancialContext } from "../financial-provider";

export const usePayments = () => {
  const handleViewPayment = useContextSelector(
    PaymentContext,
    (state) => state?.handleViewPayment
  );
  const handleOpenPayment = useContextSelector(
    PaymentContext,
    (state) => state?.handleOpenPayment
  );
  const payments = useContextSelector(
    PaymentContext,
    (state) => state?.payments
  );
  const isLoading = useContextSelector(
    PaymentContext,
    (state) => state?.isLoading
  );
  const handleChangePage = useContextSelector(
    PaymentContext,
    (state) => state?.handleChangePage
  );
  const handleChangeKeyword = useContextSelector(
    PaymentContext,
    (state) => state?.handleChangeKeyword
  );
  const keyword = useContextSelector(PaymentContext, (state) => state?.keyword);
  const canCreate = useContextSelector(
    FinancialContext,
    (state) => state?.canCreate
  );
  const canDelete = useContextSelector(
    FinancialContext,
    (state) => state?.canDelete
  );

  return {
    handleViewPayment,
    handleOpenPayment,
    list: payments?.data ?? [],
    pagination: payments?.pagination,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
    keyword,
    canCreate,
    canDelete,
  };
};
