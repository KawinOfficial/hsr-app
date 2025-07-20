import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Target } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useMetricsOverview } from "./MetricsOverview.hook";

const MetricsOverview = () => {
  const { financialMetrics } = useMetricsOverview();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </CardTitle>
          <ArrowUpRight className="h-5 w-5 text-success-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialMetrics.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            +12.3% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <ArrowDownRight className="h-5 w-5 text-construction-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialMetrics.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            +8.7% from last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Net Income
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-success-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(financialMetrics.netIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            Margin: {financialMetrics.profitMargin}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            ROI
          </CardTitle>
          <Target className="h-5 w-5 text-rail-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{financialMetrics.roi}%</div>
          <p className="text-xs text-muted-foreground">Above target of 15%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
