import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({});

    return Response.json(products , {status : 200 , headers : {"Content-Type" : "application/json"}});
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
    await connectDB();
    const data = await request.json();

    
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newproduct = new Product({
      ...data,
      id: newId,             
    });
    await newproduct.save()
    return Response.json(newproduct, { status: 201 })
  } catch(error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}