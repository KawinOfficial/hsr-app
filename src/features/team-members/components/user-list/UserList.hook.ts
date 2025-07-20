import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/features/team-members/components/users-provider";
import { User } from "@/features/team-members/schemas/User.schema";

export const useUserList = () => {
  const paginatedMembers =
    useContextSelector(UsersContext, (state) => state?.paginatedMembers) ?? [];
  const paginated = useContextSelector(
    UsersContext,
    (state) => state?.paginated
  );
  const handlePageChange = useContextSelector(
    UsersContext,
    (state) => state?.handlePageChange
  );
  const totalItems = useContextSelector(
    UsersContext,
    (state) => state?.totalItems
  );
  const setSelectedUser = useContextSelector(
    UsersContext,
    (state) => state?.setSelectedUser
  );
  const setIsOpen = useContextSelector(
    UsersContext,
    (state) => state?.setIsOpen
  );

  const { currentPage, totalPages, startIndex, itemsPerPage } = paginated ?? {};

  function handleView(user: User) {
    setSelectedUser?.(user);
    setIsOpen?.(true);
  }

  return {
    paginatedMembers,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    totalItems,
    handlePageChange,
    handleView,
  };
};
