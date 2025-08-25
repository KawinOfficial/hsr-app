import { useFieldArray, useForm } from "react-hook-form";
import { Workflow } from "@/features/document-types/schemas/Workflow.schema";
import { WorkflowContext } from "../workflow-provider";
import { useContextSelector } from "use-context-selector";
import { useCreateWorkflow } from "@/features/document-types/hooks/use-create-workflow";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useUpdateWorkflow } from "@/features/document-types/hooks/use-update-workflow";

export interface UseWorkflowForm {
  id?: string;
  onClose?: () => void;
}

const defaultStep = {
  name: "",
  type: "",
  userId: "",
  timeLimit: "",
};

const defaultValues: Workflow = {
  name: "",
  workflowId: "",
  description: "",
  steps: [defaultStep],
};

export const useWorkflowForm = ({ id, onClose }: UseWorkflowForm) => {
  const { toast } = useToast();

  const options = useContextSelector(
    WorkflowContext,
    (state) => state?.options
  );
  const refetch = useContextSelector(
    WorkflowContext,
    (state) => state?.refetch
  );
  const selectedWorkflow = useContextSelector(
    WorkflowContext,
    (state) => state?.selectedWorkflow
  );
  const setSelectedWorkflow = useContextSelector(
    WorkflowContext,
    (state) => state?.setSelectedWorkflow
  );

  const { mutate: createWorkflow } = useCreateWorkflow();
  const { mutate: updateWorkflow } = useUpdateWorkflow({ id: id ?? "" });

  const methods = useForm<Workflow>({
    defaultValues,
  });
  const { reset, handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  function onSubmit(data: Workflow) {
    if (id) {
      updateWorkflow(data, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Workflow Updated",
            description: "Your workflow has been updated successfully.",
          });
          refetch?.();
          setSelectedWorkflow?.(null);
          onClose?.();
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : "Workflow update failed";
          toast({
            variant: "destructive",
            title: "Workflow Update Failed",
            description: errorMessage,
          });
        },
      });
      return;
    }

    createWorkflow(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Workflow Created",
          description: "Your workflow has been created successfully.",
        });
        refetch?.();
        onClose?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Workflow creation failed";
        toast({
          variant: "destructive",
          title: "Workflow Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  function onReset() {
    reset(defaultValues);
    onClose?.();
  }

  function onAddStep() {
    append(defaultStep);
  }

  function onRemoveStep(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (!id || !selectedWorkflow) {
      reset(defaultValues);
      return;
    }
    reset(selectedWorkflow);
  }, [id, reset, selectedWorkflow]);

  return {
    methods,
    onReset,
    onSubmit: handleSubmit(onSubmit),
    fields,
    onAddStep,
    onRemoveStep,
    usersOptions: options?.users,
  };
};
