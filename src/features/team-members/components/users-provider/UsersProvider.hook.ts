import { useMemo, useState } from "react";
import { User, Users } from "@/features/team-members/schemas/User.schema";

const teamMembers: Users = [
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

export const useUsersProvider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const paginated = useMemo(() => {
    const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return {
      currentPage,
      itemsPerPage,
      totalPages,
      startIndex,
    };
  }, [currentPage, itemsPerPage]);

  const paginatedMembers = teamMembers.slice(
    paginated.startIndex,
    paginated.startIndex + paginated.itemsPerPage
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  return {
    paginated,
    totalItems: teamMembers.length,
    paginatedMembers,
    handlePageChange,
    isOpen,
    setIsOpen,
    selectedUser,
    setSelectedUser,
  };
};
