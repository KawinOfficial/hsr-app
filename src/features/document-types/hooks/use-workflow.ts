import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { validatedPromise } from "@/lib/promise";
import {
  WorkflowList,
  WorkflowListSchema,
} from "@/features/document-types/schemas/Workflow.schema";

export const useWorkflow = ({
  page,
  limit,
  keyword,
}: {
  page: number;
  limit: number;
  keyword: string;
}) => {
  return useQuery({
    queryKey: ["workflows", page, limit, keyword],
    queryFn: async () => {
      const response = await api
        .get<WorkflowList>(API_ROUTES.workflows, {
          searchParams: { page, limit, keyword },
        })
        .json();

      return validatedPromise<WorkflowList>(
        response,
        WorkflowListSchema,
        "workflows"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
