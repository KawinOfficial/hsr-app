import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getStatusColor,
  getPriorityColor,
} from "@/features/milestones/utils/milestonesColor";
import { Clock, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useOverview } from "./Overview.hook";
import { Badge } from "@/components/ui/badge";

const Overview = () => {
  const { milestones, upcomingMilestones, delayedMilestones, projectProgress } =
    useOverview();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Upcoming Milestones
            </CardTitle>
            <CardDescription>
              Next milestones requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMilestones?.map((milestone, index) => (
                <div
                  key={`${milestone.id}-${index}`}
                  className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  // onClick={() => handleViewMilestone(milestone)}
                >
                  <div className="flex-shrink-0">
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {milestone.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: {milestone.targetDate} • {milestone.assignedTo}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Progress value={milestone.progress} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Critical Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
              Critical & Delayed Items
            </CardTitle>
            <CardDescription>
              Items requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {delayedMilestones
                ?.concat(
                  milestones?.filter(
                    (m) => m.priority === "Critical" && m.status !== "Completed"
                  ) ?? []
                )
                .slice(0, 5)
                .map((milestone, index) => (
                  <div
                    key={`${milestone.id}-${index}`}
                    className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    // onClick={() => handleViewMilestone(milestone)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {milestone.status === "Delayed" ? (
                        <Clock className="h-4 w-4 text-construction-orange" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{milestone.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {milestone.project} • {milestone.assignedTo}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                      <p
                        className={`text-xs font-medium ${getPriorityColor(
                          milestone.priority
                        )}`}
                      >
                        {milestone.priority}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress Overview</CardTitle>
          <CardDescription>
            Milestone completion status by project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projectProgress?.map((project, index) => (
              <div key={`${project.projectId}-${index}`} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {project.projectName || `Project ${project.projectId}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.completedCount} of {project.totalCount}{" "}
                      milestones completed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {Math.round(project.progressPercentage)}%
                    </p>
                    <p className="text-xs text-muted-foreground">Complete</p>
                  </div>
                </div>
                <Progress value={project.progressPercentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Overview;
