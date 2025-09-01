import { useState } from "react";
import { useTeamMember } from "@/features/team-members/hooks/use-team-member";
import { useOptions } from "@/hooks/use-option";
import { useDebouncedValue } from "@/hooks/use-debouce";

interface UseUsersProvider {
  projectId?: string;
}

export const useUsersProvider = ({ projectId }: UseUsersProvider) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const { data: options } = useOptions();
  const { data: teamMembers, isLoading } = useTeamMember({
    page,
    limit: 10,
    keyword: debouncedKeyword,
  });

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
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
    handleSearch,
  };
};
