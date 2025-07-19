import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useOverview = () => {
  const milestones = useContextSelector(
    MilestonesContext,
    (state) => state?.milestones
  );
  const upcomingMilestones = useContextSelector(
    MilestonesContext,
    (state) => state?.upcomingMilestones
  );
  const delayedMilestones = useContextSelector(
    MilestonesContext,
    (state) => state?.delayedMilestones
  );
  const projectProgress = useContextSelector(
    MilestonesContext,
    (state) => state?.projectProgress
  );

  return {
    milestones,
    upcomingMilestones,
    delayedMilestones,
    projectProgress,
  };
};
