import { api } from "@/lib/api";
import { pathToUrl } from "@/lib/router";
import { API_ROUTES } from "@/routers/api";
import { useQuery } from "@tanstack/react-query";
import { validatedPromise } from "@/lib/promise";
import { Project, ProjectSchema } from "../schemas/Project.schema";

export const useProjectDetail = (id: string) => {
  return useQuery({
    queryKey: ["project-detail", id],
    queryFn: async () => {
      const response = await api
        .get<{ data: Project }>(pathToUrl(API_ROUTES.projectDetail, { id }))
        .json();
      return validatedPromise<Project>(
        response.data,
        ProjectSchema,
        "project detail"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
