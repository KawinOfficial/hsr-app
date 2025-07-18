import { Project } from "@/features/project-overview/schemas/Project.schema";
import { useState } from "react";

const project: Project = {
  id: "TH-CN-001",
  title: "Bangkok-Nakhon Ratchasima Mainline",
  description:
    "Construction of high-speed rail line connecting Bangkok to Nakhon Ratchasima with 8 intermediate stations",
  status: "On Track",
  progress: 68,
  budget: 1200000000,
  spent: 816000000,
  variance: -2.1,
  startDate: "2023-03-01",
  completion: "2025-08-15",
  location: "Bangkok - Nakhon Ratchasima",
  category: "Infrastructure",
  manager: "Somchai Tanakorn",
  riskLevel: "Low",
  team: 45,
  milestones: { completed: 12, total: 18 },
};

const projectDetails = {
  ...project,
  timeline: [
    {
      phase: "Planning & Design",
      startDate: "2023-01-15",
      endDate: "2023-06-30",
      status: "Completed",
      progress: 100,
      milestones: [
        { name: "Site Survey", date: "2023-02-15", status: "Completed" },
        {
          name: "Environmental Impact",
          date: "2023-04-01",
          status: "Completed",
        },
        { name: "Design Approval", date: "2023-06-15", status: "Completed" },
      ],
    },
    {
      phase: "Foundation Work",
      startDate: "2023-07-01",
      endDate: "2024-03-31",
      status: "In Progress",
      progress: 75,
      milestones: [
        { name: "Excavation", date: "2023-08-15", status: "Completed" },
        { name: "Concrete Pouring", date: "2023-12-01", status: "Completed" },
        {
          name: "Foundation Testing",
          date: "2024-02-15",
          status: "In Progress",
        },
      ],
    },
    {
      phase: "Track Installation",
      startDate: "2024-04-01",
      endDate: "2024-12-31",
      status: "Pending",
      progress: 0,
      milestones: [
        { name: "Rail Delivery", date: "2024-05-01", status: "Pending" },
        { name: "Track Laying", date: "2024-08-01", status: "Pending" },
        {
          name: "Testing & Commissioning",
          date: "2024-11-01",
          status: "Pending",
        },
      ],
    },
  ],
  team: [
    {
      name: "Somchai Tanakorn",
      role: "Project Manager",
      email: "somchai.t@thairail.go.th",
      avatar: "/placeholder.svg",
    },
    {
      name: "Pranee Chotirat",
      role: "QS Officer",
      email: "pranee.c@thairail.go.th",
      avatar: "/placeholder.svg",
    },
    {
      name: "Liu Wei Chen",
      role: "Chief Engineer",
      email: "liu.w@crrc.com.cn",
      avatar: "/placeholder.svg",
    },
  ],
  documents: [
    {
      name: "Project Charter",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2023-01-15",
      category: "Planning",
    },
    {
      name: "Environmental Report",
      type: "PDF",
      size: "15.2 MB",
      uploadDate: "2023-04-01",
      category: "Compliance",
    },
    {
      name: "Technical Drawings",
      type: "DWG",
      size: "45.8 MB",
      uploadDate: "2023-06-15",
      category: "Engineering",
    },
  ],
  risks: [
    {
      id: "RISK-001",
      description: "Weather delays during monsoon season",
      impact: "High",
      probability: "Medium",
      status: "Active",
      mitigation: "Adjust timeline and add weather protection",
    },
    {
      id: "RISK-002",
      description: "Material price inflation",
      impact: "Medium",
      probability: "High",
      status: "Monitoring",
      mitigation: "Fixed-price contracts where possible",
    },
  ],
};

export const useProjectDetailProvider = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  function handleEdit() {
    setIsEditMode(true);
  }

  function handleCancel() {
    setIsEditMode(false);
  }

  function handleSave() {
    handleCancel();
  }

  return {
    project,
    projectDetails,
    isEditMode,
    handleEdit,
    handleCancel,
    handleSave,
  };
};
