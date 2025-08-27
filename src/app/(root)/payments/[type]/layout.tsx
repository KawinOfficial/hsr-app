import { FinancialProvider } from "@/features/financial/components/financial-provider";
import { PaymentProvider } from "@/features/financial/components/payment-provider";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FinancialProvider>
      <PaymentProvider>{children}</PaymentProvider>
    </FinancialProvider>
  );
}
