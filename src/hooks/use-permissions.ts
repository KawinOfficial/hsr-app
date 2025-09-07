import { useProfile } from "@/features/auths/hook/use-profile";
import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";
import { hasPermission } from "@/lib/permission";

export const usePermissions = () => {
  const { data: profile, isLoading } = useProfile();

  const permissions: PermissionsMatrix | null = profile?.permissions || null;

  const checkPermission = (
    permission: keyof PermissionsMatrix,
    action: "read" | "create" | "update" | "delete"
  ) => {
    if (!permissions) return false;
    const userPermissions = hasPermission(permissions, permission);
    return userPermissions[action];
  };

  const canRead = (permission: keyof PermissionsMatrix) =>
    checkPermission(permission, "read");
  const canCreate = (permission: keyof PermissionsMatrix) =>
    checkPermission(permission, "create");
  const canUpdate = (permission: keyof PermissionsMatrix) =>
    checkPermission(permission, "update");
  const canDelete = (permission: keyof PermissionsMatrix) =>
    checkPermission(permission, "delete");

  return {
    permissions,
    isLoading,
    checkPermission,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
  };
};
