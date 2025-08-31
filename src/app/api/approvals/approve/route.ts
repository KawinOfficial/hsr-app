import { updateApprove } from "./updateApprove";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return updateApprove(req);
}
