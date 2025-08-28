import { getCategoriesOptions } from "./getOptions";

export async function GET() {
  return getCategoriesOptions();
}
