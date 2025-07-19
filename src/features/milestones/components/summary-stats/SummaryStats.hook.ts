import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useSummaryStats = () => {
  const milestones = useContextSelector(
    MilestonesContext,
    (state) => state?.milestones
  );

  const completedMilestones =
    milestones?.filter((m) => m.status === "Completed").length ?? 0;
  const totalBudget = milestones?.reduce((sum, m) => sum + m.budget, 0) ?? 0;
  const totalSpent = milestones?.reduce((sum, m) => sum + m.actualCost, 0) ?? 0;
  const criticalMilestones = milestones?.filter(
    (m) => m.priority === "Critical"
  ).length;
  const delayedMilestones =
    milestones?.filter(
      (m) =>
        m.status === "Delayed" ||
        (m.status === "In Progress" && new Date(m.targetDate) < new Date())
    ).length ?? 0;

  function calculateOverallProgress() {
    const totalMilestones = milestones?.length ?? 0;
    return Math.round((completedMilestones / totalMilestones) * 100);
  }

  return {
    milestones,
    completedMilestones,
    totalBudget,
    totalSpent,
    criticalMilestones,
    delayedMilestones,
    calculateOverallProgress,
  };
};
