import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useTrackingList = () => {
  const milestones = useContextSelector(
    MilestonesContext,
    (state) => state?.milestones
  );
  const handleViewMilestone = useContextSelector(
    MilestonesContext,
    (state) => state?.handleViewMilestone
  );

  return { milestones, handleViewMilestone };
};
