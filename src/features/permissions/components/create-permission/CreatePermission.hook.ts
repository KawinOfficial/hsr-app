import { useForm } from "react-hook-form";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";
import { useState } from "react";
import { useCreatePermission as useCreate } from "@/features/permissions/hooks/use-create-permission";
import { useToast } from "@/hooks/use-toast";

const defaultValues: PermissionGroup = {
  name: "",
  description: "",
  permissions: {
    dashboard: { read: true, write: true, admin: true },
    projects: { read: true, write: true, admin: true },
    financial: { read: true, write: true, admin: true },
    reports: { read: true, write: true, admin: true },
    users: { read: true, write: true, admin: true },
    settings: { read: true, write: true, admin: true },
  },
  isActive: true,
  status: "active",
};

export const useCreatePermission = () => {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const { mutate: createPermission } = useCreate();

  const { register, handleSubmit, reset } = useForm<PermissionGroup>({
    defaultValues,
  });

  const form = {
    fieldId: register("id"),
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldPermissions: register("permissions"),
    fieldIsActive: register("isActive"),
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
  };
};
