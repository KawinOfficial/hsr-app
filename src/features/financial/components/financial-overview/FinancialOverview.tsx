"use client";

import { formatCurrency } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, Clock, DollarSign } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { useFinancialOverview } from "./FinancialOverview.hook";

const FinancialOverview = () => {
  const { financialSummary } = useFinancialOverview();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Budget
          </CardTitle>
          <DollarSign className="h-5 w-5 text-rail-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialSummary?.totalBudget ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">Project allocation</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Paid
          </CardTitle>
          <ArrowDownRight className="h-5 w-5 text-construction-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialSummary?.totalPaid ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {(
              ((financialSummary?.totalPaid ?? 0) /
                (financialSummary?.totalBudget ?? 0)) *
              100
            ).toFixed(1)}
            % of budget
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending Payments
          </CardTitle>
          <Clock className="h-5 w-5 text-warning-amber" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialSummary?.pendingPayments ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">Awaiting processing</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Cash Flow
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-success-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialSummary?.cashFlow ?? 0)}
          </div>
          <p className="text-xs text-muted-foreground">Monthly positive flow</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;
