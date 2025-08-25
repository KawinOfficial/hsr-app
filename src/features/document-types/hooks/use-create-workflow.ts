import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { Workflow } from "../schemas/Workflow.schema";

export const useCreateWorkflow = () => {
  return useMutation({
    mutationKey: ["create-workflow"],
    mutationFn: async (workflow: Workflow) => {
      return await api
        .post(API_ROUTES.workflows, {
          json: workflow,
        })
        .json();
    },
  });
};
