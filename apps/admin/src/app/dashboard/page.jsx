import Link from "next/link"
import styles from "../component/css/Dashboard.module.css"

async function getStats() {
  try {
    const [ordersRes, productsRes] = await Promise.all([
      fetch("http://localhost:3001/api/orders", { cache: "no-store" }),
      fetch("http://localhost:3001/api/products", { cache: "no-store" }),
    ])

    const orders = ordersRes.ok ? await ordersRes.json() : []
    const products = productsRes.ok ? await productsRes.json() : []

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalprice || 0), 0)
    const pendingOrders = orders.filter((o) => o.status === "pending").length

    return {
      ordersCount: orders.length,
      productsCount: products.length,
      totalRevenue,
      pendingOrders,
      recentOrders: orders.slice(2 , -1),
    }
  } catch (err) {
    console.error(err)
    return {
      ordersCount: 0,
      productsCount: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      recentOrders: [],
    }
  }
}

export default async function Dashboard() {
  const stats = await getStats()

  const cards = [
    {
      title: "Orders",
      value: stats.ordersCount,
      icon: "🛒",
      color: "blue",
      href: "/Orders",
    },
    {
      title: "Products",
      value: stats.productsCount,
      icon: "📦",
      color: "purple",
      href: "/Products",
    },
    {
      title: "Total Revenue",
      value: stats.totalRevenue.toLocaleString("en-US") + "$",
      icon: "💰",
      color: "green",
      href: "/Orders",
    },
    {
      title: "Pending...",
      value: stats.pendingOrders,
      icon: "⏳",
      color: "orange",
      href: "/Orders",
    },
  ]

  return (
    <div className={styles.Container}>
      <div className={styles.Head}>
        <h1 className={styles.Title}>Dashboard</h1>
        <span className={styles.date}>
          {new Date().toLocaleDateString("fa-IR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

n      <div className={styles.cardsGrid}>
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`${styles.card} ${styles[card.color]}`}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardValue}>{card.value}</p>
            </div>
          </Link>
        ))}
      </div>

       <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Last Orders</h2>
          <Link href="/Orders" className={styles.sectionLink}>
             see all →
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className={styles.Empty}>there isn't any orders! </p>
        ) : (
          <div className={styles.TableWrapper}>
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user?.name || "-"}</td>
                    <td className={styles.price}>
                      {order.totalprice?.toLocaleString("en-US") || "-"}  $
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles[order.status] || ""}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.date}>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}