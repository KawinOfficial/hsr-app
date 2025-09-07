import { useForm } from "react-hook-form";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useState } from "react";
import { useCreatePermission as useCreate } from "@/features/permissions/hooks/use-create-permission";
import { useToast } from "@/hooks/use-toast";
import { useContextSelector } from "use-context-selector";
import { PermissionContext } from "../permission-provider";

const defaultValues: PermissionGroup = {
  name: "",
  description: "",
  permissions: {
    projects: { read: true, create: true, update: true, delete: true },
    financial: { read: true, create: true, update: true, delete: true },
    users: { read: true, create: true, update: true, delete: true },
  },
  isActive: true,
  status: "active",
};

export const useCreatePermission = () => {
  const { toast } = useToast();
  const canCreate = useContextSelector(
    PermissionContext,
    (state) => state?.canCreate
  );

  const [open, setOpen] = useState(false);
  const { mutate: createPermission } = useCreate();

  const { register, handleSubmit, reset, control, watch } =
    useForm<PermissionGroup>({
      defaultValues,
    });

  const form = {
    fieldId: register("id"),
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldPermissions: register("permissions"),
    fieldIsActive: register("isActive"),
    control,
    watch,
  };

  function onSubmit(data: PermissionGroup) {
    createPermission(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Permission created successfully",
          description: "Permission created successfully",
        });
        setOpen(false);
        reset(defaultValues);
      },
      onError: (error) => {
        toast({
          title: "Failed to create permission",
          variant: "destructive",
          description:
            error instanceof Error
              ? error.message
              : "Failed to create permission",
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    setOpen(false);
  }

  return {
    open,
    setOpen,
    form,
    onSubmit: handleSubmit(onSubmit),
    onReset,
    canCreate,
  };
};
