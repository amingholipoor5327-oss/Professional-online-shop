 import { NextResponse } from "next/server";
import {
  verifySessionToken,
  COOKIE_NAME,
} from "@/lib/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // دریافت توکن نشست از Cookie
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // بررسی اعتبار نشست
  const session = verifySessionToken(token);

  // ایمیل ادمین مجاز
  const adminEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  // =========================
  // کاربر مجاز
  // =========================

  if (
    session?.email &&
    adminEmail &&
    session.email.trim().toLowerCase() === adminEmail
  ) {
    return NextResponse.next();
  }

  // =========================
  // کاربر لاگ‌اوت / غیرمجاز
  // =========================

  const loginUrl = new URL("/login", request.url);

  // ذخیره صفحه‌ای که کاربر قصد ورود به آن را داشت
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
 
 