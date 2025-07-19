import { useSummaryStats } from "./SummaryStats.hook";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const SummaryStats = () => {
  const {
    milestones,
    calculateOverallProgress,
    completedMilestones,
    totalBudget,
    totalSpent,
    criticalMilestones,
    delayedMilestones,
  } = useSummaryStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Overall Progress
          </CardTitle>
          <Target className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {calculateOverallProgress()}%
          </div>
          <p className="text-xs text-muted-foreground">
            {completedMilestones} of {milestones?.length} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Budget
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-rail-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalBudget)}
          </div>
          <p className="text-xs text-muted-foreground">
            Spent: {formatCurrency(totalSpent)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Critical Milestones
          </CardTitle>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{criticalMilestones}</div>
          <p className="text-xs text-muted-foreground">
            Require immediate attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Delayed Items
          </CardTitle>
          <Clock className="h-5 w-5 text-construction-orange" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{delayedMilestones}</div>
          <p className="text-xs text-muted-foreground">Behind schedule</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStats;
