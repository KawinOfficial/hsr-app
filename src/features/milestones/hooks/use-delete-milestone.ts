import { api } from "@/lib/api";
import { pathToUrl } from "@/lib/router";
import { API_ROUTES } from "@/routers/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMilestone = () => {
  return useMutation({
    mutationKey: ["delete-milestone"],
    mutationFn: async (id: string) => {
      return await api.delete(pathToUrl(API_ROUTES.milestoneDetail, { id }));
    },
  });
};
