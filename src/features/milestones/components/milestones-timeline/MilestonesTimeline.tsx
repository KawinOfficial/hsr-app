import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useMilestonesTimeline } from "./MilestonesTimeline.hook";
import { Badge } from "@/components/ui/badge";
import {
  getStatusColor,
  getPriorityColor,
  getVarianceColor,
  getMilestoneStatusColor,
} from "@/features/milestones/utils/milestonesColor";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/format";

const MilestonesTimeline = () => {
  const { milestones } = useMilestonesTimeline();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>
            Visual timeline of all project milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-4 w-0.5 bg-border" />

            <div>
              {milestones?.map((milestone) => (
                <div
                  key={milestone.id}
                  className="relative flex items-start space-x-7"
                >
                  {/* Timeline dot */}
                  <div
                    className={`flex items-center justify-center w-4 h-4 rounded-full border-2 mt-6 ${getMilestoneStatusColor(
                      milestone.status
                    )}`}
                  >
                    {milestone.status === "Completed" && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </div>

                  {/* Timeline content */}
                  <div className="flex-1 pb-6">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                          <div className="w-1/2">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">
                                  {milestone.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {milestone.id} • {milestone.phase}
                                </p>
                              </div>
                              <Badge
                                className={getStatusColor(milestone.status)}
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {milestone.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <span
                                className={getPriorityColor(milestone.priority)}
                              >
                                {milestone.priority}
                              </span>{" "}
                              | Due: {milestone.targetDate} |{" "}
                              {milestone.assignedTo}
                            </div>
                          </div>

                          <div className="w-1/3 space-y-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Progress
                              </p>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={milestone.progress}
                                  className="flex-1 h-2"
                                />
                                <span className="text-sm font-medium">
                                  {milestone.progress}%
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-muted-foreground">Budget</p>
                                <p className="font-medium">
                                  {formatCurrency(milestone.budget)}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Spent</p>
                                <p className="font-medium">
                                  {formatCurrency(milestone.actualCost)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Cost Variance
                              </p>
                              <p
                                className={`text-sm font-medium ${getVarianceColor(
                                  milestone.variance
                                )}`}
                              >
                                {milestone.variance > 0 ? "+" : ""}
                                {milestone.variance}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Dependencies
                              </p>
                              <p className="text-sm">
                                {milestone.dependencies.length > 0
                                  ? milestone.dependencies.join(", ")
                                  : "None"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MilestonesTimeline;
