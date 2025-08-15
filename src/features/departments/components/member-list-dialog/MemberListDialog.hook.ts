import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";

export const useMemberListDialog = () => {
  const memberOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.memberOpen
  );
  const setMemberOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.setMemberOpen
  );
  const selectedDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.selectedDepartment
  );
  const teamMembers = useContextSelector(
    DepartmentContext,
    (state) => state?.teamMembers
  );
  const handleEditDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.handleEditDepartment
  );

  function onEditDepartment() {
    if (!selectedDepartment) return;
    handleEditDepartment?.(selectedDepartment);
  }

  return {
    memberOpen,
    setMemberOpen,
    selectedDepartment,
    teamMembers,
    onEditDepartment,
  };
};
