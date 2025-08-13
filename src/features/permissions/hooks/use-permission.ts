import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import {
  PermissionGroups,
  PermissionGroupsSchema,
} from "@/features/permissions/schemas/Permission.schema";
import { validatedPromise } from "@/lib/promise";

export const useGetPermission = () => {
  return useQuery({
    queryKey: ["permissions-list"],
    queryFn: async () => {
      const response: { data: PermissionGroups } = await api
        .get(API_ROUTES.permissions)
        .json();
      return validatedPromise<PermissionGroups>(
        response?.data,
        PermissionGroupsSchema,
        "permission"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
