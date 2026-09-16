 import Order from "@/models/Order";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const products = await Order.find({})

    return Response.json(products , {status : 200 , headers : {"Content-Type" : "application/json"}});
  } catch (error) {
    console.error(error);
  
    return Response.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}
