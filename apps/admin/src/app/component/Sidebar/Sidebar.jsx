 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaStore,
  FaSignOutAlt,
  FaChevronLeft,
  FaCog,
  FaSignInAlt,
} from "react-icons/fa";

import styles from "../css/Sidebar.module.css";
import { useStoreSettings } from "../SettingsProvider/SettingsProvider";

 const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    faLabel: "داشبورد",
    icon: <FaTachometerAlt />,
  },
  {
    href: "/Products",
    label: "Products",
    faLabel: "محصولات",
    icon: <FaBoxOpen />,
  },
  {
    href: "/Orders",
    label: "Orders",
    faLabel: "سفارش‌ها",
    icon: <FaShoppingCart />,
  },
  {
    href: "/Settings",
    label: "Settings",
    faLabel: "تنظیمات",
    icon: <FaCog />,
  },
];

export default function Sidebar() {
   const [isVisible, setIsVisible] = useState(false);
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const [user, setUser] = useState(null);
   const [authChecked, setAuthChecked] = useState(false);

  const pathname = usePathname();
  const router = useRouter();


  const { settings, loading } = useStoreSettings();

  const storeSettings = settings?.store ?? {};
  const appearance = settings?.appearance ?? {};

  const isPersian = appearance.language === "fa";
  const storeName = storeSettings.storeName || "MyStore";
  const storeLogo = storeSettings.logoUrl;

  const direction = appearance.direction || (isPersian ? "rtl" : "ltr");

   useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!response.ok) {
          if (!cancelled) {
            setUser(null);
          }

          return;
        }

        const session = await response.json();

        if (!cancelled) {
          setUser(session?.user ?? null);
        }
      } catch (error) {
        if (!cancelled) {
          setUser(null);
        }

        console.error("Could not load user session:", error);
      } finally {
        if (!cancelled) {
          setAuthChecked(true);
        }
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

   const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

   const closeSidebar = () => {
    setIsVisible(false);
  };

   const handleLogout = async () => {
    if (isLoggingOut || !user) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

       setUser(null);
      setIsVisible(false);

       router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      alert(
        isPersian
          ? "خروج انجام نشد. دوباره تلاش کن."
          : "Logout failed. Please try again."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

   const handleLogin = () => {
    closeSidebar();
    router.push("/login");
  };

   const displayName = user?.name || "Store Admin";
  const imageUrl = user?.image;

   const authButtonClass = user
    ? isLoggingOut
      ? styles.LoggingOutBtn
      : ""
    : styles.LoginBtn;

  return (
    <>
       <button
        type="button"
        className={styles.ToggleBtn}
        onClick={() => setIsVisible((previous) => !previous)}
        aria-label={isVisible ? "Close menu" : "Open menu"}
        aria-expanded={isVisible}
        aria-controls="admin-sidebar"
      >
        {isVisible ? <FaTimes /> : <FaBars />}
      </button>

       {isVisible && (
        <button
          type="button"
          className={styles.Overlay}
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <aside
        id="admin-sidebar"
        dir={direction}
        className={`${styles.Container} ${
          isVisible ? styles.Visible : ""
        }`}
      >
         <Link
          href="/dashboard"
          className={styles.Logo}
          onClick={closeSidebar}
        >
          <span className={styles.LogoIcon}>
            {storeLogo ? (
              <img
                src={storeLogo}
                alt={storeName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <FaStore />
            )}
          </span>

          <span className={styles.LogoText}>
            <strong>{loading ? "..." : storeName}</strong>

            <small>
              {isPersian ? "پنل مدیریت" : "Admin Panel"}
            </small>
          </span>
        </Link>

         <div className={styles.SectionTitle}>
          {isPersian ? "مدیریت فروشگاه" : "STORE MANAGEMENT"}
        </div>

         <nav
          className={styles.Nav}
          aria-label="Admin navigation"
        >
          {menuItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.Link} ${
                  active ? styles.Active : ""
                }`}
                aria-current={active ? "page" : undefined}
                onClick={closeSidebar}
              >
                <span className={styles.Icon}>
                  {item.icon}
                </span>

                <span className={styles.LinkLabel}>
                  {isPersian ? item.faLabel : item.label}
                </span>

                {active && (
                  <FaChevronLeft
                    className={styles.ActiveArrow}
                  />
                )}
              </Link>
            );
          })}
        </nav>

         <div className={styles.Footer}>
          <div className={styles.AdminInfo}>
            <div className={styles.AdminAvatar}>
              {user?.image ? (
                <img
                  src={imageUrl}
                  alt={displayName}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>
                  {user
                    ? displayName.charAt(0).toUpperCase()
                    : "?"}
                </span>
              )}
            </div>

            <div className={styles.AdminText}>
              <strong title={displayName}>
                {!authChecked
                  ? "..."
                  : user
                    ? displayName
                    : isPersian
                      ? "کاربر مهمان"
                      : "Guest"}
              </strong>

              <small>
                {!authChecked
                  ? "..."
                  : user?.email ||
                    (isPersian
                      ? "وارد حساب نشده‌اید"
                      : "Not logged in")}
              </small>
            </div>
          </div>

           {authChecked && (
            <button
              type="button"
              className={`${styles.LogoutBtn} ${authButtonClass}`}
              onClick={user ? handleLogout : handleLogin}
              disabled={isLoggingOut}
              aria-busy={isLoggingOut}
            >
              {user ? (
                <FaSignOutAlt />
              ) : (
                <FaSignInAlt />
              )}

              <span>
                {user
                  ? isLoggingOut
                    ? isPersian
                      ? "در حال خروج..."
                      : "Logging out..."
                    : isPersian
                      ? "خروج"
                      : "Logout"
                  : isPersian
                    ? "ورود"
                    : "Login"}
              </span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
 