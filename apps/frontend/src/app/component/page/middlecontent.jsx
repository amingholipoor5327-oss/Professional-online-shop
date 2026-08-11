import styles from "../css/middle.module.css";
import LastContent from "./lastcontent";

export default function Middle({ product }) {
  return (
    <div className={styles.gridContainer}>
      {product.map((item) => (  
        <LastContent key={item.id} product={item} />  
      ))}
    </div>
  );
}