"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { useMilestonesTracker } from "./MilestonesTracker.hook";
import { MilestoneDialog } from "@/features/milestones/components/milestone-dialog";
import { TrackingList } from "@/features/milestones/components/tracking-list";
import { CreateProjectMilestoneDialog } from "@/features/project-overview/components/create-proect-milestone-dialog";

const MilestonesTracker = () => {
  const {
    calculateOverallProgress,
    getCount,
    canEditProject,
    canDeleteMilestone,
  } = useMilestonesTracker();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Milestone Tracker
              </CardTitle>
            </div>
            {canEditProject && (
              <div className="flex items-center space-x-2">
                <CreateProjectMilestoneDialog />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6 max-w-[calc(94vw-1rem)] lg:max-w-none">
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
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-success-green">
                  {getCount.completed}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-rail-blue">
                  {getCount.inProgress}
                </p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-construction-orange">
                  {getCount.critical}
                </p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </div>

          <TrackingList canDeleteMilestone={canDeleteMilestone} />
        </CardContent>
      </Card>
      <MilestoneDialog />
    </>
  );
};

export default MilestonesTracker;
