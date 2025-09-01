import { useContextSelector } from "use-context-selector";
import { useMemo } from "react";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import {
  MILESTONE_PRIORITY,
  MILESTONE_STATUS,
} from "@/features/milestones/constants/options";

export const useMilestonesTracker = () => {
  const milestonesData = useContextSelector(
    MilestonesContext,
    (state) => state?.milestonesData
  );

  function calculateOverallProgress() {
    if (!milestonesData) return 0;
    const totalProgress = milestonesData.data?.reduce(
      (sum, m) => sum + m.progress,
      0
    );
    return Math.round(totalProgress / milestonesData.data?.length) || 0;
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
