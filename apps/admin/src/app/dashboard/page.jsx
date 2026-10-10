
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import DashboardSearch from "./DashboardSearch";

import styles from "../component/css/Dashboard.module.css";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const formatMoney = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

async function getStats() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  if (!sessionToken) {
    return { unauthorized: true };
  }

  try {
    const [ordersRes, productsRes] = await Promise.all([
      fetch(`${API_URL}/api/orders`, {
        cache: "no-store",
        headers: {
          Cookie: `admin_session=${sessionToken}`,
        },
      }),

      fetch(`${API_URL}/api/products`, {
        cache: "no-store",
      }),
    ]);

    if (ordersRes.status === 401) {
      return { unauthorized: true };
    }

    if (!ordersRes.ok || !productsRes.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    const [ordersData, productsData] = await Promise.all([
      ordersRes.json(),
      productsRes.json(),
    ]);

    const orders = Array.isArray(ordersData)
      ? ordersData
      : Array.isArray(ordersData?.orders)
        ? ordersData.orders
        : [];

    const products = Array.isArray(productsData)
      ? productsData
      : Array.isArray(productsData?.products)
        ? productsData.products
        : [];

    const sortedOrders = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (Number(order.totalprice) || 0),
      0
    );

    const pendingOrders = orders.filter(
      (order) => order.status?.toLowerCase() === "pending"
    ).length;

    const revenueByDay = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const revenue = orders.reduce((sum, order) => {
        if (!order.createdAt) return sum;

        const orderDate = new Date(order.createdAt);

        if (orderDate >= date && orderDate < nextDate) {
          return sum + (Number(order.totalprice) || 0);
        }

        return sum;
      }, 0);

      return {
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue,
      };
    });

    const statusConfig = [
      { name: "Delivered", color: "#22c993" },
      { name: "Success", color: "#22c993" },
      { name: "Pending", color: "#ffad43" },
      { name: "Processing", color: "#3478f6" },
      { name: "Cancelled", color: "#f04472" },
      { name: "Refunded", color: "#8b5cf6" },
    ];

    const orderStatuses = statusConfig.map((status) => ({
      ...status,
      count: orders.filter(
        (order) =>
          order.status?.toLowerCase() === status.name.toLowerCase()
      ).length,
    }));

    return {
      unauthorized: false,
      ordersCount: orders.length,
      productsCount: products.length,
      totalRevenue,
      pendingOrders,
      recentOrders: sortedOrders.slice(0, 5),
      revenueByDay,
      orderStatuses,
    };
  } catch (error) {
    console.error("Dashboard error:", error);

    return {
      unauthorized: false,
      ordersCount: 0,
      productsCount: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      recentOrders: [],
      revenueByDay: [],
      orderStatuses: [],
      error: true,
    };
  }
}

