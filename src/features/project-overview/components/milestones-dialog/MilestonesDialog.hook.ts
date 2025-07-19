import { useContextSelector } from "use-context-selector";
import { MilestonesTrackerContext } from "@/features/project-overview/components/milestones-tracker-provider";

export const useMilestonesDialog = () => {
  const selectedMilestone = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.selectedMilestone
  );
  const updateDialogOpen = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.updateDialogOpen
  );
  const setUpdateDialogOpen = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.setUpdateDialogOpen
  );
  const handleSaveUpdate = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.handleSaveUpdate
  );
  const handleCancelUpdate = useContextSelector(
    MilestonesTrackerContext,
    (state) => state?.handleCancelUpdate
  );

  return {
    selectedMilestone,
    updateDialogOpen,
    setUpdateDialogOpen,
    handleSaveUpdate,
    handleCancelUpdate,
  };
};
