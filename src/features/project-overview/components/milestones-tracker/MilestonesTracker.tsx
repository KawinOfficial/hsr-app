"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Plus } from "lucide-react";
import { useMilestonesTracker } from "./MilestonesTracker.hook";
import { MilestoneDialog } from "@/features/milestones/components/milestone-dialog";
import { TrackingList } from "@/features/milestones/components/tracking-list";

const MilestonesTracker = () => {
  const { calculateOverallProgress, getCount } = useMilestonesTracker();

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
            </div>
            <div className="flex items-center space-x-2">
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

          <TrackingList />
        </CardContent>
      </Card>
      <MilestoneDialog />
    </>
  );
};

export default MilestonesTracker;
