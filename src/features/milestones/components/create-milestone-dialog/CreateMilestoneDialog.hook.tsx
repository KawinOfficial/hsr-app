import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { useState } from "react";

export const useCreateMilestoneDialog = () => {
  const [open, setOpen] = useState(false);
  const projectOptions = useContextSelector(
    MilestonesContext,
    (state) => state?.projectOptions
  );

  return { projectOptions, open, setOpen };
};
