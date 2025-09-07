import { PermissionsMatrix } from "@/features/permissions/schemas/Permission.schema";

export function hasPermission(
  permissions: PermissionsMatrix,
  permission: keyof PermissionsMatrix
) {
  return {
    read: permissions[permission].read,
    create: permissions[permission].create,
    update: permissions[permission].update,
    delete: permissions[permission].delete,
  };
}
