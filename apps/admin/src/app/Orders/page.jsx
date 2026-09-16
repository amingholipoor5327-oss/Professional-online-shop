import Link from "next/link"
import styles from "../component/css/Orders.module.css"
import { FaArrowLeft } from "react-icons/fa"

function isNew(createdAt){
  if(!createdAt) return false
  return Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000
 }
export default async function Orders() {
  let data = []

  try {
    const response = await fetch("http://localhost:3001/api/orders")

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    data = await response.json()
  } catch (err) {
    console.error("Fetch error:", err)
    return (
      <div className={styles.Container}>
        <p className={styles.Error}>  Error to fetch orders ❌</p>
      </div>
    )
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Head}>
        <h1 className={styles.Title}> Orders List </h1>
      </div>

      {data.length === 0 ? (
        <p className={styles.Empty}>No orders yet </p>
      ) : (
        <div className={styles.TableWrapper}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>Details</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Total price</th>
                <th>Status</th>
                <th>Date</th>
                <th>Products</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link href={`/Orders/${item._id}`} className={styles.more}> More<FaArrowLeft/></Link>
                    </td>
                  <td>{item.user?.name || "-"}</td>
                  <td>{item.user?.phone || "-"}</td>
                  <td className={styles.address}>{item.user?.address || "-"}</td>
                  <td>{item.user?.postalCode || "-"}</td>
                  <td className={styles.price}>
                  {item.totalprice?.toLocaleString("en-US", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  }) || "-"} $
                  </td>
                  <td>                
                    {isNew(item.createdAt) && (
                      <span className={styles.newBadge}>New</span>
                    )}
                    <span className={`${styles.badge} ${styles[item.status] || ""}`}>
                      {item.status || "-"}
                    </span>
                  </td>
                  <td className={styles.date}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("fa-IR")
                      : "-"}
                  </td>
                  <td>


                    <div className={styles.products}>
                      {item.cart?.map((order, idx) => (
                        <div key={idx} className={styles.productItem}>
                          <span className={styles.productTitle}>{order.title}</span>
                          <span className={styles.productCount}>× {order.count}</span>
                        </div>
                      ))}
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}