import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useDepartmentMember } from "@/features/departments/hooks/use-department-member";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debouce";

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

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [roleId, setRoleId] = useState("all");
  const debouncedKeyword = useDebouncedValue(keyword, 500);
  const query = useMemo(
    () => ({
      id: selectedDepartment?.id || "",
      page,
      limit: 10,
      keyword: debouncedKeyword,
      roleId: roleId === "all" ? "" : roleId,
    }),
    [selectedDepartment?.id, page, debouncedKeyword, roleId]
  );

  const { data: departmentMember, isLoading } = useDepartmentMember(query);

  const roleOptions = useMemo(() => {
    return [{ label: "All", value: "all" }, ...(options?.roles || [])];
  }, [options]);

  function onEditDepartment() {
    if (!selectedDepartment) return;
    handleEditDepartment?.(selectedDepartment);
  }

  function getRoleName(roleId: string) {
    return options?.roles.find((option) => option.value === roleId)?.label;
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleRoleChange(roleId: string) {
    setRoleId(roleId);
  }

  return {
    memberOpen,
    setMemberOpen,
    selectedDepartment,
    pagination: departmentMember?.pagination,
    list: departmentMember?.data,
    roleOptions,
    onEditDepartment,
    getRoleName,
    handlePageChange,
    handleSearch,
    handleRoleChange,
    isLoading,
  };
};
