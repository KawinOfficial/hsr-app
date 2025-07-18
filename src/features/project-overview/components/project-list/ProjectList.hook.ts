import { useContextSelector } from "use-context-selector";
import { ProjectContext } from "@/features/project-overview/components/project-provider";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "On Track", value: "On Track" },
  { label: "Delayed", value: "Delayed" },
  { label: "At Risk", value: "At Risk" },
  { label: "Planning", value: "Planning" },
];

export const useProjectList = () => {
  const projects = useContextSelector(
    ProjectContext,
    (state) => state?.projects!
  );

  return { statusOptions, projects };
};
