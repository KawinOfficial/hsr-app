import { NextResponse } from "next/server";
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
