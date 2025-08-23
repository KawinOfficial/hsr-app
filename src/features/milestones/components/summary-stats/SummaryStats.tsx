import { useSummaryStats } from "./SummaryStats.hook";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Loading } from "@/components/loading";

const SummaryStats = () => {
  const { isLoading, summaryData } = useSummaryStats();

  const stats = [
    {
      title: "Overall Progress",
      icon: <Target className="h-5 w-5 text-primary" />,
      value: summaryData?.overallProgress
        ? formatPercent(summaryData.overallProgress)
        : "-",
      description: (
        <>
          {summaryData?.completed} of {summaryData?.total} completed
        </>
      ),
    },
    {
      title: "Total Budget",
      icon: <TrendingUp className="h-5 w-5 text-rail-blue" />,
      value: formatCurrency(summaryData?.totalBudget),
      description: <>Spent: {formatCurrency(summaryData?.totalSpent)}</>,
    },
    {
      title: "Critical Milestones",
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      value: summaryData?.critical ?? "-",
      description: <>Require immediate attention</>,
    },
    {
      title: "Delayed Items",
      icon: <Clock className="h-5 w-5 text-construction-orange" />,
      value: summaryData?.delayed ?? "-",
      description: <>Behind schedule</>,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {isLoading && <Loading />}

      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStats;
