 import Link from "next/link";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaStar,
  FaTag,
} from "react-icons/fa";

import styles from "../../component/css/ProductDetail.module.css";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function formatPrice(price) {
  const value = Number(price);

  if (!Number.isFinite(value)) return "-";

  return Math.round(value * 85000).toLocaleString("en-US");
}

export default async function Detail({ params }) {
  const { id } = await params;

  let product = null;
  let hasError = false;

  try {
    const res = await fetch(
      `${API_URL}/api/products/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    product = await res.json();

    if (!product || typeof product !== "object" || Array.isArray(product)) {
      throw new Error("Invalid product response");
    }
  } catch (error) {
    console.error("Product detail fetch error:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <main className={styles.Container}>
        <Link href="/Products" className={styles.BackButton}>
          <FaArrowLeft />
          Back to Products
        </Link>

        <section className={styles.Error}>
          <FaBoxOpen />
          <h2>Product Not Found</h2>
          <p>
            Unable to load this product. Check the API connection and product ID.
          </p>
        </section>
      </main>
    );
  }

  const rating = Number(product.rating?.rate);
  const reviewCount = Number(product.rating?.count);

  return (
    <main className={styles.Container}>
      <Link href="/Products" className={styles.BackButton}>
        <FaArrowLeft />
        Back to Products
      </Link>

      <header className={styles.PageHeader}>
        <div>
          <span className={styles.Eyebrow}>STORE MANAGEMENT</span>
          <h1 className={styles.PageTitle}>Product Details</h1>
          <p className={styles.Subtitle}>
            Review product information and pricing.
          </p>
        </div>

        <span className={styles.ProductBadge}>
          <FaBoxOpen />
          Product
        </span>
      </header>

      <section className={styles.Card}>
        <div className={styles.ImageWrapper}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || "Product"}
              className={styles.Image}
            />
          ) : (
            <FaBoxOpen className={styles.ImagePlaceholder} />
          )}
        </div>

        <div className={styles.Details}>
          <span className={styles.SectionLabel}>PRODUCT INFORMATION</span>

          <h2 className={styles.Title}>
            {product.title || "Untitled Product"}
          </h2>

          <div className={styles.Category}>
            <FaTag />
            {product.category || "Uncategorized"}
          </div>

          <div className={styles.PricePanel}>
            <span className={styles.PriceLabel}>Price</span>
            <p className={styles.Price}>
              {formatPrice(product.price)}
              <span> Toman</span>
            </p>
          </div>

          <div className={styles.DescriptionSection}>
            <h3>Description</h3>
            <p className={styles.Description} dir="auto">
              {product.description || "No description available."}
            </p>
          </div>

          <div className={styles.Rating}>
            <FaStar />
            <strong>
              {Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}
            </strong>
            <span>
              ({Number.isFinite(reviewCount) ? reviewCount : 0} reviews)
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
 