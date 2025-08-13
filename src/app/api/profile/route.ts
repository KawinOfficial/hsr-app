import { getProfile } from "./get";
import { updateProfile } from "./post";

export async function GET() {
  return getProfile();
}

export async function POST(req: Request) {
  return updateProfile(req);
}
