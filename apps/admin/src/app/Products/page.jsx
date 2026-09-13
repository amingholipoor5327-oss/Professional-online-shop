import { FaEdit, FaTrash } from "react-icons/fa"
import styles from "../component/css/Products.module.css"
import Link from "next/link"

export default async function Products() {
  let res = []
   try {
    const response = await fetch("http://localhost:3001/api/products", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    res = await response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    return (
      <div className={styles.Container}>
        <p className={styles.Error}>خطا در دریافت محصولات ❌</p>
      </div>
    )
  }

  return (
    <div className={styles.Container}> 
    <div className={styles.Head}>
    <Link href={"/Products/new"} className={styles.new}>add new product</Link>
      <h1 className={styles.Title}>لیست محصولات</h1>
     </div>
      
      {res.length === 0 ? (
        <p className={styles.Empty}>هنوز محصولی ثبت نشده 📦</p>
      ) : (
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {res.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>
                  <div className={styles.Actions}>
                    <button className={`${styles.ActionBtn} ${styles.EditBtn}`}>
                      <FaEdit />
                    </button>
                    <button className={`${styles.ActionBtn} ${styles.DeleteBtn}`}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}