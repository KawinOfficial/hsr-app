import { ReportHeader } from "@/features/reports/components/report-header";
import { MetricsOverview } from "@/features/reports/components/metrics-overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calculator, FileText } from "lucide-react";
import { PAGE_ROUTES } from "@/routers/page";
import Link from "next/link";
import { ReportFinancial } from "@/features/reports/components/report-financial";
import { ProjectSummary } from "@/features/reports/components/project-summary";
import { CostAnalysis } from "@/features/reports/components/cost-analysis";

export default async function ReportsPage({
  params,
}: {
  params: { type: string };
}) {
  const { type } = await params;

  return (
    <div className="bg-background">
      <ReportHeader />

      <div className="px-4 sm:px-6 py-8">
        <MetricsOverview />

        <Tabs value={type} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="financial" asChild>
              <Link href={PAGE_ROUTES.REPORTS_FINANCIAL}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Financial Reports
              </Link>
            </TabsTrigger>
            <TabsTrigger value="summary" asChild>
              <Link href={PAGE_ROUTES.REPORTS_SUMMARY}>
                <FileText className="h-4 w-4 mr-2" />
                Project Summary
              </Link>
            </TabsTrigger>
            <TabsTrigger value="cost-analysis" asChild>
              <Link href={PAGE_ROUTES.REPORTS_COST_ANALYSIS}>
                <Calculator className="h-4 w-4 mr-2" />
                Cost Analysis
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="financial">
            <ReportFinancial />
          </TabsContent>
          <TabsContent value="summary">
            <ProjectSummary />
          </TabsContent>
          <TabsContent value="cost-analysis">
            <CostAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
