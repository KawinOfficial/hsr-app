import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";
import { Workflow } from "../schemas/Workflow.schema";
import { pathToUrl } from "@/lib/router";

export const useUpdateWorkflow = ({ id }: { id: string }) => {
  return useMutation({
    mutationKey: ["update-workflow"],
    mutationFn: async (workflow: Workflow) => {
      return await api
        .put(pathToUrl(API_ROUTES.workflowDetail, { id }), {
          json: workflow,
        })
        .json();
    },
  });
};
