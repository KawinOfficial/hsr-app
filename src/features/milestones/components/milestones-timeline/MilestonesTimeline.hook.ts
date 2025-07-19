import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useMilestonesTimeline = () => {
  const milestones = useContextSelector(
    MilestonesContext,
    (state) => state?.milestones
  );

  return { milestones };
};
