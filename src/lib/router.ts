import { compile } from "path-to-regexp";

export const pathToUrl = (
  path: string,
  params: Record<string, string | undefined> = {}
) => {
  if (Object.keys(params).some((key) => !(params[key] || "").length)) {
    return path;
  }
  return compile(path)(params);
};
