import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useDepartmentMember } from "@/features/departments/hooks/use-department-member";
import { useState } from "react";

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
  const handleEditDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.handleEditDepartment
  );
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );

  const [page, setPage] = useState("1");
  const { data: departmentMember } = useDepartmentMember({
    id: selectedDepartment?.id || "",
    page,
    itemsPerPage: "10",
  });

  function onEditDepartment() {
    if (!selectedDepartment) return;
    handleEditDepartment?.(selectedDepartment);
  }

  function getRoleName(roleId: string) {
    return options?.roles.find((option) => option.value === roleId)?.label;
  }

  function handlePageChange(page: string) {
    setPage(page);
  }

  return {
    memberOpen,
    setMemberOpen,
    selectedDepartment,
    pagination: departmentMember?.pagination,
    list: departmentMember?.data,
    onEditDepartment,
    getRoleName,
    handlePageChange,
  };
};
