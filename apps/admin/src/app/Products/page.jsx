import { FaEdit, FaTrash } from "react-icons/fa"
import styles from "../component/css/Products.module.css"
import Link from "next/link"

function isNew(createdAt){
  if(!createdAt) return false; 
  return Date.now() - new Date(createdAt).getTime()< 24 * 60 * 60 * 1000
}
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
               <td>
                  {item.title}
                  {isNew(item.createdAt) && (
                    <span className={styles.newBadge}>NEW</span>
                  )}
                </td>
                <td>
                  <div className={styles.Actions}>
                    <Link href={`/Products/edit/${item.id}`} className={`${styles.ActionBtn} ${styles.EditBtn}`}>
                      <FaEdit />
                    </Link>
                    <Link href={`/Products/delete/${item.id}`} className={`${styles.ActionBtn} ${styles.DeleteBtn}`}>
                      <FaTrash />
                    </Link>
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