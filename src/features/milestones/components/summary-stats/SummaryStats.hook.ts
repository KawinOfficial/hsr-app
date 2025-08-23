import { useSummary } from "@/features/milestones/hooks/use-summary";

export const useSummaryStats = () => {
  const { data: summaryData, isLoading } = useSummary();

  return {
    isLoading,
    summaryData,
  };
};
