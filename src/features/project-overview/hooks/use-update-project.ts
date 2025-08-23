import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { pathToUrl } from "@/lib/router";
import { API_ROUTES } from "@/routers/api";
import { Project } from "../schemas/Project.schema";

export const useUpdateProject = (id: string) => {
  return useMutation({
    mutationKey: ["update-project"],
    mutationFn: async (data: Project) => {
      return await api.put(pathToUrl(API_ROUTES.projectDetail, { id }), {
        json: data,
      });
    },
  });
};
