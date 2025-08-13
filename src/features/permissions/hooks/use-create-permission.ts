import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import {
  PermissionGroup,
  PermissionGroupSchema,
} from "@/features/permissions/schemas/Permission.schema";
import { validatedPromise } from "@/lib/promise";

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
