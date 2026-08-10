import Link from "next/link";
import styles from "../css/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
         <div className={styles.section}>
          <h3 className={styles.title}>Amin Style</h3>
          <p className={styles.description}>
            ارائه‌دهنده بهترین محصولات با کیفیت و قیمت مناسب.
            هدف ما رضایت شماست.
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Telegram">✈️</a>
            <a href="#" aria-label="YouTube">▶️</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>لینک‌های سریع</h4>
          <ul className={styles.links}>
            <li><Link href="/">خانه</Link></li>
            <li><Link href="/store">فروشگاه</Link></li>
            <li><Link href="/Shop">سبد خرید </Link></li>
            <li><Link href="/contact">درباره ما</Link></li>
          </ul>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>دسته‌بندی‌ها</h4>
          <ul className={styles.links}>
            <li><Link href="/category/men">مردانه</Link></li>
            <li><Link href="/category/women">زنانه</Link></li>
            <li><Link href="/category/kids">بچه‌گانه</Link></li>
            <li><Link href="/category/accessories">اکسسوری</Link></li>
          </ul>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>تماس با ما</h4>
          <ul className={styles.contact}>
            <li>📍 فارس , خیابان ولیعصر</li>
            <li>📞 ۰09026815327</li>
            <li>✉️ amingholipoor1@gmail.com</li>
            <li>🕐 شنبه تا پنجشنبه ۹ تا ۱۸</li>
          </ul>
        </div>
      </div>

       <div className={styles.copyright}>
        <p>
          © {new Date().getFullYear()} Amin Style. تمامی حقوق محفوظ است.
        </p>
        <p>ساخته شده با ❤️ توسط تیم Amin Style</p>
      </div>
    </footer>
  );
}