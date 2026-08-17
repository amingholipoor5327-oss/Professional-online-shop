"use client";

import Link from "next/link";
import styles from "../component/css/contact.module.css";

export default function Contact() {
    return (
        <main className={styles.container}>

             <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.badge}>
                        🔤Aminora
                    </span>

                    <h1>
                        خریدی ساده، سریع و مطمئن
                    </h1>

                    <p>
                        ما در Aminora تلاش می‌کنیم تجربه‌ای ساده و لذت‌بخش
                        برای خرید آنلاین ایجاد کنیم؛ از پیدا کردن محصول موردنظر
                        تا ثبت سفارش و پرداخت.
                    </p>
                </div>
            </section>


             <section className={styles.about}>
                <div className={styles.aboutText}>

                    <h2>ما کی هستیم؟</h2>

                    <p>
                       Aminora یک فروشگاه آنلاین با هدف ارائه محصولات
                        متنوع و ایجاد یک تجربه خرید آسان و مدرن است.
                    </p>

                    <p>
                        در این فروشگاه می‌توانید محصولات مختلف را مشاهده کنید،
                        آن‌ها را به سبد خرید اضافه کنید و پس از تکمیل اطلاعات
                        سفارش، فرآیند خرید خود را انجام دهید.
                    </p>

                    <p>
                        هدف ما این است که مسیر خرید برای مشتری تا حد ممکن
                        ساده، سریع و قابل اعتماد باشد.
                    </p>

                </div>

                <div className={styles.aboutCard}>
                    <div className={styles.icon}>
                        🛍️
                    </div>

                    <h3>Aminora</h3>

                    <p>
                        فروشگاهی برای یک تجربه خرید بهتر
                    </p>
                </div>
            </section>


             <section className={styles.features}>

                <h2>چرا Aminora؟</h2>

                <div className={styles.featureGrid}>

                    <div className={styles.feature}>
                        <span>⚡</span>
                        <h3>سریع و ساده</h3>
                        <p>
                            پیدا کردن محصول و ثبت سفارش در چند مرحله ساده.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <span>🛒</span>
                        <h3>سبد خرید هوشمند</h3>
                        <p>
                            مدیریت محصولات و تعداد آن‌ها قبل از ثبت سفارش.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <span>💳</span>
                        <h3>روش‌های پرداخت</h3>
                        <p>
                            امکان انتخاب روش پرداخت متناسب با سفارش شما.
                        </p>
                    </div>

                    <div className={styles.feature}>
                        <span>📦</span>
                        <h3>ثبت سفارش</h3>
                        <p>
                            ثبت اطلاعات گیرنده و پیگیری فرآیند خرید.
                        </p>
                    </div>

                </div>

            </section>


             <section className={styles.technology}>

                <h2>تکنولوژی‌های استفاده شده</h2>

                <p>
                    این پروژه با استفاده از تکنولوژی‌های مدرن وب توسعه داده شده
                    است.
                </p>

                <div className={styles.techList}>
                    <span>React</span>
                    <span>Next.js</span>
                    <span>JavaScript</span>
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>REST API</span>
                </div>

            </section>


             <section className={styles.cta}>

                <h2>
                    آماده خرید هستید؟
                </h2>

                <p>
                    محصولات فروشگاه را مشاهده کنید و خرید خود را شروع کنید.
                </p>

                <Link
                    href="/store"
                    className={styles.button}
                >
                    مشاهده فروشگاه
                </Link>

            </section>

        </main>
    );
}