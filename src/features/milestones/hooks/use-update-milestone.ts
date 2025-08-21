import { useMutation } from "@tanstack/react-query";
import { MilestoneForm } from "../schemas/Milestones.schema";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { pathToUrl } from "@/lib/router";

export const useUpdateMilestone = (id: string) => {
  return useMutation({
    mutationKey: ["update-milestone"],
    mutationFn: async (milestone: MilestoneForm) => {
      return await api
        .put(pathToUrl(API_ROUTES.milestoneDetail, { id }), {
          json: milestone,
        })
        .json();
    },
  });
};
