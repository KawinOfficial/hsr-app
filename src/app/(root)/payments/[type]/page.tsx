"use client";

import PageHeader from "@/components/layout/page-haeder/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinancialOverview } from "@/features/financial/components/financial-overview";
import Assets from "@/features/financial/components/assets/Assets";
import Liability from "@/features/financial/components/liability/Liability";
import { Payments } from "@/features/financial/components/payments";
import { PAGE_ROUTES } from "@/routers/page";
import { Banknote, Building2, Receipt } from "lucide-react";
import Link from "next/link";
import { PaymentDialog } from "@/features/financial/components/payment-dialog";
import AssetsDialog from "@/features/financial/components/assets-dialog/AssetsDialog";
import LiabilityDialog from "@/features/financial/components/liability-dialog/LiabilityDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContextSelector } from "use-context-selector";
import { FinancialContext } from "@/features/financial/components/financial-provider";
import { useParams } from "next/navigation";

export default function PaymentsPage() {
  const { type } = useParams<{ type: string }>();
  const projectOptions = useContextSelector(
    FinancialContext,
    (state) => state?.projectOptions
  );
  const onSelectProject = useContextSelector(
    FinancialContext,
    (state) => state?.onSelectProject
  );
  const selectedProject = useContextSelector(
    FinancialContext,
    (state) => state?.selectedProject
  );

  return (
    <div className="bg-background">
      <PageHeader
        title="Financial Management"
        subTitle="Manage payments, assets, and liabilities for the HSR project"
      >
        <Select
          onValueChange={onSelectProject}
          value={selectedProject ?? "all"}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All project" />
          </SelectTrigger>
          <SelectContent>
            {[
              { value: "all", label: "All project" },
              ...(projectOptions ?? []),
            ]?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <div className="px-4 sm:px-6 py-8">
        <FinancialOverview />

        <Tabs value={type ?? "management"} className="space-y-6">
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

      <PaymentDialog />
      <AssetsDialog />
      <LiabilityDialog />
    </div>
  );
}
