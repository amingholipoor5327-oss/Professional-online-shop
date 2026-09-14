"use client"

import { useParams, useRouter } from "next/navigation"
import { FaTrash, FaArrowLeft } from "react-icons/fa"
import Link from "next/link"
import styles from "../../../component/css/deleteClient.module.css"

export default function DeleteClient({ product }) {
  const { id } = useParams()
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      router.push("/Products")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Delete failed ❌")
    }
  }

  return (
    <div className={styles.page}>
       <Link href="/Products" className={styles.back}>
        <FaArrowLeft /> Back
      </Link>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{product.title}</h1>

            <span className={styles.category}>
              {product.category}
            </span>

            <p className={styles.price}>${product.price}</p>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.rating}>
              ⭐ {product.rating?.rate}{" "}
              ({product.rating?.count} reviews)
            </div>
          </div>
        </div>

        {/* دکمه حذف — داخل container */}
        <button onClick={handleDelete} className={styles.deleteBtn}>
          <FaTrash /> Delete Product
        </button>
      </div>
    </div>
  )
}