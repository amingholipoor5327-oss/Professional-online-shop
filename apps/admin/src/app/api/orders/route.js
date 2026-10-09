 import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken,} from "@/lib/auth";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return Boolean(verifySessionToken(token));
}

export async function GET() {
  try {
     if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const orders = await Order.find({});

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET orders error:", error);

    return NextResponse.json(
      { error: "خطا در دریافت سفارش‌ها" },
      { status: 500 }
    );
  }
}
 