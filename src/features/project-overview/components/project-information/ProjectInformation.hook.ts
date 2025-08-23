import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";

export const useProjectInformation = () => {
  const isEditMode = useContextSelector(
    ProjectDetailContext,
    (state) => state?.isEditMode
  );
  const project = useContextSelector(
    ProjectDetailContext,
    (state) => state?.projectData
  );
  const form = useContextSelector(ProjectDetailContext, (state) => state?.form);
  const methods = useContextSelector(
    ProjectDetailContext,
    (state) => state?.methods
  );

  return { isEditMode, project, form, methods };
};
