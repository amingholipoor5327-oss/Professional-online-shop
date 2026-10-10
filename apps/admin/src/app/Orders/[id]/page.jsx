 import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

import styles from "../../component/css/Detail.module.css";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function formatPrice(price) {
  const value = Number(price);

  if (!Number.isFinite(value)) return "-";

  return `$${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatusClass(status) {
  const normalized = String(status || "").toLowerCase();

  const allowed = [
    "pending",
    "success",
    "delivered",
    "processing",
    "shipped",
    "cancelled",
    "refunded",
  ];

  return allowed.includes(normalized)
    ? styles[normalized]
    : styles.unknown;
}

function getStatusLabel(status) {
  const normalized = String(status || "unknown").toLowerCase();

  const labels = {
    pending: "Pending",
    success: "Successful",
    delivered: "Delivered",
    processing: "Processing",
    shipped: "Shipped",
    cancelled: "Cancelled",
    refunded: "Refunded",
    unknown: "Unknown",
  };

  return labels[normalized] || normalized;
}

export default async function OrderDetail({ params }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  let order = null;
  let errorMessage = "";

  try {
    const response = await fetch(
      `${API_URL}/api/orders/${encodeURIComponent(id)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Cookie: `admin_session=${sessionToken}`,
        },
      }
    );

    if (response.status === 401) {
      redirect("/login");
    }

    if (response.status === 404) {
      errorMessage = "The requested order was not found.";
    } else if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    } else {
      const result = await response.json();

      if (
        !result ||
        typeof result !== "object" ||
        Array.isArray(result)
      ) {
        throw new Error("Invalid order response");
      }

      order = result;
    }
  } catch (error) {
     if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String(error.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Order detail fetch error:", error);

    errorMessage =
      "Unable to load this order. Please check the API connection and order ID.";
  }

  if (errorMessage || !order) {
    return (
      <main className={styles.Container}>
        <Link href="/Orders" className={styles.BackButton}>
          <FaArrowLeft />
          Back to Orders
        </Link>

        <section className={styles.ErrorPanel}>
          <FaBoxOpen className={styles.ErrorIcon} />
          <h1>Order Not Found</h1>
          <p>
            {errorMessage || "The requested order was not found."}
          </p>
        </section>
      </main>
    );
  }

  const customer = order.user || {};
  const products = Array.isArray(order.cart) ? order.cart : [];
  const status = String(order.status || "unknown").toLowerCase();

  return (
    <main className={styles.Container}>
      <Link href="/Orders" className={styles.BackButton}>
        <FaArrowLeft />
        Back to Orders
      </Link>

      <header className={styles.PageHeader}>
        <div>
          <span className={styles.Eyebrow}>
            STORE MANAGEMENT
          </span>

          <h1 className={styles.Title}>Order Details</h1>

          <p className={styles.Subtitle}>
            Review customer information, products and payment details.
          </p>
        </div>

        <div className={styles.OrderReference}>
          <span>ORDER ID</span>
          <strong>#{String(order._id || id).slice(-8)}</strong>
        </div>
      </header>

       <section className={styles.OverviewGrid}>
        <article className={styles.OverviewCard}>
          <div className={styles.CardIcon}>
            <FaCreditCard />
          </div>

          <div>
            <span>Total Amount</span>
            <strong>{formatPrice(order.totalprice)}</strong>
          </div>
        </article>

        <article className={styles.OverviewCard}>
          <div className={styles.CardIcon}>
            <FaBoxOpen />
          </div>

          <div>
            <span>Total Products</span>

            <strong>
              {products.reduce((total, product) => {
                const count = Number(product.count ?? 1);

                return total + (
                  Number.isFinite(count) && count > 0 ? count : 0
                );
              }, 0)}
            </strong>
          </div>
        </article>

        <article className={styles.OverviewCard}>
          <div className={styles.CardIcon}>
            <FaCalendarAlt />
          </div>

          <div>
            <span>Order Date</span>

            <strong className={styles.DateValue}>
              {formatDate(order.createdAt)}
            </strong>
          </div>
        </article>
      </section>

       <div className={styles.ContentGrid}>
        <section className={styles.Panel}>
          <div className={styles.PanelHeader}>
            <div className={styles.PanelIcon}>
              <FaUser />
            </div>

            <div>
              <h2>Customer Information</h2>
              <p>Contact and delivery details</p>
            </div>
          </div>

          <div className={styles.InfoList}>
            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                Full Name
              </span>

              <strong dir="auto">
                {customer.name || "Guest Customer"}
              </strong>
            </div>

            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                <FaPhone /> Phone
              </span>

              <strong dir="auto">
                {customer.phone || "-"}
              </strong>
            </div>

            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                <FaMapMarkerAlt /> Address
              </span>

              <strong dir="auto">
                {customer.address || "-"}
              </strong>
            </div>

            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                Postal Code
              </span>

              <strong>
                {customer.postalCode || "-"}
              </strong>
            </div>
          </div>
        </section>

        <section className={styles.Panel}>
          <div className={styles.PanelHeader}>
            <div className={styles.PanelIcon}>
              <FaCreditCard />
            </div>

            <div>
              <h2>Payment Information</h2>
              <p>Payment method and order status</p>
            </div>
          </div>

          <div className={styles.InfoList}>
            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                Payment Method
              </span>

              <strong>
                {order.paymentMethod || "-"}
              </strong>
            </div>

            <div className={styles.InfoItem}>
              <span className={styles.InfoLabel}>
                Order Status
              </span>

              <span
                className={`${styles.StatusBadge} ${getStatusClass(status)}`}
              >
                <span className={styles.StatusDot} />
                {getStatusLabel(status)}
              </span>
            </div>

            <div className={styles.TotalRow}>
              <span>Total</span>
              <strong>
                {formatPrice(order.totalprice)}
              </strong>
            </div>
          </div>
        </section>
      </div>

       <section className={styles.Panel}>
        <div className={styles.PanelHeader}>
          <div className={styles.PanelIcon}>
            <FaBoxOpen />
          </div>

          <div>
            <h2>Ordered Products</h2>
            <p>
              {products.length} product line(s) in this order
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className={styles.Empty}>
            <FaBoxOpen />
            <p>No products found in this order.</p>
          </div>
        ) : (
          <div className={styles.ProductList}>
            {products.map((product, index) => {
              const price = Number(product.price);
              const count = Number(product.count ?? 1);

              const subtotal =
                Number.isFinite(price) &&
                Number.isFinite(count)
                  ? price * count
                  : NaN;

              return (
                <article
                  className={styles.ProductItem}
                  key={product._id || product.id || index}
                >
                  <div className={styles.ProductImage}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title || "Product"}
                      />
                    ) : (
                      <FaBoxOpen />
                    )}
                  </div>

                  <div className={styles.ProductInfo}>
                    <h3 dir="auto">
                      {product.title || "Unnamed Product"}
                    </h3>

                    <span>
                      Quantity: {product.count ?? 1}
                    </span>
                  </div>

                  <div className={styles.ProductPrice}>
                    <span>Unit price</span>
                    <strong>
                      {formatPrice(product.price)}
                    </strong>
                  </div>

                  <div className={styles.ProductSubtotal}>
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(subtotal)}
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
 