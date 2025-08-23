import { useState } from "react";
import { useProjectDetail } from "@/features/project-overview/hooks/use-project-detail";
import { useUpdateProject } from "@/features/project-overview/hooks/use-update-project";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Project } from "@/features/project-overview/schemas/Project.schema";

export interface UseProjectDetailProvider {
  id?: string;
}

export const useProjectDetailProvider = ({ id }: UseProjectDetailProvider) => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: projectData, isLoading } = useProjectDetail(id ?? "");
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject(
    id ?? ""
  );

  const methods = useForm<Project>({
    defaultValues: projectData,
  });
  const { reset, watch, register } = methods;
  const form = {
    fieldName: register("name"),
    fieldDescription: register("description"),
    fieldStatus: register("status"),
    fieldRiskLevel: register("riskLevel"),
    fieldStartDate: register("startDate"),
    fieldTargetDate: register("targetDate"),
    fieldLocation: register("location"),
  };

  function handleEdit() {
    setIsEditMode(true);
  }

  function handleCancel() {
    reset(projectData);
    setIsEditMode(false);
  }

  function handleSave() {
    const payload = {
      ...watch(),
    };
    updateProject(payload, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Project Created",
          description: "Your project has been created successfully.",
        });
        setIsEditMode(false);
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        toast({
          variant: "destructive",
          title: "Project Creation Failed",
          description: errorMessage,
        });
      },
    });
  }

  return {
    handleEdit,
    handleCancel,
    handleSave,
    isEditMode,
    isLoading,
    projectData,
    isUpdating,
    form,
    methods,
  };
};
