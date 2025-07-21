import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialOverview } from "@/features/financial/components/financial-overview";
import Assets from "@/features/financial/components/assets/Assets";
import Liability from "@/features/financial/components/liability/Liability";
import { Payments } from "@/features/financial/components/payments";
import { PAGE_ROUTES } from "@/routers/page";
import { Banknote, Building2, Receipt } from "lucide-react";
import Link from "next/link";
import DetailViewDialog from "@/features/financial/components/detail-view-dialog/DetailViewDialog";
import { CreateDocumentDialog } from "@/features/financial/components/create-document-dialog";

export default async function PaymentsPage({
  params,
}: {
  params: Promise<{ type?: string }>;
}) {
  const { type } = await params;

  return (
    <div className="bg-background">
      <PageHeader
        title="Financial Management"
        subTitle="Manage payments, assets, and liabilities for the HSR project"
      />

      <div className="px-4 sm:px-6 py-8">
        <FinancialOverview />

        <Tabs value={type} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="management" asChild>
              <Link href={PAGE_ROUTES.PAYMENTS}>
                <Banknote className="h-4 w-4 mr-2" />
                Payments
              </Link>
            </TabsTrigger>
            <TabsTrigger value="assets" asChild>
              <Link href={PAGE_ROUTES.ASSETS}>
                <Building2 className="h-4 w-4 mr-2" />
                Assets
              </Link>
            </TabsTrigger>
            <TabsTrigger value="liabilities" asChild>
              <Link href={PAGE_ROUTES.LIABILITIES}>
                <Receipt className="h-4 w-4 mr-2" />
                Liabilities
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="management" className="space-y-6">
            <Payments />
          </TabsContent>
          <TabsContent value="assets" className="space-y-6">
            <Assets />
          </TabsContent>
          <TabsContent value="liabilities" className="space-y-6">
            <Liability />
          </TabsContent>
        </Tabs>
      </div>

      <DetailViewDialog />
      <CreateDocumentDialog />
    </div>
  );
}
