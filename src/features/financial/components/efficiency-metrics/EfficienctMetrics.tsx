import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { TrendingUp, TrendingDown, Calculator } from "lucide-react";

const EfficienctMetrics = () => {
  const efficiencyMetrics = [
    {
      title: "Cost Performance Index (CPI)",
      value: "1.08",
      subtitle: "Above 1.0 indicates under budget",
      icon: TrendingUp,
      color: "text-success-green",
    },
    {
      title: "Schedule Performance Index (SPI)",
      value: "0.94",
      subtitle: "Below 1.0 indicates behind schedule",
      icon: TrendingDown,
      color: "text-warning-amber",
    },
    {
      title: "Estimate at Completion (EAC)",
      value: formatCurrency(2780000000),
      subtitle: "Total projected project cost",
      icon: Calculator,
      color: "text-foreground",
    },
    {
      title: "Variance at Completion (VAC)",
      value: formatCurrency(70000000),
      subtitle: "Positive value indicates cost savings",
      icon: TrendingUp,
      color: "text-success-green",
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
