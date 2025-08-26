import z from "zod";
import { WorkflowSchema } from "@/features/document-types/schemas/Workflow.schema";
import { CategorySchema } from "@/features/category/schemas/Category.schema";
import { DocumentTypeSchema } from "@/features/document-types/schemas/DocumentTypes.schema";

const baseOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const OptionsSchema = z.object({
  roles: z.array(baseOptionSchema),
  departments: z.array(baseOptionSchema),
  users: z.array(baseOptionSchema),
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

export type Options = z.infer<typeof OptionsSchema>;
export type BaseOption = z.infer<typeof baseOptionSchema>;
export type WorkflowOptions = z.infer<typeof WorkflowOptionsSchema>;
export type CategoryOptions = z.infer<typeof CategoryOptionsSchema>;
export type DocumentTypeOptions = z.infer<typeof DocumentTypeOptionsSchema>;
