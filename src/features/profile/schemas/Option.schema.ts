import z from "zod";
import { WorkflowSchema } from "@/features/document-types/schemas/Workflow.schema";
import { CategorySchema } from "@/features/category/schemas/Category.schema";
import { DocumentTypeSchema } from "@/features/document-types/schemas/DocumentTypes.schema";
import { ProjectSchema } from "@/features/project-overview/schemas/Project.schema";

const baseOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const OptionsSchema = z.object({
  roles: z.array(baseOptionSchema),
  departments: z.array(baseOptionSchema),
  users: z.array(baseOptionSchema),
});

// Profile form validation schema
export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long"),
  nationality: z.string().min(1, "Nationality is required"),
  otherNationality: z.string().optional().nullable(),
  employeeInfo: z
    .object({
      id: z.string(),
      userId: z.string(),
      employeeId: z.string(),
      roleId: z.string().min(1, "Role is required"),
      departmentId: z.string().min(1, "Department is required"),
      managerName: z.string().optional(),
      workLocation: z.string().min(1, "Work location is required"),
    })
    .nullable(),
});

export const WorkflowOptionsSchema = z.array(WorkflowSchema).transform((data) =>
  data.map((item) => ({
    ...item,
    value: item.id,
    label: `${item.name} (${item.steps.length} steps)`,
  }))
);

export const CategoryOptionsSchema = z.array(CategorySchema).transform((data) =>
  data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }))
);

export const DocumentTypeOptionsSchema = z
  .array(DocumentTypeSchema)
  .transform((data) =>
    data.map((item) => ({
      ...item,
      value: item.id,
      label: `${item.name} (${item.documentId})`,
    }))
  );

export const ProjectOptionsSchema = z.array(ProjectSchema).transform((data) =>
  data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
    labelWithId: `${item.name} (${item.projectId})`,
  }))
);

export type Options = z.infer<typeof OptionsSchema>;
export type BaseOption = z.infer<typeof baseOptionSchema>;
export type ProfileFormData = z.infer<typeof ProfileFormSchema>;
export type WorkflowOptions = z.infer<typeof WorkflowOptionsSchema>;
export type CategoryOptions = z.infer<typeof CategoryOptionsSchema>;
export type DocumentTypeOptions = z.infer<typeof DocumentTypeOptionsSchema>;
export type ProjectOptions = z.infer<typeof ProjectOptionsSchema>;
