import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import styles from "../../component/css/ProductDetail.module.css"

export default async function OrderDetail({ params }) {
  const { id } = await params

  let order = null

  try {
    const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    order = await res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return (
      <div className={styles.Container}>
        <p className={styles.Error}>your orders not found!</p>
        <Link href="/Orders" className={styles.backBtn}>
          <FaArrowLeft /> back
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.Container}>
      <Link href="/Orders" className={styles.backBtn}>
        <FaArrowLeft /> Back to Orders List
      </Link>

      <div className={styles.Card}>
        <h1 className={styles.Title}>Order Details</h1>

         <section className={styles.Section}>
          <h2> Customer Information</h2>
          <p><strong>Name:</strong> {order.user?.name || "-"}</p>
          <p><strong>Phone:</strong> {order.user?.phone || "-"}</p>
          <p><strong>Address:</strong> {order.user?.address || "-"}</p>
          <p><strong>Postal Code:</strong> {order.user?.postalCode || "-"}</p>
        </section>

         <section className={styles.Section}>
          <h2>Products</h2>
          {order.cart?.map((product, idx) => (
            <Link
              key={idx}
              href={`/Products/${product.id}`}
              className={styles.productItem}
            >
              <img src={product.image} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>Count: {product.count}</p>
                <p>Price: {Number(product.price).toLocaleString("en-US")}$ </p>
              </div>
            </Link>
          ))}
        </section>

         <section className={styles.Section}>
          <h2> Payment Information</h2>
          <p><strong>Total Price:</strong> {order.totalprice?.toLocaleString("en-US")}$</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </section>
      </div>
    </div>
  )
}