import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"
import styles from "../../component/css/Detail.module.css"

export default async function Detail({ params }) {
  const { id } = await params

  let product = null

  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    product = await res.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return (
      <div className={styles.Container}>
        <p className={styles.Error}>Product not found ❌</p>
        <Link href="/store" className={styles.backBtn}>
          <FaArrowLeft /> Back to Store
        </Link>
      </div>
    )
  }

  const priceInToman = Math.round(product.price * 85000).toLocaleString("en-US")

  return (
    <div className={styles.Container}>
      <Link href={"/Order"} className={styles.backBtn}>
        <FaArrowLeft /> Back to Store
      </Link>

      <div className={styles.Card}>
        <div className={styles.ImageWrapper}>
          <img src={product.image} alt={product.title} className={styles.Image} />
        </div>

        <div className={styles.Details}>
          <h1 className={styles.Title}>{product.title}</h1>

          <div className={styles.Category}> {product.category}</div>

          <p className={styles.Price}>{priceInToman} Toman</p>

          <p className={styles.Description}>{product.description}</p>

          <div className={styles.Rating}>
            ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
          </div>

         </div>
      </div>
    </div>
  )
}