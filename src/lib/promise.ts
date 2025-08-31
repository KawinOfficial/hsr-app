import { z } from "zod";
import { auth } from "./auth";

export const validatedPromise = <T>(
  response: unknown,
  schema: z.ZodTypeAny,
  serviceName: string
): T => {
  const validate = schema.safeParse(response);
  if (!validate.success) {
    console.error("Error::Validate::", serviceName, validate.error.message);
    throw new Error(validate.error.message);
  }

  return validate.data as T;
};

export async function checkUserAuth() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized - No valid session");
  }
  return userId;
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export function getStatus(status: string) {
  switch (status) {
    case "approval":
      return "approval_request";
    case "review":
      return "review_request";
    default:
      return "completed";
  }
}
