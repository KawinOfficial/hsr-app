import { useDocumentTypeOptions, useProjectOptions } from "@/hooks/use-option";
import { useState } from "react";

export const useFinancialProvider = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();

  function onSelectProject(projectId: string) {
    setSelectedProject(projectId);
  }

  return {
    selectedProject: selectedProject === "all" ? null : selectedProject,
    onSelectProject,
    documentTypes,
    projectOptions,
  };
};
