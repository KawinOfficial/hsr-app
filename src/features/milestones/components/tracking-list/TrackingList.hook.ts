import { useContextSelector } from "use-context-selector";
import { MilestonesContext } from "@/features/milestones/components/milestones-provider/MilestonesProvider";
import { useMilestone } from "@/features/milestones/hooks/use-milestone";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debouce";

export const useTrackingList = () => {
  const handleViewMilestone = useContextSelector(
    MilestonesContext,
    (state) => state?.handleViewMilestone
  );

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
    };
  }, [page, debouncedKeyword, status]);

  const { data: milestonesData, isLoading } = useMilestone({
    ...query,
  });

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
    handleViewMilestone,
    list: milestonesData?.data || [],
    pagination: milestonesData?.pagination,
    isLoading,
    handlePageChange,
    handleSearch,
    handleStatusChange,
  };
};
