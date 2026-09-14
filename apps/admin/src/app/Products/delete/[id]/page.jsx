 import DeleteClient from "./deleteClient"
 
export default async function DeleteItem({ params }) {
  const { id } = await params

  let product = null

  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`)

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    product = await res.json()

  } catch (error) {
    console.error(error)
    return <p>محصول پیدا نشد ❌</p>
  }

   return <DeleteClient product={product} />
}