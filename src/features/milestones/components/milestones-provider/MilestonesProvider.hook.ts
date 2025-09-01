import { useMemo, useState } from "react";
import { Milestone } from "@/features/milestones/schemas/Milestones.schema";
import { useMilestone } from "@/features/milestones/hooks/use-milestone";
import { useDebouncedValue } from "@/hooks/use-debouce";
import { useProjectOptions } from "@/hooks/use-option";

interface UseMilestonesProvider {
  projectId?: string;
}

export const useMilestonesProvider = ({ projectId }: UseMilestonesProvider) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const query = useMemo(() => {
    return {
      page,
      limit: 10,
      keyword: debouncedKeyword.trim(),
      status: status === "all" ? "" : status.trim(),
      projectId,
    };
  }, [page, debouncedKeyword, status]);

  const {
    data: milestonesData,
    isLoading,
    refetch,
  } = useMilestone({
    ...query,
  });
  const { data: projectOptions } = useProjectOptions();

  function handleViewMilestone(milestone: Milestone) {
    setSelectedMilestone(milestone);
    setDetailViewOpen(true);
  }

  function handleCloseMilestone() {
    setSelectedMilestone(undefined);
    setDetailViewOpen(false);
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value);
  }

  function handleStatusChange(status: string) {
    setStatus(status);
  }

  return {
    projectOptions,
    selectedMilestone,
    detailViewOpen,
    setSelectedMilestone,
    setDetailViewOpen,
    handleViewMilestone,
    handleCloseMilestone,
    handlePageChange,
    handleSearch,
    handleStatusChange,
    milestonesData,
    isLoading,
    refetch,
    projectId,
  };
};
