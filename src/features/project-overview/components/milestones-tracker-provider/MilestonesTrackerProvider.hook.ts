import { useState } from "react";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";

const milestones = [
  {
    id: "MS-001",
    title: "Site Survey Completion",
    description: "Complete geological and environmental site surveys",
    status: "Completed",
    progress: 100,
    targetDate: "2024-03-31",
    startDate: "2024-01-15",
    completionDate: "2024-03-28",
    assignedTo: "Pranee Chotirat",
    priority: "High",
    budget: 45000000,
    actualCost: 42800000,
    deliverables: [
      "Geological Survey Report",
      "Environmental Impact Assessment",
      "Site Access Documentation",
    ],
    dependencies: [],
  },
  {
    id: "MS-002",
    title: "Foundation Work Phase 1",
    description: "Complete foundation excavation and concrete pouring",
    status: "In Progress",
    progress: 78,
    targetDate: "2024-02-28",
    startDate: "2024-01-01",
    assignedTo: "Anupong Thavorn",
    priority: "Critical",
    budget: 180000000,
    actualCost: 145200000,
    deliverables: [
      "Foundation Concrete Completion Certificate",
      "Quality Control Reports",
      "Safety Compliance Documentation",
    ],
    dependencies: ["MS-001"],
  },
  {
    id: "MS-003",
    title: "Track Installation",
    description: "Install and test tracks for sections 1-5",
    status: "Not Started",
    progress: 0,
    targetDate: "2024-06-30",
    startDate: "2024-03-01",
    assignedTo: "Thanakit Srisuwan",
    priority: "High",
    budget: 220000000,
    actualCost: 0,
    deliverables: [
      "Track Installation Certificate",
      "Signaling System Integration Report",
      "Speed Test Results",
    ],
    dependencies: ["MS-002"],
  },
];

export const useMilestonesTrackerProvider = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  function handleProgressUpdate(milestone: Milestone) {
    setSelectedMilestone(milestone);
    setUpdateDialogOpen(true);
  }

  function handleSaveUpdate() {
    setUpdateDialogOpen(false);
  }

  function handleCancelUpdate() {
    setUpdateDialogOpen(false);
  }
  return {
    milestones,
    selectedMilestone,
    updateDialogOpen,
    setUpdateDialogOpen,
    handleProgressUpdate,
    handleSaveUpdate,
    handleCancelUpdate,
  };
};
