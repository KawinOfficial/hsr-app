import { useContextSelector } from "use-context-selector";
import { PermissionContext } from "@/features/permissions/components/permission-provider";

export const usePermissionDetail = () => {
  const editOpen = useContextSelector(
    PermissionContext,
    (state) => state?.editOpen
  );
  const setEditOpen = useContextSelector(
    PermissionContext,
    (state) => state?.setEditOpen
  );
  const selectedPermissionGroup = useContextSelector(
    PermissionContext,
    (state) => state?.selectedPermissionGroup
  );
  const handleSave = useContextSelector(
    PermissionContext,
    (state) => state?.handleSave
  );

  return {
    editOpen,
    setEditOpen,
    selectedPermissionGroup,
    handleSave,
  };
};
