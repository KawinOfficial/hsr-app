import {
  ProfileList,
  ProfileListSchema,
} from "@/features/auths/schemas/Profile.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";

export const useTeamMember = ({
  page,
  limit,
  keyword,
}: {
  page: number;
  limit: number;
  keyword: string;
}) => {
  return useQuery({
    queryKey: ["team-member", page, limit, keyword],
    queryFn: async () => {
      const response = await api
        .get(API_ROUTES.teamMember, {
          searchParams: {
            page,
            limit,
            keyword,
          },
        })
        .json();
      return validatedPromise<ProfileList>(
        response,
        ProfileListSchema,
        "team member"
      );
    },
  });
};
