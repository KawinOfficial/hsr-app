import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  name: z.string(),
  categoryId: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  budget: z.number(),
});

const CategoryListSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
export type CategoryList = z.infer<typeof CategoryListSchema>;
