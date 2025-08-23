import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { ProjectList, ProjectListSchema } from "../schemas/Project.schema";
import { validatedPromise } from "@/lib/promise";

export const useProjectList = ({
  page,
  limit,
  keyword,
  status,
}: {
  page: number;
  limit: number;
  keyword: string;
  status: string;
}) => {
  return useQuery({
    queryKey: ["project-list", page, limit, keyword, status],
    queryFn: async () => {
      const response = await api
        .get<ProjectList>(API_ROUTES.project, {
          searchParams: { page, limit, keyword, status },
        })
        .json();

      return validatedPromise<ProjectList>(
        response,
        ProjectListSchema,
        "project list"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
