 import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, verifySessionToken,} from "@/lib/auth";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  const session = verifySessionToken(token);
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  return Boolean(
    session &&
    adminEmail &&
    session.email.trim().toLowerCase() === adminEmail
  );
}

 export async function GET(req, { params }) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (err) {
    console.error("GET order error:", err.message);

    return NextResponse.json(
      { error: "خطا در دریافت سفارش." },
      { status: 500 }
    );
  }
}


 export async function PATCH(req, { params }) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    order.status = "cancelled";
    await order.save();

    return NextResponse.json({
      message: "سفارش با موفقیت لغو شد.",
      order,
    });
  } catch (err) {
    console.error("PATCH order error:", err.message);

    return NextResponse.json(
      { error: "خطا در لغو سفارش." },
      { status: 500 }
    );
  }
}

// حذف سفارش
export async function DELETE(req, { params }) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "سفارش با موفقیت حذف شد.",
    });
  } catch (err) {
    console.error("DELETE order error:", err.message);

    return NextResponse.json(
      { error: "خطا در حذف سفارش." },
      { status: 500 }
    );
  }
}
 