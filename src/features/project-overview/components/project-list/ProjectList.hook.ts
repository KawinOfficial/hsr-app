import { useContextSelector } from "use-context-selector";
import { ProjectContext } from "@/features/project-overview/components/project-provider";
import { STATUS_OPTIONS } from "@/features/project-overview/constants/options";

export const useProjectList = () => {
  const projectData = useContextSelector(
    ProjectContext,
    (state) => state?.projectData
  );
  const isLoading = useContextSelector(
    ProjectContext,
    (state) => state?.isLoading
  );
  const handlePageChange = useContextSelector(
    ProjectContext,
    (state) => state?.handlePageChange
  );
  const handleStatusChange = useContextSelector(
    ProjectContext,
    (state) => state?.handleStatusChange
  );
  const handleKeywordChange = useContextSelector(
    ProjectContext,
    (state) => state?.handleKeywordChange
  );

  return {
    statusOptions: STATUS_OPTIONS,
    list: projectData?.data ?? [],
    pagination: projectData?.pagination,
    isLoading,
    handlePageChange,
    handleStatusChange,
    handleKeywordChange,
  };
};
