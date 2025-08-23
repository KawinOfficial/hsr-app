import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";

export const useTrackingList = () => {
  const {
    milestonesData,
    isLoading,
    handlePageChange,
    handleSearch,
    handleStatusChange,
    handleViewMilestone,
  } = useContextSelector(MilestonesContext, (state) => state!);

  return {
    handleViewMilestone,
    list: milestonesData?.data || [],
    pagination: milestonesData?.pagination,
    isLoading,
    handlePageChange,
    handleSearch,
    handleStatusChange,
  };
};
