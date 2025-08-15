import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { PermissionGroup } from "@/features/permissions/schemas/Permission.schema";

export const useCreatePermission = () => {
  return useMutation({
    mutationKey: ["create-permission"],
    mutationFn: async (data: PermissionGroup) => {
      const response = await api.post(API_ROUTES.permissions, {
        body: JSON.stringify(data),
      });

      return response;
    },
  });
};
