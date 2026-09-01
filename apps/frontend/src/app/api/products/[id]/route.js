import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findOne({
      id: Number(id),
    });

    if (!product) {
      return Response.json(
        { error: "محصول پیدا نشد" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Product API Error:", error);

    return Response.json(
      { error: "خطا در دریافت محصول" },
      { status: 500 }
    );
  }
}