import { AssetsProvider } from "@/features/financial/components/assets-provider";
import { FinancialProvider } from "@/features/financial/components/financial-provider";
import { LiabilityProvider } from "@/features/financial/components/liability-provider";
import { PaymentProvider } from "@/features/financial/components/payment-provider";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FinancialProvider>
      <PaymentProvider>
        <AssetsProvider>
          <LiabilityProvider>{children}</LiabilityProvider>
        </AssetsProvider>
      </PaymentProvider>
    </FinancialProvider>
  );
}
