import { createDepartment } from "./createDepartment";
import { getDepartmentList } from "./getDepartmentList";
import { updateDepartment } from "./updateDepartment";

export async function GET() {
  return getDepartmentList();
}

export async function POST(request: Request) {
  return createDepartment(request);
}

export async function PUT(request: Request) {
  return updateDepartment(request);
}
