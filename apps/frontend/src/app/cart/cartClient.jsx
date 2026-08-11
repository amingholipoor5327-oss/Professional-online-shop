"use client";

import { useState } from "react";
import styles from "../component/css/cart.module.css";

export default function CartClient({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.category}>{product.category}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.rating}>
            ⭐ {product.rating?.rate} ({product.rating?.count} نظر)
          </div>
          <div className={styles.actions}>
            <button
              className={`${styles.addBtn} ${isAdded ? styles.added : ''}`}
              onClick={() => {
                setIsAdded(!isAdded);
                setTimeout(() => setIsAdded(false), 3000);
              }}
            >
              {isAdded ? "✅ اضافه شد" : "➕ افزودن به سبد خرید"}
            </button>
            <button
              className={styles.removeBtn}
              onClick={() => confirm("آیا مطمئن هستید؟")}
            >
              🗑️ حذف از سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}