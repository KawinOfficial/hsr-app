import { useState } from "react";
import {
  Department,
  DepartmentForm,
} from "@/features/departments/schemas/Department.schema";
import { useDepartmentList } from "@/features/departments/hooks/use-department-list";
import { useOptions } from "@/hooks/use-option";
import { useUpdateDepartment } from "@/features/departments/hooks/use-update-department";
import { useToast } from "@/hooks/use-toast";

export const useDepartmentProvider = () => {
  const { toast } = useToast();
  const [departmentEditOpen, setDepartmentEditOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const { data: departmentList, refetch } = useDepartmentList();
  const { data: options } = useOptions();
  const { mutate: updateDepartment, isPending: isUpdating } =
    useUpdateDepartment();

  function handleEditDepartment(department: Department) {
    setSelectedDepartment(department);
    setDepartmentEditOpen(true);
  }

  function handleViewMembers(department: Department) {
    setSelectedDepartment(department);
    setMemberOpen(true);
  }

  function createPayload(department: DepartmentForm) {
    const responsibilities =
      department.keyResponsibilities?.map((resp) => resp.value).join(", ") ||
      "";
    return {
      ...department,
      responsibilities,
      keyResponsibilities: undefined,
    };
  }

  function handleUpdateDepartment(department: DepartmentForm) {
    const payload = createPayload(department);
    updateDepartment(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Department Updated",
          description: "Your department has been updated successfully.",
        });
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Update failed";
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: errorMessage,
        });
      },
    });
  }

  return {
    departmentList,
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    setSelectedDepartment,
    handleEditDepartment,
    memberOpen,
    setMemberOpen,
    handleViewMembers,
    options,
    refetch,
    handleUpdateDepartment,
    isUpdating,
  };
};
