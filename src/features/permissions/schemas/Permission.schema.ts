import { z } from "zod";

export const PermissionSchema = z.object({
  read: z.boolean(),
  write: z.boolean(),
  admin: z.boolean(),
});

export const PermissionsMatrixSchema = z.object({
  dashboard: PermissionSchema,
  projects: PermissionSchema,
  financial: PermissionSchema,
  reports: PermissionSchema,
  users: PermissionSchema,
  settings: PermissionSchema,
});

export const PermissionGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  userCount: z.number().optional(),
  permissions: PermissionsMatrixSchema,
  isActive: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const PermissionGroupsSchema = z.array(PermissionGroupSchema);

export type PermissionGroup = z.infer<typeof PermissionGroupSchema>;
export type PermissionGroups = z.infer<typeof PermissionGroupsSchema>;
