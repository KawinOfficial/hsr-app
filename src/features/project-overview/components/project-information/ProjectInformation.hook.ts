import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";

export const useProjectInformation = () => {
  const { isEditMode, handleEdit, handleCancel, handleSave } =
    useContextSelector(ProjectDetailContext, (state) => ({
      isEditMode: state?.isEditMode,
      handleEdit: state?.handleEdit,
      handleCancel: state?.handleCancel,
      handleSave: state?.handleSave,
    }));
  const project = useContextSelector(
    ProjectDetailContext,
    (state) => state?.project
  );

  return { isEditMode, handleEdit, handleCancel, handleSave, project };
};
