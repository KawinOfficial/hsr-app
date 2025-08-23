import { useContextSelector } from "use-context-selector";
import { DepartmentContext } from "../department-provider/DepartmentProvider";
import { useFieldArray, useForm } from "react-hook-form";
import { DepartmentForm } from "@/features/departments/schemas/Department.schema";
import { useEffect } from "react";

const defaultValues: DepartmentForm = {
  name: "",
  description: "",
  headId: "",
  budget: 0,
  responsibilities: "",
  status: "active",
  location: "",
  keyResponsibilities: [],
};

export const useDepartmentDetailDialog = () => {
  const departmentEditOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.departmentEditOpen
  );
  const setDepartmentEditOpen = useContextSelector(
    DepartmentContext,
    (state) => state?.setDepartmentEditOpen
  );
  const selectedDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.selectedDepartment
  );
  const options = useContextSelector(
    DepartmentContext,
    (state) => state?.options
  );
  const handleUpdateDepartment = useContextSelector(
    DepartmentContext,
    (state) => state?.handleUpdateDepartment
  );
  const isUpdating = useContextSelector(
    DepartmentContext,
    (state) => state?.isUpdating
  );

  const { register, handleSubmit, control, reset } = useForm<DepartmentForm>({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray<DepartmentForm>({
    control,
    name: "keyResponsibilities",
  });

  const form = {
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldHeadId: register("headId"),
    fieldBudget: register("budget"),
    fieldResponsibilities: register("responsibilities"),
    fieldStatus: register("status"),
    fieldLocation: register("location"),
    control,
    register,
  };

  function onSubmit(data: DepartmentForm) {
    handleUpdateDepartment?.(data);
  }

  function onReset() {
    setDepartmentEditOpen?.(false);
  }

  function onAddResponsibility() {
    append({ id: "", value: "" });
  }

  function onRemoveResponsibility(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (!selectedDepartment) return;
    reset({
      ...selectedDepartment,
      keyResponsibilities: selectedDepartment.keyResponsibilities.map(
        (resp) => ({
          id: resp,
          value: resp,
        })
      ),
    });
  }, [selectedDepartment, reset]);

  return {
    departmentEditOpen,
    setDepartmentEditOpen,
    selectedDepartment,
    options,
    form,
    onSubmit: handleSubmit(onSubmit),
    isUpdating,
    fields,
    onAddResponsibility,
    onRemoveResponsibility,
    onReset,
  };
};
