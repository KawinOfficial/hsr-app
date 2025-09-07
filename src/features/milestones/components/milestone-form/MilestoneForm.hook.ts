import { useFieldArray, useForm } from "react-hook-form";
import { MilestoneForm } from "@/features/milestones/schemas/Milestones.schema";
import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "../milestones-provider/MilestonesProvider";
import { useEffect } from "react";
import { useCreateMilestone } from "@/features/milestones/hooks/use-create-milestone";
import { useToast } from "@/hooks/use-toast";
import { useUpdateMilestone } from "@/features/milestones/hooks/use-update-milestone";
import { formatDateInput } from "@/lib/format";

const defaultValues: MilestoneForm = {
  name: "",
  description: "",
  phase: "",
  priority: "",
  budget: 0,
  actualCost: 0,
  startDate: "",
  targetDate: "",
  deliverables: [{ name: "" }],
  milestoneId: "",
  status: "Not Started",
  projectId: "",
};

export interface UseMilestoneForm {
  id?: string;
  onClose?: () => void;
}

export const useMilestoneForm = ({ id, onClose }: UseMilestoneForm) => {
  const { toast } = useToast();
  const selectedMilestone = useContextSelector(
    MilestonesContext,
    (state) => state?.selectedMilestone
  );
  const refetch = useContextSelector(
    MilestonesContext,
    (state) => state?.refetch
  );
  const projectOptions = useContextSelector(
    MilestonesContext,
    (state) => state?.projectOptions
  );
  const projectId = useContextSelector(
    MilestonesContext,
    (state) => state?.projectId
  );
  const canEditMilestone = useContextSelector(
    MilestonesContext,
    (state) => state?.canEditMilestone
  );

  const { mutate: createMilestone } = useCreateMilestone();
  const { mutate: updateMilestone } = useUpdateMilestone(id ?? "");

  const { register, handleSubmit, control, reset, watch, setValue } =
    useForm<MilestoneForm>({
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
    fieldMilestoneId: register("milestoneId"),
    fieldStatus: register("status"),
    fieldProjectId: register("projectId"),
    control,
    register,
    watch,
    setValue,
  };

  function onSubmit(data: MilestoneForm) {
    const payload = {
      ...data,
    };
    if (!id) {
      createMilestone(payload, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Milestone Created",
            description: "Your milestone has been created successfully.",
          });
          onClose?.();
          refetch?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          toast({
            variant: "destructive",
            title: "Milestone Creation Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    updateMilestone(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Milestone Updated",
          description: "Your milestone has been updated successfully.",
        });
        refetch?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Milestone Update Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset();
    onClose?.();
  }

  function onRemoveResponsibility(index: number) {
    remove(index);
  }

  function onAddResponsibility() {
    append({ name: "" });
  }

  useEffect(() => {
    if (!id || !selectedMilestone) {
      reset({ ...defaultValues, projectId: projectId ?? "" });
      return;
    }
    const { actualCost, startDate, targetDate } = selectedMilestone;

    reset({
      ...selectedMilestone,
      actualCost: actualCost || 0,
      startDate: formatDateInput(startDate),
      targetDate: formatDateInput(targetDate),
    });
  }, [selectedMilestone, reset, id, projectId]);

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    fields,
    onRemoveResponsibility,
    onAddResponsibility,
    onReset,
    projectOptions,
    projectId,
    canEditMilestone,
  };
};
