import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import {
  MilestoneList,
  MilestoneListSchema,
} from "@/features/milestones/schemas/Milestones.schema";
import { validatedPromise } from "@/lib/promise";

export const useMilestone = ({
  page,
  limit,
  keyword,
  status,
  projectId,
}: {
  page: number;
  limit: number;
  keyword: string;
  status: string;
  projectId?: string;
}) => {
  return useQuery({
    queryKey: ["milestone", page, limit, keyword, status, projectId],
    queryFn: async () => {
      const response = await api
        .get<MilestoneList>(API_ROUTES.milestone, {
          searchParams: {
            page,
            limit,
            keyword,
            status,
            projectId: projectId ?? "",
          },
        })
        .json();

      return validatedPromise<MilestoneList>(
        response,
        MilestoneListSchema,
        "milestone"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
