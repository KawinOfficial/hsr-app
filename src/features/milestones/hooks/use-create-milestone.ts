import { useMutation } from "@tanstack/react-query";
import { MilestoneForm } from "../schemas/Milestones.schema";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";

export const useCreateMilestone = () => {
  return useMutation({
    mutationKey: ["create-milestone"],
    mutationFn: async (milestone: MilestoneForm) => {
      return await api
        .post(API_ROUTES.milestone, {
          json: milestone,
        })
        .json();
    },
  });
};
