"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProject } from "@/features/project-overview/schemas/CreateProject.schema";
import { useCreateProject } from "@/features/project-overview/hooks/use-create-project";
import { useToast } from "@/components/ui/use-toast";
import { useContextSelector } from "use-context-selector";
import { ProfileContext } from "@/features/profile/components/profile-provider/ProfileProvider";

const defaultValues: CreateProject = {
  name: "",
  description: "",
  status: "Not Started",
  budget: 0,
  startDate: "",
  targetDate: "",
  location: "",
  riskLevel: "Low",
  departmentId: "",
  projectId: "",
};

export const useCreateProjectDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const options = useContextSelector(ProfileContext, (state) => state?.options);

  const { mutate: createProject, isPending: isSubmitting } = useCreateProject();

  const methods = useForm<CreateProject>({
    defaultValues,
  });
  const form = {
    ...methods,
    fieldName: methods.register("name", {
      required: "Project name is required",
    }),
    fieldDescription: methods.register("description", {
      required: "Project description is required",
    }),
    fieldStatus: methods.register("status", {
      required: "Project status is required",
    }),
    fieldBudget: methods.register("budget", {
      required: "Budget is required",
    }),
    fieldStartDate: methods.register("startDate", {
      required: "Start date is required",
    }),
    fieldTargetDate: methods.register("targetDate", {
      required: "Completion date is required",
    }),
    fieldLocation: methods.register("location", {
      required: "Location is required",
    }),
    fieldRiskLevel: methods.register("riskLevel", {
      required: "Risk level is required",
    }),
  };

  function onSubmit(data: CreateProject) {
    createProject(data, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Project Created",
          description: "Your project has been created successfully.",
        });
        closeDialog();
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

  const closeDialog = () => {
    setIsOpen(false);
    form.reset();
  };

  return {
    form,
    isOpen,
    isSubmitting,
    setIsOpen,
    closeDialog,
    onSubmit: form.handleSubmit(onSubmit),
    departmentOptions: options?.departments ?? [],
  };
};
