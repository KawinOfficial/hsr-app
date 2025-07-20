import { useState } from "react";
import { Workflow } from "@/features/document-types/schemas/Workflow.schema";

const workflowTemplates = [
  {
    id: "WF-001",
    name: "Standard Procurement Approval",
    description: "Standard workflow for procurement requests",
    category: "Procurement",
    active: true,
    steps: [
      {
        id: "step-1",
        name: "Project Manager Review",
        type: "approval",
        assignedRole: "Project Manager",
        assignedUsers: ["Somchai Tanakorn"],
        timeLimit: "24 hours",
        required: true,
        conditions: [],
      },
      {
        id: "step-2",
        name: "Procurement Department Review",
        type: "approval",
        assignedRole: "Procurement Manager",
        assignedUsers: ["Malee Jitpakdee"],
        timeLimit: "48 hours",
        required: true,
        conditions: ["amount > 100000"],
      },
      {
        id: "step-3",
        name: "Finance Department Approval",
        type: "approval",
        assignedRole: "Finance Manager",
        assignedUsers: ["Siriporn Wattana"],
        timeLimit: "24 hours",
        required: true,
        conditions: ["amount > 500000"],
      },
    ],
    averageCompletionTime: "2.5 days",
    successRate: 92,
    totalExecutions: 245,
    createdBy: "Somchai Tanakorn",
    createdDate: "2023-10-15",
    lastModified: "2024-01-20",
  },
  {
    id: "WF-002",
    name: "Purchase Order Processing",
    description: "Workflow for processing purchase orders",
    category: "Procurement",
    active: true,
    steps: [
      {
        id: "step-1",
        name: "Procurement Review",
        type: "approval",
        assignedRole: "Procurement Officer",
        assignedUsers: ["Malee Jitpakdee", "Chaiwat Promkai"],
        timeLimit: "24 hours",
        required: true,
        conditions: [],
      },
      {
        id: "step-2",
        name: "Finance Verification",
        type: "approval",
        assignedRole: "Finance Officer",
        assignedUsers: ["Siriporn Wattana"],
        timeLimit: "12 hours",
        required: true,
        conditions: ["totalAmount > 50000"],
      },
    ],
    averageCompletionTime: "1.8 days",
    successRate: 95,
    totalExecutions: 189,
    createdBy: "Malee Jitpakdee",
    createdDate: "2023-10-16",
    lastModified: "2024-01-15",
  },
  {
    id: "WF-003",
    name: "Contract Review and Approval",
    description: "Multi-level contract approval workflow",
    category: "Legal",
    active: true,
    steps: [
      {
        id: "step-1",
        name: "Legal Review",
        type: "review",
        assignedRole: "Legal Counsel",
        assignedUsers: ["Liu Wei Chen"],
        timeLimit: "72 hours",
        required: true,
        conditions: [],
      },
      {
        id: "step-2",
        name: "Project Manager Approval",
        type: "approval",
        assignedRole: "Project Manager",
        assignedUsers: ["Somchai Tanakorn"],
        timeLimit: "48 hours",
        required: true,
        conditions: [],
      },
      {
        id: "step-3",
        name: "Finance Review",
        type: "approval",
        assignedRole: "Finance Manager",
        assignedUsers: ["Siriporn Wattana"],
        timeLimit: "24 hours",
        required: true,
        conditions: ["value > 1000000"],
      },
      {
        id: "step-4",
        name: "Executive Approval",
        type: "approval",
        assignedRole: "Executive Director",
        assignedUsers: ["Krisana Suriyawong"],
        timeLimit: "48 hours",
        required: true,
        conditions: ["value > 10000000"],
      },
    ],
    averageCompletionTime: "5.2 days",
    successRate: 88,
    totalExecutions: 45,
    createdBy: "Liu Wei Chen",
    createdDate: "2023-10-20",
    lastModified: "2024-01-25",
  },
];

export const useWorkflowProvider = () => {
  const [createWorkflowOpen, setCreateWorkflowOpen] = useState(false);
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(
    null
  );

  function handleWorkflowDialog(workflow: Workflow) {
    setSelectedWorkflow(workflow);
    setWorkflowDialogOpen(true);
  }

  return {
    workflowTemplates,
    createWorkflowOpen,
    setCreateWorkflowOpen,
    workflowDialogOpen,
    setWorkflowDialogOpen,
    selectedWorkflow,
    handleWorkflowDialog,
  };
};
