import { useContextSelector } from "use-context-selector";
import { MilestonesTrackerContext } from "@/features/project-overview/components/milestones-tracker-provider";
import { useMemo } from "react";

export const useMilestonesTracker = () => {
  const milestones = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.milestones
  );
  const handleProgressUpdate = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.handleProgressUpdate
  );

  function calculateOverallProgress() {
    if (!milestones) return 0;
    const totalProgress = milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(totalProgress / milestones.length);
  }

  const getCount = useMemo(() => {
    const completed = milestones?.filter(
      (milestone) => milestone.status === "Completed"
    ).length;
    const inProgress = milestones?.filter(
      (milestone) => milestone.status === "In Progress"
    ).length;
    const critical = milestones?.filter(
      (m) =>
        (m.priority === "Critical" || m.status === "Delayed") &&
        m.status !== "Completed"
    ).length;

    return {
      completed,
      inProgress,
      critical,
    };
  }, [milestones]);

  return {
    milestones,
    calculateOverallProgress,
    getCount,
    handleProgressUpdate,
  };
};
