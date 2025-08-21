"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProjectSchema,
  CreateProject,
} from "@/features/project-overview/schemas/CreateProject.schema";

const defaultValues: CreateProject = {
  title: "",
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
  const [isOpen, setIsOpen] = useState(false);

  const isSubmitting = false;

  const form = useForm<CreateProject>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues,
  });

  function onSubmit(data: CreateProject) {
    console.log(data);
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
