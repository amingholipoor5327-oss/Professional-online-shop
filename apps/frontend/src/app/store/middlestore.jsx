import styles from "../component/css/middle.module.css";
import Storecontent from "./storecontent";
 
export default function Middlestore({ product }) {
  
   if (!product) {
    return <div className={styles.error}>محصولی یافت نشد</div>;
  }

  if (product.length === 0) {
    return <div className={styles.empty}>هیچ محصولی موجود نیست</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {product.map((item) => (
        <Storecontent key={item.id} product={item} />
      ))}
    </div>
  );
}