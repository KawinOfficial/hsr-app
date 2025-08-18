import {
  ProfileList,
  ProfileListSchema,
} from "@/features/auths/schemas/Profile.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";

export const useTeamMember = (page: string, itemsPerPage: string) => {
  return useQuery({
    queryKey: ["team-member"],
    queryFn: async () => {
      const response = await api
        .get(API_ROUTES.teamMember, {
          searchParams: {
            page,
            itemsPerPage,
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
