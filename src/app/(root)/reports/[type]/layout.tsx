import { ReportProvider } from "@/features/reports/components/report-provider";

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReportProvider>
      <div>{children}</div>
    </ReportProvider>
  );
}
