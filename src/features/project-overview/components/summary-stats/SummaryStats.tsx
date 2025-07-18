"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { Building2, CheckCircle, DollarSign, TrendingUp } from "lucide-react";
import { useSummaryStats } from "./SummaryStats.hook";

const SummaryStats = () => {
  const { projects, totalBudget, totalSpent, avgProgress, onTrackCount } =
    useSummaryStats();

  const summaryStats = [
    {
      title: "Total Budget",
      value: formatCurrency(totalBudget),
      subtitle: "Across {projects.length} projects",
      icon: DollarSign,
    },
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      subtitle: `${((totalSpent / totalBudget) * 100).toFixed(1)}% of budget`,
      icon: DollarSign,
    },
    {
      title: "Average Progress",
      value: `${avgProgress.toFixed(1)}%`,
      subtitle: "Overall completion rate",
      icon: Building2,
    },
    {
      title: "On Track Projects",
      value: `${onTrackCount}/${projects.length}`,
      subtitle: "Projects meeting timeline",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {summaryStats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-5 w-5 text-rail-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryStats;
