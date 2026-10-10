 import Link from "next/link";
import styles from "../component/css/Orders.module.css";
import OrderActions from "./OrderActions";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  FaArrowRight,
  FaBoxOpen,
  FaCalendarAlt,
  FaShoppingCart,
} from "react-icons/fa";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function isNew(createdAt) {
  if (!createdAt) return false;

  const timestamp = new Date(createdAt).getTime();
  const now = Date.now();

  return (
    !Number.isNaN(timestamp) &&
    now - timestamp >= 0 &&
    now - timestamp < 24 * 60 * 60 * 1000
  );
}

function formatDate(date) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatPrice(price) {
  if (price == null || !Number.isFinite(Number(price))) {
    return "-";
  }

  return `$${Number(price).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

function getStatusClass(status) {
  const normalized = String(status || "").toLowerCase();

  const allowed = [
    "pending",
    "success",
    "delivered",
    "processing",
    "cancelled",
    "refunded",
    "shipped",
  ];

  return allowed.includes(normalized)
    ? styles[normalized]
    : styles.unknown;
}

export default async function Orders() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

   if (!sessionToken) {
    redirect("/login");
  }

  let data = [];

  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: `admin_session=${sessionToken}`,
      },
    });

    if (response.status === 401) {
      redirect("/login");
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    data = Array.isArray(result) ? result : [];
  } catch (error) {
     if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      String(error.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Orders fetch error:", error);

    return (
      <main className={styles.Container}>
        <div className={styles.ErrorPanel}>
          <span className={styles.ErrorIcon}>!</span>
          <h2>Unable to load orders</h2>
          <p>
            Could not retrieve orders. Check your API connection.
          </p>
        </div>
      </main>
    );
  }

  const sortedOrders = [...data].sort(
    (a, b) =>
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
  );

  const pendingCount = data.filter(
    (order) =>
      String(order.status || "").toLowerCase() === "pending"
  ).length;

  const successfulCount = data.filter((order) =>
    ["success", "delivered"].includes(
      String(order.status || "").toLowerCase()
    )
  ).length;

  const newCount = data.filter((order) =>
    isNew(order.createdAt)
  ).length;

  return (
    <main className={styles.Container}>
       <header className={styles.PageHeader}>
        <div>
          <span className={styles.Eyebrow}>
            STORE MANAGEMENT
          </span>

          <h1 className={styles.Title}>Orders</h1>

          <p className={styles.Subtitle}>
            Track, manage, and review customer orders.
          </p>
        </div>

        <div className={styles.HeaderIcon}>
          <FaShoppingCart />
        </div>
      </header>

       <section className={styles.StatsGrid}>
        <article
          className={`${styles.StatCard} ${styles.statBlue}`}
        >
          <div className={styles.StatTop}>
            <span>Total Orders</span>
            <FaShoppingCart />
          </div>

          <strong>
            {data.length.toLocaleString("en-US")}
          </strong>

          <small>All recorded orders</small>
        </article>

        <article
          className={`${styles.StatCard} ${styles.statOrange}`}
        >
          <div className={styles.StatTop}>
            <span>Pending Orders</span>
            <span className={styles.StatusDot} />
          </div>

          <strong>
            {pendingCount.toLocaleString("en-US")}
          </strong>

          <small>Awaiting processing</small>
        </article>

        <article
          className={`${styles.StatCard} ${styles.statGreen}`}
        >
          <div className={styles.StatTop}>
            <span>Successful Orders</span>
            <span className={styles.StatusDot} />
          </div>

          <strong>
            {successfulCount.toLocaleString("en-US")}
          </strong>

          <small>Success or delivered</small>
        </article>

        <article
          className={`${styles.StatCard} ${styles.statPurple}`}
        >
          <div className={styles.StatTop}>
            <span>New Orders</span>
            <FaCalendarAlt />
          </div>

          <strong>
            {newCount.toLocaleString("en-US")}
          </strong>

          <small>Received in the last 24 hours</small>
        </article>
      </section>

       <section className={styles.OrdersPanel}>
        <div className={styles.PanelHeader}>
          <div>
            <h2>All Orders</h2>

            <p>
              Showing{" "}
              {sortedOrders.length.toLocaleString("en-US")}{" "}
              orders, newest first
            </p>
          </div>

          <div className={styles.TotalBadge}>
            <FaBoxOpen />
            <span>{data.length} Orders</span>
          </div>
        </div>

        {sortedOrders.length === 0 ? (
          <div className={styles.Empty}>
            <div className={styles.EmptyIcon}>
              <FaShoppingCart />
            </div>

            <h3>No orders yet</h3>

            <p>
              Customer orders will appear here when they are
              placed.
            </p>
          </div>
        ) : (
          <div className={styles.TableWrapper}>
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Products</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedOrders.map((item, index) => {
                  const status = String(
                    item.status || "unknown"
                  ).toLowerCase();

                  const products = Array.isArray(item.cart)
                    ? item.cart
                    : [];

                  return (
                    <tr key={item._id || index}>
                      <td>
                        <div className={styles.OrderIdentity}>
                          <span className={styles.OrderNumber}>
                            #
                            {String(
                              item._id || index + 1
                            ).slice(-6)}
                          </span>

                          {isNew(item.createdAt) && (
                            <span className={styles.NewBadge}>
                              <span />
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className={styles.Customer}>
                          <span
                            className={styles.CustomerAvatar}
                          >
                            {(item.user?.name || "G")
                              .trim()
                              .charAt(0)
                              .toUpperCase()}
                          </span>

                          <div className={styles.CustomerInfo}>
                            <strong dir="auto">
                              {item.user?.name ||
                                "Guest Customer"}
                            </strong>

                            <small>Customer</small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className={styles.Contact}>
                          <span>
                            {item.user?.phone || "-"}
                          </span>

                          <small>
                            {item.user?.postalCode || "-"}
                          </small>
                        </div>
                      </td>

                      <td>
                        <div
                          className={styles.Address}
                          dir="auto"
                        >
                          {item.user?.address || "-"}
                        </div>
                      </td>

                      <td className={styles.Price}>
                        {formatPrice(item.totalprice)}
                      </td>

                      <td>
                        <span
                          className={`${styles.Badge} ${getStatusClass(
                            status
                          )}`}
                        >
                          <span
                            className={styles.BadgeDot}
                          />

                          {status === "unknown"
                            ? "Unknown"
                            : status.charAt(0).toUpperCase() +
                              status.slice(1)}
                        </span>
                      </td>

                      <td className={styles.Date}>
                        {formatDate(item.createdAt)}
                      </td>

                      <td>
                        <div className={styles.ProductList}>
                          {products.length > 0 ? (
                            <>
                              {products
                                .slice(0, 2)
                                .map((product, idx) => (
                                  <div
                                    className={
                                      styles.ProductItem
                                    }
                                    key={
                                      product._id ||
                                      product.id ||
                                      idx
                                    }
                                  >
                                    <span
                                      className={
                                        styles.ProductTitle
                                      }
                                      dir="auto"
                                    >
                                      {product.title || "Product"}
                                    </span>

                                    <span
                                      className={
                                        styles.ProductCount
                                      }
                                    >
                                      ×{product.count ?? 1}
                                    </span>
                                  </div>
                                ))}

                              {products.length > 2 && (
                                <span
                                  className={
                                    styles.MoreProducts
                                  }
                                >
                                  +{products.length - 2} more
                                </span>
                              )}
                            </>
                          ) : (
                            <span className={styles.Muted}>
                              No products
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <Link
                          href={`/Orders/${item._id}`}
                          className={styles.DetailsButton}
                        >
                          View <FaArrowRight />
                        </Link>
                      </td>

                      <td>
                        <OrderActions
                          orderId={String(item._id)}
                          status={status}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
 