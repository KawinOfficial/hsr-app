import { useMemo, useState } from "react";
import { useProjectList } from "@/features/project-overview/hooks/use-project-list";
import { useDebouncedValue } from "@/hooks/use-debouce";

export const useProjectProvider = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const debouncedKeyword = useDebouncedValue(keyword, 500);

  const query = useMemo(() => {
    return {
      page,
      limit: 10,
      keyword: debouncedKeyword,
      status: status === "all" ? "" : status.trim(),
    };
  }, [page, debouncedKeyword, status]);

  const { data: projectData, isLoading } = useProjectList(query);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function handleKeywordChange(keyword: string) {
    setKeyword(keyword);
  }

  function handleStatusChange(status: string) {
    setStatus(status);
  }

  return {
    projectData,
    isLoading,
    handlePageChange,
    handleKeywordChange,
    handleStatusChange,
  };
};
