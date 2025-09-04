import { z } from "zod";

export const PermissionSchema = z.object({
  read: z.boolean(),
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const PermissionsMatrixSchema = z.object({
  projects: PermissionSchema,
  financial: PermissionSchema,
  users: PermissionSchema,
});

export const PermissionGroupSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    permissions: PermissionsMatrixSchema,
    isActive: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    status: data.isActive ? "active" : "inactive",
  }));

export const PermissionGroupsSchema = z.array(PermissionGroupSchema);

export type PermissionGroup = z.infer<typeof PermissionGroupSchema>;
export type PermissionGroups = z.infer<typeof PermissionGroupsSchema>;
export type PermissionsMatrix = z.infer<typeof PermissionsMatrixSchema>;
