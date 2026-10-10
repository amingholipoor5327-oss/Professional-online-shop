 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import styles from "../../../component/css/deleteClient.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function formatPrice(price) {
  const value = Number(price);

  if (!Number.isFinite(value)) return "-";

  return Math.round(value * 85000).toLocaleString("en-US");
}

export default function DeleteClient({ product }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (!confirmed || deleting) return;

    const id = product.id ?? product._id;

    if (!id) {
      setError("شناسه محصول پیدا نشد.");
      return;
    }

    try {
      setDeleting(true);
      setError("");

      const res = await fetch(
        `${API_URL}/api/products/${encodeURIComponent(String(id))}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      router.push("/Products");
      router.refresh();
    } catch (err) {
      console.error("Delete product error:", err);
      setError("حذف محصول انجام نشد. اتصال API و مسیر درخواست را بررسی کن.");
      setDeleting(false);
    }
  }

  return (
    <main className={styles.page}>
      <Link href="/Products" className={styles.back}>
        <FaArrowLeft />
        Back to Products
      </Link>

      <header style={{ marginBottom: "28px" }}>
        <span
          style={{
            color: "#818cf8",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "2px",
          }}
        >
          STORE MANAGEMENT
        </span>

        <h1 style={{ color: "#f9fafb", margin: "10px 0" }}>
          Delete Product
        </h1>

        <p style={{ color: "#9ca3af", fontSize: "14px" }}>
          Review the product before deleting it.
        </p>
      </header>

      <section className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            {product.image ? (
              <img
                src={product.image}
                alt={product.title || "Product"}
                className={styles.image}
              />
            ) : (
              <FaBoxOpen size={60} color="#6b7280" />
            )}
          </div>

          <div className={styles.details}>
            <h2 className={styles.title}>
              {product.title || "Untitled Product"}
            </h2>

            <span className={styles.category}>
              {product.category || "Uncategorized"}
            </span>

            <p className={styles.price}>
            {formatPrice(product.price)}
            <span>Toman</span>
            </p>

            <p className={styles.description} dir="auto">
              {product.description || "No description available."}
            </p>

            <div className={styles.rating}>
              ⭐ {product.rating?.rate ?? 0}{" "}
              ({product.rating?.count ?? 0} reviews)
            </div>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            style={{
              color: "#fca5a5",
              background: "#351b25",
              border: "1px solid #7f1d1d",
              borderRadius: "8px",
              padding: "12px",
              marginTop: "18px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className={styles.deleteBtn}
        >
          <FaTrash />
          {deleting ? "Deleting..." : "Delete Product"}
        </button>
      </section>
    </main>
  );
}
 