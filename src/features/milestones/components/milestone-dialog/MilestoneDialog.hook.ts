import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useMilestoneDialog = () => {
  const { selectedMilestone, detailViewOpen, setDetailViewOpen } =
    useContextSelector(MilestonesContext, (state) => state!);

  return { selectedMilestone, detailViewOpen, setDetailViewOpen };
};
