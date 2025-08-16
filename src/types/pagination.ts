import { z } from "zod";

export const PaginationSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
