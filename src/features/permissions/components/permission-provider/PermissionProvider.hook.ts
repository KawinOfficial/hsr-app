import { useState } from "react";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useGetPermission } from "@/features/permissions/hooks/use-permission";

export const usePermissionProvider = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPermissionGroup, setSelectedPermissionGroup] =
    useState<PermissionGroup | null>(null);

  const { data: permissionList, isLoading } = useGetPermission();

  function handleEdit(group: PermissionGroup) {
    setSelectedPermissionGroup(group);
    setEditOpen(true);
  }

  function handleSave(group: PermissionGroup) {
    setSelectedPermissionGroup(group);
    setEditOpen(false);
  }

  return {
    editOpen,
    setEditOpen,
    selectedPermissionGroup,
    setSelectedPermissionGroup,
    handleEdit,
    handleSave,
    permissionList,
    isLoading,
  };
};
