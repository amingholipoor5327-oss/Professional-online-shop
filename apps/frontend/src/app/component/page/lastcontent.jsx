"use client";

import Link from "next/link";
import styles from "../css/Lastcontent.module.css";
import { useContext, useState } from "react";
import { Cartcontext } from "../../context/context";

export default function LastContent({ product }) {
    const [isAdded, setIsAdded] = useState(false);

    const { addcart } = useContext(Cartcontext);

    const priceInToman = Math.round(
        product.price * 85000
    ).toLocaleString("fa-IR");

    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();

        addcart(product);

        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    }

    return (
        <div className={styles.container}>

             <Link href={`/cart/${product.id}`}>
                <div className={styles.imageWrapper}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className={styles.image}
                    />
                </div>
            </Link>

             <Link
                href={`/cart/${product.id}`}
                className={styles.contentLink}
            >
                <div className={styles.content}>

                    <h3 className={styles.title}>
                        {product.title}
                    </h3>

                    <p className={styles.price}>
                        {priceInToman} تومان
                    </p>

                </div>
            </Link>

             <button
                onClick={handleAddToCart}
                className={`${styles.addButton} ${
                    isAdded ? styles.added : ""
                }`}
            >
                {isAdded
                    ? "✅ اضافه شد!"
                    : "افزودن به سبد خرید"}
            </button>

        </div>
    );
}