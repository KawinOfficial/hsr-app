import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumberWithDecimals } from "@/lib/format";
import { TrendingUp, TrendingDown, Calculator } from "lucide-react";
import { useEfficiencyMetrics } from "./EfficienctMetrics.hook";

const EfficienctMetrics = () => {
  const { calculateEVM } = useEfficiencyMetrics();
  const efficiencyMetrics = [
    {
      title: "Cost Performance Index (CPI)",
      value: formatNumberWithDecimals(calculateEVM.CPI),
      subtitle: "Above 1.0 indicates under budget",
      icon: calculateEVM.CPI >= 1 ? TrendingUp : TrendingDown,
      color: calculateEVM.CPI >= 1 ? "text-success-green" : "text-destructive",
    },
    {
      title: "Schedule Performance Index (SPI)",
      value: formatNumberWithDecimals(calculateEVM.SPI),
      subtitle: "Below 1.0 indicates behind schedule",
      icon: calculateEVM.SPI < 1 ? TrendingDown : TrendingUp,
      color: calculateEVM.SPI < 1 ? "text-destructive" : "text-success-green",
    },
    {
      title: "Estimate at Completion (EAC)",
      value: formatCurrency(calculateEVM.EAC),
      subtitle: "Total projected project cost",
      icon: Calculator,
      color: "text-foreground",
    },
    {
      title: "Variance at Completion (VAC)",
      value: formatCurrency(calculateEVM.VAC),
      subtitle: "Positive value indicates cost savings",
      icon: calculateEVM.VAC > 0 ? TrendingUp : TrendingDown,
      color: calculateEVM.VAC > 0 ? "text-success-green" : "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {efficiencyMetrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metric.color}`}>
              {metric.value}
            </div>
            <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EfficienctMetrics;
