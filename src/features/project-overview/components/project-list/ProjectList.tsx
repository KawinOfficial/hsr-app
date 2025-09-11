"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectList } from "./ProjectList.hook";
import { ProjectCard } from "@/features/project-overview/components/project-card";
import { Pagination } from "@/components/pagination";
import { Loading } from "@/components/loading";

const ProjectList = () => {
  const {
    statusOptions,
    list,
    pagination,
    isLoading,
    handlePageChange,
    handleStatusChange,
    handleKeywordChange,
  } = useProjectList();
  return (
    <div className="mb-6 space-y-6">
      {isLoading && <Loading />}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10 w-full sm:w-64"
            onChange={(e) => handleKeywordChange?.(e.target.value)}
          />
        </div>

        <Select
          defaultValue={statusOptions[0].value}
          onValueChange={(value) => handleStatusChange?.(value)}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {list?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Pagination
          totalPages={pagination?.totalPages ?? 0}
          currentPage={pagination?.currentPage ?? 1}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProjectList;
