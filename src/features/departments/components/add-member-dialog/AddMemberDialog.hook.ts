import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useMemo, useState } from "react";
import { useMemberList } from "@/features/departments/hooks/use-member-list";
import { useAddMember } from "@/features/departments/hooks/use-add-member";
import { useToast } from "@/hooks/use-toast";
import { useDebouncedValue } from "@/hooks/use-debouce";

export const useAddMemberDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [roleId, setRoleId] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  const selectedDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.selectedDepartment
  );
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );

  const debouncedKeyword = useDebouncedValue(keyword, 500);
  const query = useMemo(
    () => ({
      page,
      limit: 10,
      departmentId: selectedDepartment?.id || "",
      roleId: roleId === "all" ? "" : roleId,
      keyword: debouncedKeyword,
    }),
    [page, selectedDepartment?.id, roleId, debouncedKeyword]
  );

  const { mutate: addMember } = useAddMember();
  const { data: teamMembers } = useMemberList(query);

  const roleOptions = useMemo(() => {
    return [{ label: "All", value: "all" }, ...(options?.roles || [])];
  }, [options]);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function getRoleName(roleId?: string) {
    return (
      options?.roles.find((option) => option.value === roleId)?.label || "-"
    );
  }

  function getDepartmentName(departmentId?: string) {
    return (
      options?.departments.find((option) => option.value === departmentId)
        ?.label || "-"
    );
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleRoleChange(roleId: string) {
    setRoleId(roleId);
  }

  function onCheckMember(userId: string) {
    setSelectedMembers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  }

  function isChecked(userId: string) {
    return selectedMembers.includes(userId);
  }

  function handleClose() {
    setSelectedMembers([]);
    setOpen(false);
  }

  function onAddMember() {
    if (!selectedDepartment?.id) return;

    const payload = {
      userIds: selectedMembers,
      departmentId: selectedDepartment.id,
    };

    addMember(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Members added successfully",
          description: "Members have been added to the department",
        });
        handleClose();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Failed to add members",
          description: error.message,
        });
      },
    });
  }

  return {
    list: teamMembers?.data,
    pagination: teamMembers?.pagination,
    open,
    setOpen,
    handlePageChange,
    getRoleName,
    getDepartmentName,
    onCheckMember,
    isChecked,
    onAddMember,
    handleSearch,
    handleRoleChange,
    roleOptions,
  };
};
