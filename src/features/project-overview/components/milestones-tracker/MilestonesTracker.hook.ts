import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import {
  MILESTONE_PRIORITY,
  MILESTONE_STATUS,
} from "@/features/milestones/constants/options";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";

export const useMilestonesTracker = () => {
  const milestonesData = useContextSelector(
    MilestonesContext,
    (state) => state?.milestonesData
  );
  const projectData = useContextSelector(
    ProjectDetailContext,
    (state) => state?.projectData
  );

  function calculateOverallProgress() {
    if (!milestonesData) return 0;
    return projectData?.progress || 0;
  }

  const getCount = useMemo(() => {
    const completed = milestonesData?.data?.filter(
      (milestone) => milestone.status === MILESTONE_STATUS.COMPLETED
    ).length;
    const inProgress = milestonesData?.data?.filter(
      (milestone) => milestone.status === MILESTONE_STATUS.IN_PROGRESS
    ).length;
    const critical = milestonesData?.data?.filter(
      (m) =>
        (m.priority === MILESTONE_PRIORITY.CRITICAL ||
          m.status === MILESTONE_STATUS.DELAYED) &&
        m.status !== MILESTONE_STATUS.COMPLETED
    ).length;

    return {
      completed,
      inProgress,
      critical,
    };
  }, [milestonesData]);

  return {
    calculateOverallProgress,
    getCount,
  };
};
