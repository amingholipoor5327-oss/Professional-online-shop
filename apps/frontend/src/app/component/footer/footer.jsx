import Link from "next/link";
import styles from "../css/footer.module.css";
import { FaInstagram , FaYoutube , FaTwitter , FaTelegram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* معرفی فروشگاه */}
        <div className={styles.section}>
          <h3 className={styles.title}>Amin Style</h3>

          <p className={styles.description}>
            ارائه‌دهنده بهترین محصولات با کیفیت و قیمت مناسب.
            هدف ما رضایت شماست.
          </p>

          <div className={styles.social}>
            <a
              href="https://www.instagram.com/amin_gholipour1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram/>
            </a>

            <a
              href="https://t.me/amin_L7N"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram/>
            </a>

            <a
              href="https://www.youtube.com/@Bk_amin_L7N"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube/>
            </a>
            <a
              href="https://x.com/amin_ghL7N"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <FaTwitter/>
            </a>
</div>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>لینک‌های سریع</h4>

          <ul className={styles.links}>
            <li>
              <Link href="/">خانه</Link>
            </li>

            <li>
              <Link href="/store">فروشگاه</Link>
            </li>

            <li>
              <Link href="/Shop">سبد خرید</Link>
            </li>

            <li>
              <Link href="/contact">درباره ما</Link>
            </li>
          </ul>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>دسته‌بندی‌ها</h4>

          <ul className={styles.links}>

            <li>
             <Link href={`/category/${encodeURIComponent("men's clothing")}`}>
                   لباس مردانه
              </Link>
            </li>

            <li>
              <Link href={`/category/${encodeURIComponent("women's clothing")}`}>
                  لباس زنانه
              </Link>
            </li>

            <li>
              <Link href="/category/jewelery">
                جواهرات
              </Link>
            </li>

            <li>
              <Link href="/category/electronics">
                لوازم الکترونیکی
              </Link>
            </li>

          </ul>
        </div>

         <div className={styles.section}>
          <h4 className={styles.heading}>تماس با ما</h4>

          <ul className={styles.contact}>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Fars+Valiasr"
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 فارس، خیابان ولیعصر
            </a>            
            <li>📞 ۰۹۰۲۶۸۱۵۳۲۷</li>
            <li>✉️ amingholipoor1@gmail.com</li>
            <li>🕐 شنبه تا پنجشنبه ۹ تا ۱۸</li>
          </ul>
        </div>

      </div>

      <div className={styles.copyright}>
        <p>
          © {new Date().getFullYear()} 🔤Aminora.تمامی حقوق محفوظ است
        </p>

        <p>
          ساخته شده با ❤️ توسط تیم 🔤Aminora
        </p>
      </div>
    </footer>
  );
}