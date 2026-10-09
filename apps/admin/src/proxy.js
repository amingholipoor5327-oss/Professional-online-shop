 import { NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME,} from "@/lib/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(COOKIE_NAME)?.value;

  const session = verifySessionToken(token);

  const adminEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  if (
    session?.email &&
    adminEmail &&
    session.email.trim().toLowerCase() === adminEmail
  ) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);

   loginUrl.searchParams.set("from", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/Products/:path*",
    "/Orders/:path*",
    "/Settings/:path*"
  ],
};
 
 