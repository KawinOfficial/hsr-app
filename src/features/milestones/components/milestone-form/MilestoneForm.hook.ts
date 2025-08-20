import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Milestone,
  MilestoneSchema,
} from "@/features/milestones/schemas/Milestones.schema";

const defaultValues: Milestone = {
  name: "",
  description: "",
  phase: "",
  priority: "",
  budget: 0,
  actualCost: 0,
  startDate: "",
  targetDate: "",
  deliverables: [{ name: "" }],
  id: "",
  milestoneId: "",
  status: "",
  progress: 0,
};

export const useMilestoneForm = () => {
  const { register, handleSubmit, control, reset } = useForm<Milestone>({
    resolver: zodResolver(MilestoneSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "deliverables",
  });

  const form = {
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldPhase: register("phase"),
    fieldPriority: register("priority"),
    fieldBudget: register("budget"),
    fieldActualCost: register("actualCost"),
    fieldStart: register("startDate"),
    fieldTarget: register("targetDate"),
    control,
    register,
  };

  function onSubmit(data: Milestone) {
    console.log(data);
  }

  function onReset() {
    reset();
  }

  function onRemoveResponsibility(index: number) {
    remove(index);
  }

  function onAddResponsibility() {
    append({ name: "" });
  }

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    fields,
    onRemoveResponsibility,
    onAddResponsibility,
    onReset,
  };
};
