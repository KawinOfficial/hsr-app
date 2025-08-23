import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useMilestoneDialog = () => {
  const {
    selectedMilestone,
    detailViewOpen,
    handleCloseMilestone,
    setDetailViewOpen,
  } = useContextSelector(MilestonesContext, (state) => state!);

  function onClose() {
    handleCloseMilestone();
  }

  return { selectedMilestone, detailViewOpen, setDetailViewOpen, onClose };
};
