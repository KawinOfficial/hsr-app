import { useContextSelector } from "use-context-selector";
import { PaymentContext } from "../payment-provider";

export const usePaymentDialog = () => {
  const paymentOpen = useContextSelector(
    PaymentContext,
    (state) => state?.paymentOpen
  );
  const setPaymentOpen = useContextSelector(
    PaymentContext,
    (state) => state?.setPaymentOpen
  );
  const handleClosePayment = useContextSelector(
    PaymentContext,
    (state) => state?.handleClosePayment
  );
  const selectedId = useContextSelector(
    PaymentContext,
    (state) => state?.selectedId
  );

  return {
    paymentOpen,
    setPaymentOpen,
    handleClosePayment,
    selectedId,
  };
};
