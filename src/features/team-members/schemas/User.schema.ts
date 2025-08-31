import { z } from "zod";
import { ProfileSchema } from "@/features/auths/schemas/Profile.schema";

export const UserDetailSchema = ProfileSchema;

export type UserDetail = z.infer<typeof UserDetailSchema>;
