import { FinancialProvider } from "@/features/financial/components/financial-provider";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FinancialProvider>{children}</FinancialProvider>;
}
