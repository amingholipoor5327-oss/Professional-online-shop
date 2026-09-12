"use client"

import { useState } from "react"
import styles from "../css/Sidebar.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {FaBoxOpen,FaShoppingCart, FaTachometerAlt} from "react-icons/fa"

export default function Sidebar() {
  const [isvisible, setIsvisible] = useState(false)
  const router = usePathname()

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />
    },
    {
      href: "/Products",
      label: "Products",
      icon: <FaBoxOpen />
    },
    {
      href: "/Orders",
      label: "Orders",
      icon: <FaShoppingCart />
    }
  ]

  return (
    <>
      <button
        className={styles.ToggleBtn}
        onClick={() => setIsvisible(!isvisible)}
      >
        {isvisible ? "✕" : "☰"}
      </button>


      {isvisible && (
        <div
          className={styles.Overlay}
          onClick={() => setIsvisible(false)}
        />
      )}


      <div
        className={`${styles.Container} ${
          isvisible ? styles.Visible : ""
        }`}
      >

        <div className={styles.Logo}>
          <span>MyStore</span>
        </div>


        <nav className={styles.Nav}>

          {menuItems.map((item) => (

            <Link
              key={item.href}
              href={item.href}

              className={`${styles.Link} ${
                router === item.href
                  ? styles.Active
                  : ""
              }`}

              onClick={() => setIsvisible(false)}
            >

              <span className={styles.Icon}>
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </Link>

          ))}

        </nav>


        <div className={styles.Footer}>

          <button className={styles.LogoutBtn}>
            Logout
          </button>

        </div>

      </div>
    </>
  )
}