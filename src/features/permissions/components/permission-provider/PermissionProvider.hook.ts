import { useState } from "react";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";

export const usePermissionProvider = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPermissionGroup, setSelectedPermissionGroup] =
    useState<PermissionGroup | null>(null);

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
  };
};
