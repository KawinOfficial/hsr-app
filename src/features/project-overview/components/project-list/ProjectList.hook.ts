import { useContextSelector } from "use-context-selector";
import { ProjectContext } from "@/features/project-overview/components/project-provider";
import { STATUS_OPTIONS } from "@/features/project-overview/constants/options";

export const useProjectList = () => {
  const projects = useContextSelector(
    ProjectContext,
    (state) => state?.projects!
  );

  return { statusOptions: STATUS_OPTIONS, projects };
};
