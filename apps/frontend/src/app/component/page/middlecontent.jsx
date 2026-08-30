import styles from "../css/middle.module.css";
import LastContent from "./lastcontent";

export default function Middle({ product }) {
  
   if (!product) {
    return <div className={styles.error}>محصولی یافت نشد</div>;
  }

  if (product.length === 0) {
    return <div className={styles.empty}>هیچ محصولی موجود نیست</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {product.map((item) => (
        <LastContent key={item.id} product={item} />
      ))}
    </div>
  );
}