function RevenueChart({ data }) {
  const width = 500;
  const height = 175;
  const left = 42;
  const right = 10;
  const top = 12;
  const bottom = 28;

  const values = data.map((item) => item.revenue);
  const maxValue = Math.max(...values, 1);
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const points = data.map((item, index) => ({
    x: left + (index * chartWidth) / Math.max(data.length - 1, 1),
    y:
      top +
      chartHeight -
      (item.revenue / maxValue) * chartHeight,
  }));

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${
        height - bottom
      } L ${points[0].x} ${height - bottom} Z`
    : "";

  return (
    <div className={styles.Chart}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Revenue for the last seven days"
      >
        <defs>
          <linearGradient
            id="revenueGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#594bff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#594bff" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => {
          const y = top + (chartHeight * line) / 3;

          return (
            <g key={line}>
              <line
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#23324e"
                strokeDasharray="3 4"
              />

              <text
                x={left - 8}
                y={y + 4}
                textAnchor="end"
                fill="#94a3b8"
                fontSize="10"
              >
                {formatMoney((maxValue * (3 - line)) / 3)}
              </text>
            </g>
          );
        })}

        {areaPath && (
          <path d={areaPath} fill="url(#revenueGradient)" />
        )}

        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="#6658ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="3.5"
            fill="#8a80ff"
            stroke="#111c35"
            strokeWidth="2"
          />
        ))}

        {data.map((item, index) => (
          <text
            key={item.label}
            x={points[index]?.x ?? left}
            y={height - 7}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10"
          >
            {item.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function StatusChart({ statuses, total }) {
  let currentPercent = 0;

  const segments = statuses
    .filter((item) => item.count > 0)
    .map((item) => {
      const start = currentPercent;
      const percent = total ? (item.count / total) * 100 : 0;
      currentPercent += percent;

      return `${item.color} ${start}% ${currentPercent}%`;
    });

  const background = segments.length
    ? `conic-gradient(${segments.join(", ")})`
    : "#253047";

  return (
    <div className={styles.StatusLayout}>
      <div
        className={styles.Donut}
        style={{ background }}
        role="img"
        aria-label="Order status distribution"
      >
        <div className={styles.DonutCenter}>
          <strong>{total}</strong>
          <span>Total Orders</span>
        </div>
      </div>

      <div className={styles.StatusLegend}>
        {statuses.map((status) => (
          <div className={styles.StatusItem} key={status.name}>
            <span
              className={styles.StatusDot}
              style={{ background: status.color }}
            />
            <span className={styles.StatusName}>{status.name}</span>
            <strong>{status.count}</strong>
            <small>
              {total ? Math.round((status.count / total) * 100) : 0}%
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Dashboard() {
  const stats = await getStats();

  if (stats.unauthorized) {
    redirect("/login");
  }

  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Store Admin";
  const userImage =
    session?.user?.image || session?.user?.picture || null;

  const cards = [
    {
      title: "Total Orders",
      value: stats.ordersCount.toLocaleString("en-US"),
      icon: "🛒",
      color: "blue",
      href: "/Orders",
    },
    {
      title: "Total Products",
      value: stats.productsCount.toLocaleString("en-US"),
      icon: "📦",
      color: "purple",
      href: "/Products",
    },
    {
      title: "Total Revenue",
      value: formatMoney(stats.totalRevenue),
      icon: "＄",
      color: "green",
      href: "/Orders",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toLocaleString("en-US"),
      icon: "⌛",
      color: "orange",
      href: "/Orders",
    },
  ];

  return (
    <main className={styles.Container}>
      <header className={styles.Topbar}>
        <DashboardSearch apiUrl={API_URL} />

        <div className={styles.TopbarRight}>
          <span className={styles.LiveIndicator}>● Live dashboard</span>
          <div className={styles.Notification}>♧</div>

          <div className={styles.TopAvatar}>
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                referrerPolicy="no-referrer"
              />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </header>

      <section className={styles.Welcome}>
        <div>
          <span className={styles.Eyebrow}>OVERVIEW</span>
          <h1>Welcome back, {userName} 👋</h1>
          <p>Here&apos;s what&apos;s happening with your store today.</p>
        </div>

        <div className={styles.WelcomeDate}>
          <span>📅</span>
          <div>
            <strong>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </strong>
            <small>Your store at a glance</small>
          </div>
        </div>

        <div className={styles.WelcomeDecoration} aria-hidden="true">
          🏬
        </div>
      </section>

      <section className={styles.cardsGrid}>
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`${styles.card} ${styles[card.color]}`}
          >
            <div className={styles.CardTop}>
              <span className={styles.cardIcon}>{card.icon}</span>
              <span className={styles.CardDots}>•••</span>
            </div>

            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardValue}>{card.value}</p>

            <div className={styles.CardFoot}>
              <span>Current overview</span>
              <span className={styles.CardArrow}>↗</span>
            </div>
          </Link>
        ))}
      </section>

      <section className={styles.AnalyticsGrid}>
        <div className={styles.Panel}>
          <div className={styles.PanelHead}>
            <div>
              <h2>Revenue Overview</h2>
              <p>Revenue for the last 7 days</p>
            </div>
            <span className={styles.PeriodBadge}>Last 7 days</span>
          </div>

          <RevenueChart data={stats.revenueByDay} />
        </div>

        <div className={styles.Panel}>
          <div className={styles.PanelHead}>
            <div>
              <h2>Orders by Status</h2>
              <p>Order distribution</p>
            </div>
          </div>

          <StatusChart
            statuses={stats.orderStatuses}
            total={stats.ordersCount}
          />
        </div>
      </section>

      <section className={styles.OrdersPanel}>
        <div className={styles.PanelHead}>
          <div>
            <h2>Recent Orders</h2>
            <p>Latest orders from your customers</p>
          </div>

          <Link href="/Orders" className={styles.ViewAll}>
            View All Orders <span>→</span>
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className={styles.Empty}>
            <span>📭</span>
            <strong>No orders yet</strong>
            <p>Your recent orders will appear here.</p>
          </div>
        ) : (
          <div className={styles.TableWrapper}>
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentOrders.map((order, index) => {
                  const status = (order.status || "pending").toLowerCase();

                  return (
                    <tr key={order._id || index}>
                      <td className={styles.OrderId}>
                        #{String(order._id || index + 1).slice(-6)}
                      </td>

                      <td>
                        <div className={styles.Customer}>
                          <span className={styles.CustomerAvatar}>
                            {(order.user?.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </span>

                          <div>
                            <strong>
                              {order.user?.name || "Guest Customer"}
                            </strong>
                            <small>
                              {order.user?.email || "Customer"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td className={styles.Price}>
                        {formatMoney(order.totalprice)}
                      </td>

                      <td>
                        <span
                          className={`${styles.Badge} ${
                            styles[status] || styles.unknown
                          }`}
                        >
                          <span />
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>

                      <td className={styles.OrderDate}>
                        {order.createdAt ? formatDate(order.createdAt) : "-"}
                      </td>

                      <td>
                        <Link href="/Orders" className={styles.ViewButton}>
                          View
                        </Link>
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
