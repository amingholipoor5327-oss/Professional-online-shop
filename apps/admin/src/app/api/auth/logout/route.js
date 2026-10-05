
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    message: "با موفقیت خارج شدید.",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}