import z from "zod";

const baseOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const OptionsSchema = z.object({
  roles: z.array(baseOptionSchema),
  departments: z.array(baseOptionSchema),
  users: z.array(baseOptionSchema),
});

export type Options = z.infer<typeof OptionsSchema>;
export type BaseOption = z.infer<typeof baseOptionSchema>;
