import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useCreateDepartment as useCreate } from "@/features/departments/hooks/use-create-department";
import { useForm } from "react-hook-form";
import { DepartmentForm } from "@/features/departments/schemas/Department.schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const defaultValues: DepartmentForm = {
  name: "",
  description: "",
  headId: "",
  teamMembers: 0,
  budget: 0,
  responsibilities: "",
  status: "active",
  location: "",
};

export const useCreateDepartment = () => {
  const { toast } = useToast();
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );
  const refetch = useContextSelector(
    DepartmentContext,
    (state) => state?.refetch
  );

  const [open, setOpen] = useState(false);

  const { mutate: createDepartment, isPending } = useCreate();

  const { register, handleSubmit, control, reset } = useForm<DepartmentForm>({
    defaultValues,
  });

  const form = {
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldHeadId: register("headId"),
    fieldTeamMembers: register("teamMembers"),
    fieldBudget: register("budget"),
    fieldResponsibilities: register("responsibilities"),
    fieldStatus: register("status"),
    fieldLocation: register("location"),
    control,
  };

  function onSubmit(data: DepartmentForm) {
    createDepartment(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Department Created",
          description: "Your department has been created successfully.",
        });
        refetch?.();
        onReset();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Department Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    setOpen(false);
    reset(defaultValues);
  }

  return {
    options,
    form,
    open,
    setOpen,
    onReset,
    onSubmit: handleSubmit(onSubmit),
    isPending,
  };
};
