import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/features/team-members/components/users-provider";

export const useUserList = () => {
  const teamMembers = useContextSelector(
    UsersContext,
    (state) => state?.teamMembers
  );
  const handlePageChange = useContextSelector(
    UsersContext,
    (state) => state?.handlePageChange
  );
  const setSelectedUser = useContextSelector(
    UsersContext,
    (state) => state?.setSelectedUser
  );
  const setIsOpen = useContextSelector(
    UsersContext,
    (state) => state?.setIsOpen
  );
  const getRoleName = useContextSelector(
    UsersContext,
    (state) => state?.getRoleName
  );
  const getDepartmentName = useContextSelector(
    UsersContext,
    (state) => state?.getDepartmentName
  );
  const isLoading = useContextSelector(
    UsersContext,
    (state) => state?.isLoading
  );

  function handleView(id: string) {
    setSelectedUser?.(id);
    setIsOpen?.(true);
  }

  return {
    list: teamMembers?.data ?? [],
    pagination: teamMembers?.pagination,
    handlePageChange,
    handleView,
    getRoleName,
    getDepartmentName,
    isLoading,
  };
};
