import { useState } from "react";
import {
  Department,
  DepartmentForm,
} from "@/features/departments/schemas/Department.schema";
import { useDepartmentList } from "@/features/departments/hooks/use-department-list";
import { useOptions } from "@/hooks/use-option";
import { useUpdateDepartment } from "@/features/departments/hooks/use-update-department";
import { useToast } from "@/hooks/use-toast";

// const departments: Department[] = [
//   {
//     id: "DEPT-001",
//     name: "Project Management",
//     description: "Overall project coordination and management",
//     head: "Somchai Tanakorn",
//     memberCount: 8,
//     budget: 45000000,
//     responsibilities: [
//       "Project planning and coordination",
//       "Stakeholder management",
//       "Risk management",
//       "Budget oversight",
//     ],
//     status: "Active",
//     location: "Bangkok HQ",
//   },
//   {
//     id: "DEPT-002",
//     name: "Quality Surveying (QS)",
//     description: "Quantity surveying and quality assurance",
//     head: "Pranee Chotirat",
//     memberCount: 12,
//     budget: 28000000,
//     responsibilities: [
//       "Quantity surveying",
//       "Cost estimation",
//       "Quality control",
//       "Material inspection",
//     ],
//     status: "Active",
//     location: "Multiple Sites",
//   },
//   {
//     id: "DEPT-003",
//     name: "Engineering",
//     description: "Technical design and engineering oversight",
//     head: "Liu Wei Chen",
//     memberCount: 25,
//     budget: 85000000,
//     responsibilities: [
//       "Technical design",
//       "Engineering standards",
//       "Safety protocols",
//       "Technical documentation",
//     ],
//     status: "Active",
//     location: "Bangkok & Beijing",
//   },
//   {
//     id: "DEPT-004",
//     name: "Finance",
//     description: "Financial management and accounting",
//     head: "Siriporn Wattana",
//     memberCount: 6,
//     budget: 22000000,
//     responsibilities: [
//       "Financial planning",
//       "Payment processing",
//       "Budget monitoring",
//       "Financial reporting",
//     ],
//     status: "Active",
//     location: "Bangkok HQ",
//   },
//   {
//     id: "DEPT-005",
//     name: "Asset Management",
//     description: "Equipment and asset tracking",
//     head: "Malee Jitpakdee",
//     memberCount: 4,
//     budget: 15000000,
//     responsibilities: [
//       "Asset registration",
//       "Maintenance scheduling",
//       "Inventory management",
//       "Depreciation tracking",
//     ],
//     status: "Active",
//     location: "Multiple Locations",
//   },
// ];

const teamMembers = [
  {
    id: "USR-001",
    name: "Somchai Tanakorn",
    email: "somchai.t@thairail.go.th",
    phone: "+66-2-555-0123",
    role: "Project Manager",
    department: "Project Management",
    status: "Active",
    lastLogin: "2024-02-17 09:30",
    joinDate: "2023-01-15",
    location: "Bangkok",
    avatar: "/placeholder.svg",
    projects: ["TH-CN-001", "TH-CN-002"],
    permissions: ["all"],
  },
  {
    id: "USR-002",
    name: "Pranee Chotirat",
    email: "pranee.c@thairail.go.th",
    phone: "+66-2-555-0124",
    role: "Senior QS Officer",
    department: "Quality Surveying",
    status: "Active",
    lastLogin: "2024-02-17 08:45",
    joinDate: "2023-02-01",
    location: "Bangkok",
    avatar: "/placeholder.svg",
    projects: ["TH-CN-001"],
    permissions: ["quality", "reports"],
  },
  {
    id: "USR-003",
    name: "Liu Wei Chen",
    email: "liu.w@crrc.com.cn",
    phone: "+86-10-555-0125",
    role: "Chief Engineer",
    department: "Engineering",
    status: "Active",
    lastLogin: "2024-02-16 22:15",
    joinDate: "2023-03-10",
    location: "Beijing",
    avatar: "/placeholder.svg",
    projects: ["TH-CN-003"],
    permissions: ["engineering", "technical"],
  },
  {
    id: "USR-004",
    name: "Siriporn Wattana",
    email: "siriporn.w@thairail.go.th",
    phone: "+66-2-555-0126",
    role: "Finance Manager",
    department: "Finance",
    status: "Active",
    lastLogin: "2024-02-17 10:00",
    joinDate: "2023-01-20",
    location: "Bangkok",
    avatar: "/placeholder.svg",
    projects: ["TH-CN-ALL"],
    permissions: ["finance", "payments", "reports"],
  },
  {
    id: "USR-005",
    name: "Anupong Thavorn",
    email: "anupong.t@contractor.com",
    phone: "+66-2-555-0127",
    role: "Site Engineer",
    department: "Engineering",
    status: "Inactive",
    lastLogin: "2024-02-10 16:30",
    joinDate: "2023-04-05",
    location: "Nakhon Ratchasima",
    avatar: "/placeholder.svg",
    projects: ["TH-CN-002"],
    permissions: ["site-access"],
  },
];

export const useDepartmentProvider = () => {
  const { toast } = useToast();
  const [departmentEditOpen, setDepartmentEditOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const { data: departmentList, refetch } = useDepartmentList();
  const { data: options } = useOptions();
  const { mutate: updateDepartment, isPending: isUpdating } =
    useUpdateDepartment();

  function handleEditDepartment(department: Department) {
    setSelectedDepartment(department);
    setDepartmentEditOpen(true);
  }

  function handleViewMembers(department: Department) {
    setSelectedDepartment(department);
    setMemberOpen(true);
  }

  function createPayload(department: DepartmentForm) {
    const responsibilities =
      department.keyResponsibilities?.map((resp) => resp.value).join(", ") ||
      "";
    return {
      ...department,
      responsibilities,
      keyResponsibilities: undefined,
    };
  }

  function handleUpdateDepartment(department: DepartmentForm) {
    const payload = createPayload(department);
    updateDepartment(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Department Updated",
          description: "Your department has been updated successfully.",
        });
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Update failed";
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: errorMessage,
        });
      },
    });
  }

  return {
    departmentList,
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    setSelectedDepartment,
    handleEditDepartment,
    memberOpen,
    setMemberOpen,
    handleViewMembers,
    teamMembers,
    options,
    refetch,
    handleUpdateDepartment,
    isUpdating,
  };
};
