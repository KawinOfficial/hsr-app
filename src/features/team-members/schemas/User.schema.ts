import { z } from "zod";
import { ProfileSchema } from "@/features/auths/schemas/Profile.schema";
import { PermissionsMatrixSchema } from "@/features/permissions/schemas/Permission.schema";

export const UserDetailSchema = ProfileSchema.extend({
  permissions: PermissionsMatrixSchema,
});

export type UserDetail = z.infer<typeof UserDetailSchema>;
