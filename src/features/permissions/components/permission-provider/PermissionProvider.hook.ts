import { useState } from "react";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useGetPermission } from "@/features/permissions/hooks/use-permission";
import { useUpdatePermission } from "@/features/permissions/hooks/use-update-permission";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";

export const usePermissionProvider = () => {
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPermissionGroup, setSelectedPermissionGroup] =
    useState<PermissionGroup | null>(null);

  const { data: permissionList, isLoading, refetch } = useGetPermission();
  const { mutate: updatePermission } = useUpdatePermission();
  const { checkPermission } = usePermissions();
  const canUpdate = checkPermission("users", "update");
  const canDelete = checkPermission("users", "delete");
  const canCreate = checkPermission("users", "create");

  function handleEdit(group: PermissionGroup) {
    setSelectedPermissionGroup(group);
    setEditOpen(true);
  }

  function handleSave(group: PermissionGroup) {
    const payload = {
      ...group,
      isActive: group.status === "active" ? true : false,
    };

    updatePermission(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Permission updated successfully",
        });
        setEditOpen(false);
        refetch();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
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
    canUpdate,
    canDelete,
    canCreate,
  };
};
