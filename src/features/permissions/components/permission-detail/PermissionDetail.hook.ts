import { useContextSelector } from "use-context-selector";
import { PermissionContext } from "@/features/permissions/components/permission-provider";
import { useForm } from "react-hook-form";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useEffect } from "react";

const defaultValues: PermissionGroup = {
  name: "",
  description: "",
  status: "active",
  permissions: {
    projects: { read: true, create: true, update: true, delete: true },
    financial: { read: true, create: true, update: true, delete: true },
    users: { read: true, create: true, update: true, delete: true },
  },
};

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

  const { register, handleSubmit, reset, control } = useForm<PermissionGroup>({
    defaultValues,
  });

  const form = {
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldStatus: register("status"),
    control,
    register,
  };

  function onSubmit(data: PermissionGroup) {
    handleSave?.(data);
  }

  function onReset() {
    reset(defaultValues);
    setEditOpen?.(false);
  }

  useEffect(() => {
    if (!selectedPermissionGroup) return;
    reset(selectedPermissionGroup);
  }, [selectedPermissionGroup, reset]);

  return {
    editOpen,
    setEditOpen,
    selectedPermissionGroup,
    handleSave,
    form,
    onSubmit: handleSubmit(onSubmit),
    onReset,
  };
};
