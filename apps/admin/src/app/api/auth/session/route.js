import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

import {
  COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    // بررسی Session اختصاصی پنل
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const customSession = verifySessionToken(token);

    if (!customSession) {
      return NextResponse.json(
        {
          user: null,
        },
        {
          status: 401,
        }
      );
    }

    // بررسی ایمیل ادمین
    const adminEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (
      !adminEmail ||
      customSession.email.trim().toLowerCase() !== adminEmail
    ) {
      return NextResponse.json(
        {
          user: null,
        },
        {
          status: 401,
        }
      );
    }

    // دریافت اطلاعات پروفایل از NextAuth
    const nextAuthSession = await getServerSession(authOptions);

    const googleUser = nextAuthSession?.user;

    return NextResponse.json({
      user: {
        name: googleUser?.name || customSession.email.split("@")[0],
        email: googleUser?.email || customSession.email,
        image: googleUser?.image || null,
      },
    });
  } catch (error) {
    console.error("Session API error:", error);

    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 500,
      }
    );
  }
}