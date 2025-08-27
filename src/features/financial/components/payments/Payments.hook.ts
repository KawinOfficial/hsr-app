import { useContextSelector } from "use-context-selector";
import { PaymentContext } from "../payment-provider";

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

  return {
    handleViewPayment,
    handleOpenPayment,
    list: payments?.data ?? [],
    pagination: payments?.pagination,
    isLoading,
    handleChangePage,
    handleChangeKeyword,
  };
};
