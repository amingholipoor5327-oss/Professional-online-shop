 import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth";

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return Boolean(verifySessionToken(token));
}

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({});

    return Response.json(products, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json(
        { error: "دسترسی غیرمجاز است." },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      ...data,
      id: newId,
    });

    await newProduct.save();

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در ایجاد محصول" },
      { status: 500 }
    );
  }
}
 