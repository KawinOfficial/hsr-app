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
    projectOptions,
  } = useContextSelector(MilestonesContext, (state) => state!);

  function getProjectName(projectId?: string) {
    return (
      projectOptions?.find((option) => option.value === projectId)?.label ||
      "No project"
    );
  }

  return {
    handleViewMilestone,
    list: milestonesData?.data || [],
    pagination: milestonesData?.pagination,
    isLoading,
    handlePageChange,
    handleSearch,
    handleStatusChange,
    getProjectName,
  };
};
