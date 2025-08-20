import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/features/team-members/components/users-provider";
import { useMemberDetail } from "@/features/team-members/hooks/use-member-detail";

export const useUserDetailDialog = () => {
  const selectedUser = useContextSelector(
    UsersContext,
    (state) => state?.selectedUser
  );
  const isOpen = useContextSelector(UsersContext, (state) => state?.isOpen);
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

  const { data: userDetails } = useMemberDetail(selectedUser ?? "");

  return {
    userDetails,
    isOpen,
    setIsOpen,
    getRoleName,
    getDepartmentName,
  };
};
