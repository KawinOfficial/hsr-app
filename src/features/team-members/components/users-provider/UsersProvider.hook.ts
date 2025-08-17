import { useState } from "react";
import { useTeamMember } from "@/features/team-members/hooks/use-team-member";
import { useOptions } from "@/hooks/use-option";

export const useUsersProvider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data: teamMembers, isLoading } = useTeamMember(
    currentPage.toString(),
    itemsPerPage.toString()
  );
  const { data: options } = useOptions();

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function getRoleName(roleId: string) {
    return options?.roles.find((role) => role.value === roleId)?.label;
  }

  function getDepartmentName(departmentId: string) {
    return options?.departments.find(
      (department) => department.value === departmentId
    )?.label;
  }

  return {
    handlePageChange,
    isOpen,
    setIsOpen,
    selectedUser,
    setSelectedUser,
    isLoading,
    teamMembers,
    getRoleName,
    getDepartmentName,
  };
};
