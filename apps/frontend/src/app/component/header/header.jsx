 "use client";

import Link from "next/link";
import styles from "../css/header.module.css";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.container}>

             <div className={styles.store}>
                🛍️ فروشگاه آنلاین
            </div>

             <nav
                className={`${styles.nav} ${
                    isMenuOpen ? styles.active : ""
                }`}
            >
                <Link
                    href="/"
                    className={styles.cartLink}
                    onClick={() => setIsMenuOpen(false)}
                >
                    صفحه اصلی
                </Link>

                <Link
                    href="/store"
                    className={styles.cartLink}
                    onClick={() => setIsMenuOpen(false)}
                >
                    فروشگاه
                </Link>

                <Link
                    href="/Shop"
                    className={styles.cartLink}
                    onClick={() => setIsMenuOpen(false)}
                >
                    سبد خرید
                </Link>
            </nav>

             <button
                className={styles.menuToggle}
                onClick={() =>
                    setIsMenuOpen(!isMenuOpen)
                }
                aria-label="باز و بسته کردن منو"
                aria-expanded={isMenuOpen}
            >
                {isMenuOpen ? "✕" : "☰"}
            </button>

        </header>
    );
}
 