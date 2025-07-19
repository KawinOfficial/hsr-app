import { useMemo, useState } from "react";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";

const milestones: Milestone[] = [
  {
    id: "MS-001",
    title: "Site Survey Completion",
    description:
      "Complete geological and environmental site surveys for Bangkok-Nakhon Ratchasima corridor",
    project: "TH-CN-001",
    projectName: "Bangkok-Nakhon Ratchasima Mainline",
    phase: "Planning & Design",
    status: "Completed",
    priority: "High",
    startDate: "2023-01-15",
    targetDate: "2023-03-31",
    completionDate: "2023-03-28",
    progress: 100,
    budget: 45000000,
    actualCost: 42800000,
    variance: -4.9,
    assignedTo: "Pranee Chotirat",
    department: "Engineering",
    dependencies: [],
    deliverables: [
      "Geological Survey Report",
      "Environmental Impact Assessment",
      "Site Access Documentation",
    ],
    risks: [
      {
        description: "Weather delays during rainy season",
        impact: "Low",
        mitigation: "Schedule buffer included",
      },
    ],
    approvers: ["Somchai Tanakorn", "Liu Wei Chen"],
    lastUpdated: "2023-03-28",
  },
  {
    id: "MS-002",
    title: "Foundation Work Phase 1",
    description:
      "Complete foundation excavation and concrete pouring for stations A1-A4",
    project: "TH-CN-001",
    projectName: "Bangkok-Nakhon Ratchasima Mainline",
    phase: "Construction",
    status: "In Progress",
    priority: "Critical",
    startDate: "2023-04-01",
    targetDate: "2024-02-28",
    completionDate: null,
    progress: 78,
    budget: 180000000,
    actualCost: 145200000,
    variance: 2.3,
    assignedTo: "Anupong Thavorn",
    department: "Construction",
    dependencies: ["MS-001"],
    deliverables: [
      "Foundation Concrete Completion Certificate",
      "Quality Control Reports",
      "Safety Compliance Documentation",
    ],
    risks: [
      {
        description: "Concrete supply chain delays",
        impact: "Medium",
        mitigation: "Multiple supplier contracts secured",
      },
    ],
    approvers: ["Somchai Tanakorn"],
    lastUpdated: "2024-02-15",
  },
  {
    id: "MS-003",
    title: "Track Installation Milestone 1",
    description:
      "Install and test tracks for sections 1-5 including signaling integration",
    project: "TH-CN-001",
    projectName: "Bangkok-Nakhon Ratchasima Mainline",
    phase: "Track Installation",
    status: "Pending",
    priority: "High",
    startDate: "2024-03-01",
    targetDate: "2024-06-30",
    completionDate: null,
    progress: 0,
    budget: 220000000,
    actualCost: 0,
    variance: 0,
    assignedTo: "Thanakit Srisuwan",
    department: "Engineering",
    dependencies: ["MS-002"],
    deliverables: [
      "Track Installation Certificate",
      "Signaling System Integration Report",
      "Speed Test Results",
    ],
    risks: [
      {
        description: "Specialized equipment availability",
        impact: "High",
        mitigation: "Equipment pre-ordered with backup suppliers",
      },
    ],
    approvers: ["Somchai Tanakorn", "Liu Wei Chen"],
    lastUpdated: "2024-02-10",
  },
  {
    id: "MS-004",
    title: "Rolling Stock Delivery Phase 1",
    description:
      "Delivery and acceptance testing of first 3 high-speed train sets",
    project: "TH-CN-003",
    projectName: "Rolling Stock Manufacturing",
    phase: "Manufacturing",
    status: "In Progress",
    priority: "High",
    startDate: "2023-12-01",
    targetDate: "2024-04-30",
    completionDate: null,
    progress: 65,
    budget: 450000000,
    actualCost: 285000000,
    variance: -2.1,
    assignedTo: "Chen Wei Ming",
    department: "Procurement",
    dependencies: [],
    deliverables: [
      "Train Set Delivery Certificate",
      "Acceptance Test Results",
      "Maintenance Manual Handover",
    ],
    risks: [
      {
        description: "Quality control standards compliance",
        impact: "Medium",
        mitigation: "Dedicated QC team and regular inspections",
      },
    ],
    approvers: ["Somchai Tanakorn", "Liu Wei Chen"],
    lastUpdated: "2024-02-14",
  },
  {
    id: "MS-005",
    title: "Power Systems Installation",
    description:
      "Install electrical infrastructure and power distribution systems",
    project: "TH-CN-002",
    projectName: "Nakhon Ratchasima-Nong Khai Extension",
    phase: "Electrical",
    status: "Delayed",
    priority: "Medium",
    startDate: "2023-10-01",
    targetDate: "2024-01-31",
    completionDate: null,
    progress: 45,
    budget: 95000000,
    actualCost: 52000000,
    variance: 8.7,
    assignedTo: "Malee Jitpakdee",
    department: "Electrical",
    dependencies: ["MS-002"],
    deliverables: [
      "Power System Commissioning Report",
      "Safety Certification",
      "Load Testing Results",
    ],
    risks: [
      {
        description: "Electrical component supply delays",
        impact: "High",
        mitigation: "Alternative suppliers identified",
      },
    ],
    approvers: ["Somchai Tanakorn"],
    lastUpdated: "2024-02-08",
  },
  {
    id: "MS-006",
    title: "Safety Systems Integration",
    description:
      "Integrate and test all safety systems including emergency protocols",
    project: "TH-CN-001",
    projectName: "Bangkok-Nakhon Ratchasima Mainline",
    phase: "Testing",
    status: "Not Started",
    priority: "Critical",
    startDate: "2024-07-01",
    targetDate: "2024-09-30",
    completionDate: null,
    progress: 0,
    budget: 85000000,
    actualCost: 0,
    variance: 0,
    assignedTo: "Siriporn Wattana",
    department: "Safety",
    dependencies: ["MS-003"],
    deliverables: [
      "Safety System Certification",
      "Emergency Protocol Documentation",
      "Staff Training Completion",
    ],
    risks: [
      {
        description: "Regulatory approval timeline",
        impact: "High",
        mitigation: "Early engagement with regulatory bodies",
      },
    ],
    approvers: ["Somchai Tanakorn", "Liu Wei Chen"],
    lastUpdated: "2024-02-01",
  },
];

