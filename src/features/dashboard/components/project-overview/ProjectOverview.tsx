import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { useProjectOverview } from "./ProjectOverview.hook";

const ProjectOverview = () => {
  const { projectStats } = useProjectOverview();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-primary" />
          Project Overview
        </CardTitle>
        <CardDescription>
          Overall progress and financial status of the Thai-Chinese High-Speed
          Rail project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {projectStats.completionPercentage}%
              </span>
            </div>
            <Progress
              value={projectStats.completionPercentage}
              className="h-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Budget
              </p>
              <p className="text-xl font-bold text-rail-blue">
                {formatCurrency(projectStats.totalBudget)}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Spent Amount
              </p>
              <p className="text-xl font-bold text-construction-orange">
                {formatCurrency(projectStats.spentAmount)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Current Phase
              </p>
              <Badge variant="outline" className="text-primary border-primary">
                {projectStats.projectPhase}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Est. Completion
              </p>
              <p className="text-sm font-medium">
                {projectStats.estimatedCompletion}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
