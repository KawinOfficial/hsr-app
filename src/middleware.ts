import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${path}`, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - register (register page)
     * - reset-password (password reset page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|reset-password).*)",
  ],
};