export const useMilestonesProvider = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();
  const [detailViewOpen, setDetailViewOpen] = useState(false);

  const upcomingMilestones = useMemo(() => {
    return milestones
      .filter((m) => m.status === "Pending" || m.status === "In Progress")
      .sort(
        (a, b) =>
          new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
      )
      .slice(0, 5);
  }, [milestones]);

  const delayedMilestones = useMemo(() => {
    return milestones.filter(
      (m) =>
        m.status === "Delayed" ||
        (m.status === "In Progress" && new Date(m.targetDate) < new Date())
    );
  }, [milestones]);

  const projectIds = useMemo(() => {
    return [...new Set(milestones.map((m) => m.project))];
  }, [milestones]);

  const projectProgress = useMemo(() => {
    return projectIds.map((projectId) => {
      const projectMilestones = milestones.filter(
        (m) => m.project === projectId
      );
      const completedCount =
        projectMilestones?.filter((m) => m.status === "Completed").length ?? 0;
      const progressPercentage =
        (completedCount / (projectMilestones?.length ?? 0)) * 100;
      return {
        projectId,
        progressPercentage,
        completedCount,
        projectName: projectMilestones?.[0]?.projectName,
        totalCount: projectMilestones?.length ?? 0,
      };
    });
  }, [milestones]);

  const projectOptions = useMemo(() => {
    return projectIds.map((projectId) => {
      const projectMilestones = milestones.find((m) => m.project === projectId);
      return {
        label: `${projectId} - ${projectMilestones?.projectName}`,
        value: projectId,
      };
    });
  }, [projectIds]);

  function handleViewMilestone(milestone: Milestone) {
    setSelectedMilestone(milestone);
    setDetailViewOpen(true);
  }

  function handleCloseMilestone() {
    setSelectedMilestone(undefined);
    setDetailViewOpen(false);
  }

  return {
    milestones,
    upcomingMilestones,
    delayedMilestones,
    projectProgress,
    projectOptions,
    selectedMilestone,
    detailViewOpen,
    setDetailViewOpen,
    handleViewMilestone,
    handleCloseMilestone,
  };
};
