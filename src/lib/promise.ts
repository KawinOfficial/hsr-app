import { z } from "zod";

export const validatedPromise = <T>(
  response: unknown,
  schema: z.ZodTypeAny,
  serviceName: string
): T => {
  const validate = schema.safeParse(response);
  if (!validate.success) {
    console.error("Error::Validate::", serviceName, validate.error);
    throw new Error(validate.error.message);
  }

  return validate.data as T;
};
