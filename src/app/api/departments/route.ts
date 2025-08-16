import { getDepartmentList } from "./getDepartmentList";

export async function GET() {
  return getDepartmentList();
}
