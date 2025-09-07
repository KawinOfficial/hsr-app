import { useState } from "react";
import { MilestonesContext } from "../milestones-provider/MilestonesProvider";
import { useContextSelector } from "use-context-selector";

export const useCreateMilestoneDialog = () => {
  const canCreateMilestone = useContextSelector(
    MilestonesContext,
    (state) => state?.canCreateMilestone
  );

  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return { open, setOpen, onClose, canCreateMilestone };
};
