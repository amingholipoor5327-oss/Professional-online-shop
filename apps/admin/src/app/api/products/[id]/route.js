import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

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
    await connectDB();
    const { id } = await params;

    const deleted = await Product.findOneAndDelete({ id: Number(id) });

    if (!deleted) {
      return NextResponse.json(
        { error: "محصول پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "با موفقیت حذف شد  " });
  } catch (err) {
    console.error(" DELETE error:", err.message);
    return NextResponse.json(
      { error: "خطا در حذف محصول" },
      { status: 500 }
    );
  }
}