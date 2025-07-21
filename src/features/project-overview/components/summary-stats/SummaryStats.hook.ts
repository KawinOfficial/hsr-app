import { useContextSelector } from "use-context-selector";
import { ProjectContext } from "@/features/project-overview/components/project-provider";

export const useSummaryStats = () => {
  const projects = useContextSelector(
    ProjectContext,
    (state) => state?.projects
  );

  const totalBudget = projects?.reduce((sum, p) => sum + p.budget, 0) ?? 0;
  const totalSpent = projects?.reduce((sum, p) => sum + p.spent, 0) ?? 0;
  const avgProgress =
    (projects?.reduce((sum, p) => sum + p.progress, 0) ?? 0) /
    (projects?.length ?? 1);
  const onTrackCount = projects?.filter((p) => p.status === "On Track").length;

  return { projects, totalBudget, totalSpent, avgProgress, onTrackCount };
};
