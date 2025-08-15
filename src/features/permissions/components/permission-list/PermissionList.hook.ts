import { PermissionContext } from "@/features/permissions/components/permission-provider";
import { useContextSelector } from "use-context-selector";

export const usePermissionList = () => {
  const handleEdit = useContextSelector(
    PermissionContext,
    (state) => state?.handleEdit
  );
  const permissionList = useContextSelector(
    PermissionContext,
    (state) => state?.permissionList
  );
  const isLoading = useContextSelector(
    PermissionContext,
    (state) => state?.isLoading
  );

  return { handleEdit, permissionList, isLoading };
};
