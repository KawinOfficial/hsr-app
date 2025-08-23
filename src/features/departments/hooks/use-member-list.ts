import {
  ProfileList,
  ProfileListSchema,
} from "@/features/auths/schemas/Profile.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";

export const useMemberList = ({
  page,
  limit,
  departmentId,
  roleId,
  keyword,
}: {
  page: number;
  limit: number;
  departmentId: string;
  roleId: string;
  keyword: string;
}) => {
  return useQuery({
    queryKey: ["team-member", page, limit, departmentId, roleId, keyword],
    queryFn: async () => {
      const response = await api
        .get<{ data: ProfileList }>(API_ROUTES.departmentAddMember, {
          searchParams: {
            page,
            limit,
            departmentId,
            roleId,
            keyword,
          },
        })
        .json();

      return validatedPromise<ProfileList>(
        response,
        ProfileListSchema,
        "team-member"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
