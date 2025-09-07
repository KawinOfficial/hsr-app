import { useDocumentTypeOptions, useProjectOptions } from "@/hooks/use-option";
import { usePermissions } from "@/hooks/use-permissions";
import { useState } from "react";

export const useFinancialProvider = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { data: documentTypes } = useDocumentTypeOptions();
  const { data: projectOptions } = useProjectOptions();
  const { checkPermission } = usePermissions();
  const canCreate = checkPermission("financial", "create");
  const canUpdate = checkPermission("financial", "update");
  const canDelete = checkPermission("financial", "delete");

  function onSelectProject(projectId: string) {
    setSelectedProject(projectId);
  }

  return {
    selectedProject: selectedProject === "all" ? null : selectedProject,
    onSelectProject,
    documentTypes,
    projectOptions,
    canCreate,
    canUpdate,
    canDelete,
  };
};
