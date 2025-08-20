import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Plus,
  Edit,
  Eye,
  Calendar,
  User,
  CheckCircle,
} from "lucide-react";
import { useMilestonesTracker } from "./MilestonesTracker.hook";
import {
  getPriorityColor,
  getStatusColor,
} from "@/features/milestones/utils/milestonesColor";
import { formatCurrency } from "@/lib/format";
import { MilestonesDialog } from "@/features/project-overview/components/milestones-dialog";
import Link from "next/link";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";

const MilestonesTracker = () => {
  const {
    milestones,
    calculateOverallProgress,
    getCount,
    handleProgressUpdate,
  } = useMilestonesTracker();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Milestone Tracker
              </CardTitle>
              <CardDescription>
                Bangkok-Nakhon Ratchasima Mainline • 1/3 milestones completed
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-primary">
                {calculateOverallProgress()}% Complete
              </Badge>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Project Progress</span>
              <span className="text-sm text-muted-foreground">
                {calculateOverallProgress()}%
              </span>
            </div>
            <Progress value={calculateOverallProgress()} className="h-3" />
          </div>

          {/* Summary Stats */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-success-green">
                  {getCount.completed}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rail-blue">
                  {getCount.inProgress}
                </p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-construction-orange">
                  {getCount.critical}
                </p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </div>

          {/* Milestone List */}
          <div className="space-y-4">
            {milestones?.map((milestone) => (
              <Card
                key={milestone.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                          <span
                            className={`text-sm ${getPriorityColor(
                              milestone.priority
                            )}`}
                          >
                            {milestone.priority}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {milestone.targetDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{milestone.assignedTo}</span>
                        </div>
                      </div>

                      {milestone.dependencies.length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          <strong>Dependencies:</strong>{" "}
                          {milestone.dependencies.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm">{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
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

                    <div className="space-y-2">
                      <div className="text-xs">
                        <p className="text-muted-foreground mb-1">
                          Deliverables
                        </p>
                        <ul className="space-y-1">
                          {milestone.deliverables
                            .slice(0, 2)
                            .map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-center space-x-1"
                              >
                                <CheckCircle className="h-3 w-3 text-success-green" />
                                <span className="truncate">{item}</span>
                              </li>
                            ))}
                          {milestone.deliverables.length > 2 && (
                            <li className="text-muted-foreground">
                              +{milestone.deliverables.length - 2} more
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            handleProgressUpdate?.(
                              milestone as unknown as Milestone
                            )
                          }
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Update
                        </Button>
                        <Link
                          href={`/projects/${milestone.id}`}
                          className="flex-1 border border-input rounded-md px-2 py-1 flex items-center justify-center"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <MilestonesDialog />
    </>
  );
};

export default MilestonesTracker;
