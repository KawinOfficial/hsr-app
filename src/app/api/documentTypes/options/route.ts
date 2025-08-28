import { getDocumentTypeOptions } from "./getOptions";

export async function GET() {
  return await getDocumentTypeOptions();
}
