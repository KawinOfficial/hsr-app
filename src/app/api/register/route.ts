import { createUser } from "./createUser";

export async function POST(request: Request) {
  return createUser(request);
}
