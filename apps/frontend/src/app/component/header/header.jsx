 "use client";

import Link from "next/link";
import styles from "../css/header.module.css";
import { useContext, useState } from "react";
import { Cartcontext } from "@/app/context/context";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {cart} = useContext(Cartcontext)

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

                {cart.length> 0 &&
                <span className={styles.len}>
                        {
                            cart.length
                     }
                     </span>
                } 

                <Link
                    href="/contact"
                    className={styles.cartLink}
                    onClick={() => setIsMenuOpen(false)}
                >
                     درباره ما   
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
 