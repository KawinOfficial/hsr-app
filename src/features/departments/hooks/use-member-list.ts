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
  itemsPerPage,
  departmentId,
}: {
  page: string;
  itemsPerPage: string;
  departmentId?: string;
}) => {
  return useQuery({
    queryKey: ["team-member", page, itemsPerPage, departmentId],
    queryFn: async () => {
      const response = await api
        .get<{ data: ProfileList }>(API_ROUTES.departmentAddMember, {
          searchParams: {
            page,
            itemsPerPage,
            departmentId: departmentId || "",
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
