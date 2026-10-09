 import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

import { COOKIE_NAME, SESSION_DURATION, createSessionToken,} from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
     const session = await getServerSession(authOptions);

    const adminEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    const googleEmail = session?.user?.email
      ?.trim()
      .toLowerCase();

     if (
      !adminEmail ||
      !googleEmail ||
      googleEmail !== adminEmail
    ) {
      return NextResponse.redirect(
        new URL("/login?error=unauthorized", request.url)
      );
    }

     const token = createSessionToken(adminEmail);

    const response = NextResponse.redirect(
      new URL("/dashboard", request.url)
    );

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch (error) {
    console.error(
      "Google session synchronization failed:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/login?error=google-login-failed",
        request.url
      )
    );
  }
}
 