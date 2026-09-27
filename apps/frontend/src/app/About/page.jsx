"use client";

import Link from "next/link";
import styles from "../component/css/about.module.css";

export default function About() {
  return (
    <main className={styles.container}>

       <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>👋 درباره من</span>

          <h1>
            سلام، من <span>امین</span> هستم
          </h1>

          <p>
            توسعه‌دهنده Frontend و علاقه‌مند به ساخت وب‌سایت‌های مدرن،
            سریع و ریسپانسیو.
          </p>

          <div className={styles.buttons}>
            <Link href="/store" className={styles.primaryButton}>
              مشاهده فروشگاه
            </Link>

            <Link href="/Contact" className={styles.secondaryButton}>
              ارتباط با من
            </Link>
          </div>
        </div>
      </section>


       <section className={styles.about}>
        <div className={styles.aboutText}>
          <span className={styles.sectionLabel}>ABOUT ME</span>

          <h2>من چه کار می‌کنم؟</h2>

          <p>
            من محمد امین قلی پور هستم و در زمینه توسعه وب و مخصوصاً
            Frontend فعالیت می‌کنم.
          </p>

          <p>
            تمرکز اصلی من روی ساخت رابط‌های کاربری مدرن، ریسپانسیو و
            کاربردی با استفاده از تکنولوژی‌های روز وب است.
          </p>

          <p>
            در مسیر یادگیری و توسعه، روی پروژه‌های واقعی کار می‌کنم تا
            علاوه بر یادگیری تکنولوژی‌ها، تجربه حل مسائل واقعی در پروژه
            را نیز به دست بیاورم.
          </p>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            A
          </div>

          <h3>محمد امین قلی پور</h3>

          <span>Frontend Developer</span>

          <div className={styles.cardLine}></div>

          <p>
            React • Next.js • JavaScript
          </p>
        </div>
      </section>


       <section className={styles.skills}>
        <span className={styles.sectionLabel}>MY SKILLS</span>

        <h2>تکنولوژی‌هایی که با آن‌ها کار می‌کنم</h2>

        <p className={styles.sectionDescription}>
          ابزارها و تکنولوژی‌هایی که در پروژه‌های خودم برای توسعه
          رابط کاربری و ساخت وب‌سایت استفاده می‌کنم.
        </p>

        <div className={styles.skillGrid}>

          <div className={styles.skill}>
            <strong>HTML5</strong>
            <span>ساختار صفحات وب</span>
          </div>

          <div className={styles.skill}>
            <strong>CSS3</strong>
            <span>طراحی و Responsive</span>
          </div>

          <div className={styles.skill}>
            <strong>JavaScript</strong>
            <span>منطق و تعاملات سایت</span>
          </div>

          <div className={styles.skill}>
            <strong>React</strong>
            <span>ساخت رابط کاربری</span>
          </div>

          <div className={styles.skill}>
            <strong>Next.js</strong>
            <span>توسعه اپلیکیشن‌های مدرن</span>
          </div>

          <div className={styles.skill}>
            <strong>Git & GitHub</strong>
            <span>مدیریت و همکاری روی پروژه</span>
          </div>

        </div>
      </section>


       <section className={styles.project}>
        <div>
          <span className={styles.sectionLabel}>MY PROJECT</span>

          <h2>Aminora</h2>

          <p>
            Aminora یک پروژه فروشگاه آنلاین است که برای تمرین و توسعه
            مهارت‌های Frontend و کار با API ساخته شده است.
          </p>

          <p>
            در این پروژه بخش‌هایی مانند نمایش محصولات، دسته‌بندی،
            صفحه جزئیات محصول، سبد خرید، ثبت سفارش و ارتباط با API
            پیاده‌سازی شده است.
          </p>

          <div className={styles.techList}>
            <span>React</span>
            <span>Next.js</span>
            <span>JavaScript</span>
            <span>REST API</span>
            <span>MongoDB</span>
          </div>
        </div>

        <div className={styles.projectNumber}>
          <span>01</span>
          <small>PROJECT</small>
        </div>
      </section>


       <section className={styles.goal}>
        <span className={styles.sectionLabel}>MY GOAL</span>

        <h2>
          همیشه در حال یادگیری و بهتر شدن
        </h2>

        <p>
          هدف من این است که در مسیر Frontend Development به یک
          توسعه‌دهنده حرفه‌ای تبدیل شوم و بتوانم پروژه‌هایی با
          کیفیت، طراحی مناسب و تجربه کاربری خوب ایجاد کنم.
        </p>
      </section>


       <section className={styles.cta}>
        <h2>بیایید با هم چیزی بسازیم </h2>

        <p>
          اگر می‌خواهید محصولات فروشگاه را ببینید، از اینجا شروع کنید.
        </p>

        <Link href="/store" className={styles.ctaButton}>
          ورود به فروشگاه
        </Link>
      </section>

    </main>
  );
}