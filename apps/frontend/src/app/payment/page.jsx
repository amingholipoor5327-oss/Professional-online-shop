"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import styles from "../component/css/payment.module.css";
import { Cartcontext } from "../context/context";

export default function Payment() {
    const { cart, totalprice,clearcart } = useContext(Cartcontext);
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [issubmit, setIssubmit] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        postalCode: "",
    });

    function formatPrice(price) {
        return Math.round(price * 85000).toLocaleString("fa-IR");
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

     const isFormValid = () => {
        return (
            form.name.trim() !== "" &&
            form.phone.trim() !== "" &&
            form.address.trim() !== "" &&
            form.postalCode.trim() !== ""
        );
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!isFormValid()) {
            alert("❌ لطفاً تمام فیلدها را پر کنید!");
            return;
        }

        setIssubmit(true);

        console.log("اطلاعات سفارش:", {
            form,
            paymentMethod,
            cart,
            total: totalprice(),
        });

         setTimeout(() => {
            alert("✅ سفارش شما با موفقیت ثبت شد!");
             setForm({
                name: "",
                phone: "",
                address: "",
                postalCode: "",
             })
             setIssubmit(false);
            clearcart()
        }, 3000);
    }

    if (cart.length === 0) {
        return (
            <main className={styles.empty}>
                <h1>سبد خرید شما خالی است</h1>
                <p>برای ادامه فرایند خرید ابتدا محصولی به سبد خرید اضافه کنید.</p>
                <Link href="/store" className={styles.backButton}>
                    رفتن به فروشگاه
                </Link>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>تکمیل سفارش</h1>

            <div className={styles.content}>
                {/* ===== فرم اطلاعات ===== */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <h2>اطلاعات گیرنده</h2>

                        <div className={styles.formGrid}>
                            <div className={styles.field}>
                                <label>نام و نام خانوادگی</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="نام و نام خانوادگی"
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>شماره موبایل</label>
                                <input
                                    type="number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label>آدرس</label>
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="آدرس کامل خود را وارد کنید"
                                rows="4"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>کد پستی</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={form.postalCode}
                                onChange={handleChange}
                                placeholder="۱۰ رقمی"
                                maxLength="10"
                                required
                            />
                        </div>
                    </div>

                    {/* ===== روش پرداخت ===== */}
                    <div className={styles.section}>
                        <h2>روش پرداخت</h2>

                        <div className={styles.paymentMethods}>
                            <label
                                className={`${styles.paymentMethod} ${
                                    paymentMethod === "online" ? styles.selected : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <div>
                                    <strong>💳 پرداخت آنلاین</strong>
                                    <span>پرداخت امن از طریق درگاه بانکی</span>
                                </div>
                            </label>

                            <label
                                className={`${styles.paymentMethod} ${
                                    paymentMethod === "cash" ? styles.selected : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    checked={paymentMethod === "cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <div>
                                    <strong>💰 پرداخت در محل</strong>
                                    <span>پرداخت هنگام تحویل سفارش</span>
                                </div>
                            </label>
                        </div>
                    </div>

                     <button
                        type="submit"
                        className={`${styles.submit} ${
                            isFormValid() && issubmit ? styles.sucses : ""
                        }`}
                        disabled={!isFormValid() || issubmit}
                    >
                        {issubmit ? (
                            "✅ سفارش شما ثبت شد!"
                        ) : isFormValid() ? (
                            "📝 ثبت سفارش"
                        ) : (
                            "🔒 ابتدا فیلدها را پر کنید"
                        )}
                    </button>
                </form>

                {/* ===== خلاصه سفارش ===== */}
                <aside className={styles.summary}>
                    <h2>خلاصه سفارش</h2>

                    <div className={styles.products}>
                        {cart.map((product) => (
                            <div className={styles.product} key={product.id}>
                                <div className={styles.productImage}>
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className={styles.productInfo}>
                                    <h3>{product.title}</h3>
                                    <span>تعداد: {product.count.toLocaleString("fa-IR")}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <div className={styles.row}>
                        <span>تعداد کالا:</span>
                        <span>
                            {cart.reduce((sum, item) => sum + item.count, 0).toLocaleString("fa-IR")}
                        </span>
                    </div>

                    <div className={styles.row}>
                        <span>هزینه ارسال:</span>
                        <span>رایگان</span>
                    </div>

                    <div className={styles.finalPrice}>
                        <span>مبلغ نهایی:</span>
                        <strong>{formatPrice(totalprice())} تومان</strong>
                    </div>

                    <Link href="/Shop" className={styles.backToCart}>
                        بازگشت به سبد خرید
                    </Link>
                </aside>
            </div>
        </main>
    );
}