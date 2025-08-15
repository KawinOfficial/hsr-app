import { getProfile } from "./getProfile";
import { updateProfile } from "./updateProfile";

export async function GET() {
  return getProfile();
}

export async function PUT(req: Request) {
  return updateProfile(req);
}
