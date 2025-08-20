import { useMemo, useState } from "react";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";

export const useMilestonesProvider = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();
  const [detailViewOpen, setDetailViewOpen] = useState(false);

  const projectOptions = useMemo(() => {
    return [];
  }, []);

  function handleViewMilestone(milestone: Milestone) {
    setSelectedMilestone(milestone);
    setDetailViewOpen(true);
  }

  function handleCloseMilestone() {
    setSelectedMilestone(undefined);
    setDetailViewOpen(false);
  }

  return {
    projectOptions,
    selectedMilestone,
    detailViewOpen,
    setDetailViewOpen,
    handleViewMilestone,
    handleCloseMilestone,
  };
};
