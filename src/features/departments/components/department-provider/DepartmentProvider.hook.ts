import { useState } from "react";
import { Department } from "@/features/departments/schemas/Department.schema";

const departments: Department[] = [
  {
    id: "DEPT-001",
    name: "Project Management",
    description: "Overall project coordination and management",
    head: "Somchai Tanakorn",
    memberCount: 8,
    budget: 45000000,
    responsibilities: [
      "Project planning and coordination",
      "Stakeholder management",
      "Risk management",
      "Budget oversight",
    ],
    status: "Active",
    location: "Bangkok HQ",
  },
  {
    id: "DEPT-002",
    name: "Quality Surveying (QS)",
    description: "Quantity surveying and quality assurance",
    head: "Pranee Chotirat",
    memberCount: 12,
    budget: 28000000,
    responsibilities: [
      "Quantity surveying",
      "Cost estimation",
      "Quality control",
      "Material inspection",
    ],
    status: "Active",
    location: "Multiple Sites",
  },
  {
    id: "DEPT-003",
    name: "Engineering",
    description: "Technical design and engineering oversight",
    head: "Liu Wei Chen",
    memberCount: 25,
    budget: 85000000,
    responsibilities: [
      "Technical design",
      "Engineering standards",
      "Safety protocols",
      "Technical documentation",
    ],
    status: "Active",
    location: "Bangkok & Beijing",
  },
  {
    id: "DEPT-004",
    name: "Finance",
    description: "Financial management and accounting",
    head: "Siriporn Wattana",
    memberCount: 6,
    budget: 22000000,
    responsibilities: [
      "Financial planning",
      "Payment processing",
      "Budget monitoring",
      "Financial reporting",
    ],
    status: "Active",
    location: "Bangkok HQ",
  },
  {
    id: "DEPT-005",
    name: "Asset Management",
    description: "Equipment and asset tracking",
    head: "Malee Jitpakdee",
    memberCount: 4,
    budget: 15000000,
    responsibilities: [
      "Asset registration",
      "Maintenance scheduling",
      "Inventory management",
      "Depreciation tracking",
    ],
    status: "Active",
    location: "Multiple Locations",
  },
];

export const useDepartmentProvider = () => {
  const [departmentEditOpen, setDepartmentEditOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  function handleEditDepartment(department: Department) {
    setSelectedDepartment(department);
    setDepartmentEditOpen(true);
  }

  return {
    departments,
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    setSelectedDepartment,
    handleEditDepartment,
  };
};
