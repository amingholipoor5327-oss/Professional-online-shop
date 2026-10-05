 import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  SESSION_DURATION,
  createSessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authSecret = process.env.AUTH_SECRET;

    if (!adminEmail || !adminPassword || !authSecret) {
      return NextResponse.json(
        { message: "تنظیمات ورود ادمین کامل نیست." },
        { status: 500 }
      );
    }

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        { message: "ایمیل یا رمز عبور اشتباه است." },
        { status: 401 }
      );
    }

    const token = createSessionToken(adminEmail);

    const response = NextResponse.json({
      message: "ورود موفقیت‌آمیز بود.",
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "درخواست ورود نامعتبر است." },
      { status: 400 }
    );
  }
}
 