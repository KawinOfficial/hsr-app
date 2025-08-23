"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProject } from "@/features/project-overview/schemas/CreateProject.schema";
import { useCreateProject } from "@/features/project-overview/hooks/use-create-project";
import { useToast } from "@/components/ui/use-toast";

const defaultValues: CreateProject = {
  name: "",
  description: "",
  status: "On Track",
  budget: 0,
  startDate: "",
  completion: "",
  location: "",
  category: "",
  manager: "",
  riskLevel: "Low",
};

export const useCreateProjectDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

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
    fieldCompletion: methods.register("completion", {
      required: "Completion date is required",
    }),
    fieldLocation: methods.register("location", {
      required: "Location is required",
    }),
    fieldCategory: methods.register("category", {
      required: "Category is required",
    }),
    fieldManager: methods.register("manager", {
      required: "Project manager is required",
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
  };
};
