import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(req, { params }) {
  try {
    await connectDB()
    const { id } = await params

    const order = await Order.findById(id)

    if (!order) {
      return Response.json({ error: "Not found" }, { status: 404 })
    }

    return Response.json(order)
  } catch (err) {
    console.error("GET order error:", err.message)
    return Response.json({ error: err.message }, { status: 500 })
  }
}


export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const { id } = await params
    const deleted = await Order.findByIdAndDelete(id)

    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 })

    return Response.json({ message: "Deleted " })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}