import {
  CategoryOptions,
  Options,
  OptionsSchema,
  WorkflowOptions,
  WorkflowOptionsSchema,
  CategoryOptionsSchema,
  DocumentTypeOptions,
  DocumentTypeOptionsSchema,
  ProjectOptions,
  ProjectOptionsSchema,
} from "@/features/profile/schemas/Option.schema";
import { api } from "@/lib/api";
import { validatedPromise } from "@/lib/promise";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/routers/api";

export const useOptions = () => {
  return useQuery({
    queryKey: ["options"],
    queryFn: async () => {
      const data = await api.get(API_ROUTES.options).json();
      return validatedPromise<Options>(data, OptionsSchema, "options");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useWorkflowOptions = () => {
  return useQuery({
    queryKey: ["workflow-options"],
    queryFn: async () => {
      const { data } = await api
        .get<{ data: WorkflowOptions }>(API_ROUTES.workflowOptions)
        .json();
      return validatedPromise<WorkflowOptions>(
        data,
        WorkflowOptionsSchema,
        "workflow-options"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCategoryOptions = () => {
  return useQuery({
    queryKey: ["category-options"],
    queryFn: async () => {
      const { data } = await api
        .get<{ data: CategoryOptions }>(API_ROUTES.categoryOptions)
        .json();
      return validatedPromise<CategoryOptions>(
        data,
        CategoryOptionsSchema,
        "category-options"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useDocumentTypeOptions = () => {
  return useQuery({
    queryKey: ["document-type-options"],
    queryFn: async () => {
      const { data } = await api
        .get<{ data: DocumentTypeOptions }>(API_ROUTES.documentTypeOptions)
        .json();
      return validatedPromise<DocumentTypeOptions>(
        data,
        DocumentTypeOptionsSchema,
        "document-type-options"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useProjectOptions = () => {
  return useQuery({
    queryKey: ["project-options"],
    queryFn: async () => {
      const { data } = await api
        .get<{ data: ProjectOptions }>(API_ROUTES.projectOptions)
        .json();
      return validatedPromise<ProjectOptions>(
        data,
        ProjectOptionsSchema,
        "project-options"
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
