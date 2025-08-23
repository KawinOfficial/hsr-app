import { useMutation } from "@tanstack/react-query";
import { CreateProject } from "../schemas/CreateProject.schema";
import { api } from "@/lib/api";
import { API_ROUTES } from "@/routers/api";

export function useCreateProject() {
  return useMutation({
    mutationKey: ["create-project"],
    mutationFn: async (project: CreateProject) => {
      return await api
        .post(API_ROUTES.project, {
          json: project,
        })
        .json();
    },
  });
}
