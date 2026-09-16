import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(request ) {
    try{
    await connectDB() ;

    const {user  , cart , totalprice , paymentMethod } = await request.json()
    const status = paymentMethod === "online" ? "success" : "pending"

    const newOreder = new Order({ 
        user  , 
        cart , 
        totalprice ,
        paymentMethod ,
        status  
    })

     await newOreder.save()
        return NextResponse.json(
            {message: "سفارش شما با موفقیت ثبت شد "} , {status : 201}
        )
    }catch(error){

        return NextResponse.json(
            {message : "خطا در ثبت سفارش"}  , {status : 500})
        }
}