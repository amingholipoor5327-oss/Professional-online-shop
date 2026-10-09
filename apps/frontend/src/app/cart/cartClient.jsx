"use client";

import { useContext, useState } from "react";
import Link from "next/link";

import styles from "../component/css/cart.module.css";
import { Cartcontext } from "../context/context";

export default function CartClient({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [message, setMessage] = useState("");

  const { cart, addcart, deletecart } = useContext(Cartcontext);
  const isInCart = cart.some((item) => item.id === product.id);

  const priceInToman = Math.round(product.price * 85000).toLocaleString("en-US");

  function handleAddCart() {
    addcart(product);

    setIsAdded(true);
    setMessage("");

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  }

  function handleRemoveCart() {
    if (!isInCart) {
      setMessage("این محصول هنوز به سبد خرید اضافه نشده است.");
      setIsRemoved(false);
      return;
    }

    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید این محصول را از سبد خرید حذف کنید؟"
    );

    if (!confirmed) return;

    deletecart(product);

    setIsRemoved(true);
    setMessage("");

    setTimeout(() => {
      setIsRemoved(false);
    }, 3000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>
            {product.title}
          </h1>

          <Link
            className={styles.category}
            href={`/category/${encodeURIComponent(product.category)}`}
          >
            {product.category}
          </Link>

          <p className={styles.price}>
            {priceInToman} Toman
          </p>

          <p className={styles.description}>
            {product.description}
          </p>

          <div className={styles.rating}>
            ⭐ {product.rating?.rate ?? 0}
            {" "}
            ({product.rating?.count ?? 0} نظر)
          </div>

          <div className={styles.actions}>

            <button
              type="button"
              className={`${styles.addBtn} ${isAdded ? styles.added : ""}`}
              onClick={handleAddCart}
            >
              {isAdded? "✅ اضافه شد" : "افزودن به سبد خرید"}
            </button>

             <button
              type="button"
              className={`${styles.removeBtn} ${isRemoved ? styles.remove : ""}`}
              onClick={handleRemoveCart}
            >
              {isRemoved? "✅ حذف شد" : "حذف از سبد خرید"}
            </button>
          </div>

           {message && (
            <p
              className={styles.message}
              role="status"
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}