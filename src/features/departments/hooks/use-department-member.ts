import {
  ProfileList,
  ProfileListSchema,
} from "@/features/auths/schemas/Profile.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { pathToUrl } from "@/lib/router";
import { API_ROUTES } from "@/routers/api";
import { Pagination } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export const useDepartmentMember = ({
  id,
  page,
  limit,
  keyword,
  roleId,
}: {
  id: string;
  page: number;
  limit: number;
  keyword: string;
  roleId: string;
}) => {
  const path = pathToUrl(API_ROUTES.departmentMember, { id });

  return useQuery({
    queryKey: ["department-member", id, page, limit, keyword, roleId],
    queryFn: async () => {
      const response = await api
        .get<{ data: ProfileList; pagination: Pagination }>(path, {
          searchParams: {
            page,
            limit,
            keyword,
            roleId,
          },
        })
        .json();

      return validatedPromise<ProfileList>(
        response,
        ProfileListSchema,
        "profile"
      );
    },
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
