import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { pathToUrl } from "@/lib/router";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import {
  UserDetail,
  UserDetailSchema,
} from "@/features/team-members/schemas/User.schema";

export const useMemberDetail = (id: string) => {
  return useQuery({
    queryKey: ["member-detail", id],
    queryFn: async () => {
      const response: { data: UserDetail } = await api
        .get(pathToUrl(API_ROUTES.teamMemberDetail, { id }))
        .json();
      return validatedPromise<UserDetail>(
        response.data,
        UserDetailSchema,
        "member detail"
      );
    },
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
