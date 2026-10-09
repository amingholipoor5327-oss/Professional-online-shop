 import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME,verifySessionToken,} from "@/lib/auth";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return Boolean(verifySessionToken(token));
}

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await Product.findOne({ id: Number(id) });

    if (!product) {
      return NextResponse.json(
        { error: "محصول پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("GET error:", err.message);

    return NextResponse.json(
      { error: "خطا در دریافت محصول" },
      { status: 500 }
    );
  }
}

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
    const deleted = await Product.findOneAndDelete({
      id: Number(id),
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "محصول پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "محصول با موفقیت حذف شد.",
    });
  } catch (err) {
    console.error("DELETE error:", err.message);

    return NextResponse.json(
      { error: "خطا در حذف محصول" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const data = await req.json();

    const product = await Product.findOne({
      id: Number(id),
    });

    if (!product) {
      return NextResponse.json(
        { error: "محصول پیدا نشد" },
        { status: 404 }
      );
    }

    delete data.id;
    delete data._id;

    Object.assign(product, data);
    await product.save();

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT error:", error.message);

    return NextResponse.json(
      { error: "خطا در ویرایش محصول" },
      { status: 500 }
    );
  }
}
 