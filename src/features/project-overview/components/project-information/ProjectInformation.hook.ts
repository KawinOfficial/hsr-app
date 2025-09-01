import { useContextSelector } from "use-context-selector";
import { ProjectDetailContext } from "@/features/project-overview/components/project-detail-provider";
import { ProfileContext } from "@/features/profile/components/profile-provider";

export const useProjectInformation = () => {
  const isEditMode = useContextSelector(
    ProjectDetailContext,
    (state) => state?.isEditMode
  );
  const project = useContextSelector(
    ProjectDetailContext,
    (state) => state?.projectData
  );
  const methods = useContextSelector(
    ProjectDetailContext,
    (state) => state?.methods
  );
  const isLoading = useContextSelector(
    ProjectDetailContext,
    (state) => state?.isLoading
  );
  const options = useContextSelector(ProfileContext, (state) => state?.options);

  function getDepartmentName(departmentId: string) {
    return (
      options?.departments?.find(
        (department) => department.value === departmentId
      )?.label ?? "-"
    );
  }

  return { isEditMode, project, methods, isLoading, getDepartmentName };
};
