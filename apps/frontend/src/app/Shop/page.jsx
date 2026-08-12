"use client";

import { useContext } from "react";
import styles from "../component/css/cartshop.module.css";
import { Cartcontext } from "../context/context";
import Link from "next/link";

export default function CartPage() {
const {
    cart,
    deletecart,
    updatecount,
    totalprice,
    clearcart,
} = useContext(Cartcontext);

    // تبدیل قیمت دلار به تومان + نمایش اعداد فارسی
    function formatPrice(price) {
        return Math.round(price * 85000).toLocaleString("fa-IR");
    }

    if (cart.length === 0) {
        return (
            <div className={styles.empty}>
                <h1>سبد خرید خالی است🛒</h1>
                <p>
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                </p>
            </div>
        );
    }

    return (
        <main className={styles.container}>

            <h1 className={styles.title}>
                سبد خرید
            </h1>

            <div className={styles.content}>

                 
                <section className={styles.products}>

                    {cart.map((product) => (
                        <div
                            className={styles.product}
                            key={product.id}
                        >

                            <div className={styles.image}>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                />
                            </div>

                            <div className={styles.info}>

                                <h2>
                                    {product.title}
                                </h2>

                                <p className={styles.price}>
                                    {formatPrice(product.price)} تومان
                                </p>

                                <div className={styles.actions}>
                                    
                                    <div className={styles.counter}>

                                        <button
                                            onClick={() =>
                                                updatecount(
                                                    product.id,
                                                    product.count - 1
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {product.count.toLocaleString(
                                                "fa-IR"
                                            )}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updatecount(
                                                    product.id,
                                                    product.count + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className={styles.delete}
                                        onClick={() =>
                                            deletecart(product)
                                        }
                                    >
                                        حذف🗑️
                                    </button>

                                </div>
                            </div>

                            <div className={styles.itemTotal}>
                                {formatPrice(
                                    product.price * product.count
                                )}{" "}
                                تومان
                            </div>

                        </div>
                    ))}

                     <button
                        className={styles.clear}
                        onClick={clearcart}
                    >
                        خالی کردن سبد خرید
                    </button>

                </section>

                <aside className={styles.summary}>

                    <h2>
                        خلاصه سفارش
                    </h2>

                     <div className={styles.row}>
                        <span>
                            تعداد محصولات:
                        </span>

                        <span>
                            {cart.length.toLocaleString("fa-IR")}
                        </span>
                    </div>

                    <div className={styles.row}>
                        <span>
                            مجموع:
                        </span>

                        <span>
                            {formatPrice(totalprice())} تومان
                        </span>
                    </div>

                    <hr />

                    <div className={styles.finalPrice}>
                        <span>
                            مبلغ نهایی:
                        </span>

                        <strong>
                            {formatPrice(totalprice())} تومان
                        </strong>
                    </div>

                    <Link className={styles.checkout}  href={"/payment"}>
                        ادامه فرایند خرید
                    </Link>

                </aside>

            </div>

        </main>
    );
}
