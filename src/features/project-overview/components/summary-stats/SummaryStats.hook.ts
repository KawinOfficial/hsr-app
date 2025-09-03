import { useProjectList } from "../../hooks/use-project-list";

export const useSummaryStats = () => {
  const { data: projects } = useProjectList({
    page: 1,
    limit: 999,
    keyword: "",
    status: "",
  });

  const totalBudget =
    projects?.data?.reduce((sum, p) => sum + p.budget, 0) ?? 0;
  const totalSpent = projects?.data?.reduce((sum, p) => sum + p.spent, 0) ?? 0;
  const avgProgress =
    (projects?.data?.reduce((sum, p) => sum + p.progress, 0) ?? 0) /
    (projects?.data?.length ?? 1);
  const onTrackCount =
    projects?.data?.filter(
      (p) => p.status === "On Track" || p.status === "In Progress"
    ).length ?? 0;

  return { projects, totalBudget, totalSpent, avgProgress, onTrackCount };
};
