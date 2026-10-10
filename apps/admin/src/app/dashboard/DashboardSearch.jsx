"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../component/css/DashboardSearch.module.css";

function getList(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function DashboardSearch({ apiUrl = "" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const searchText = query.trim();

    if (searchText.length < 2) {
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const baseUrl = apiUrl.replace(/\/$/, "");

        const [ordersResponse, productsResponse] = await Promise.all([
          fetch(`${baseUrl}/api/orders`, {
            credentials: "include",
            cache: "no-store",
          }),
          fetch(`${baseUrl}/api/products`, {
            credentials: "include",
            cache: "no-store",
          }),
        ]);

        if (ordersResponse.status === 401) {
          throw new Error("برای جست‌وجوی سفارش‌ها دوباره وارد حساب شو.");
        }

        if (!ordersResponse.ok || !productsResponse.ok) {
          throw new Error("دریافت اطلاعات جست‌وجو ناموفق بود.");
        }

        const ordersData = await ordersResponse.json();
        const productsData = await productsResponse.json();

        const orders = getList(ordersData, "orders");
        const products = getList(productsData, "products");
        const normalizedQuery = searchText.toLocaleLowerCase();

        const orderResults = orders
          .filter((order) => {
            const searchableValues = [
              order._id,
              order.id,
              order.orderNumber,
              order.user?.name,
              order.user?.email,
              order.status,
            ];

            return searchableValues.some((value) =>
              String(value ?? "")
                .toLocaleLowerCase()
                .includes(normalizedQuery)
            );
          })
          .slice(0, 5)
          .map((order) => ({
            id: String(order._id ?? order.id ?? order.orderNumber),
            title: order.user?.name || `سفارش ${String(order._id ?? order.id).slice(-6)}`,
            subtitle: order.user?.email || order.status || "سفارش",
            type: "order",
            href: "/Orders",
          }));

        const productResults = products
          .filter((product) =>
            [
              product.title,
              product.name,
              product.category,
              product._id,
              product.id,
            ].some((value) =>
              String(value ?? "")
                .toLocaleLowerCase()
                .includes(normalizedQuery)
            )
          )
          .slice(0, 5)
          .map((product) => ({
            id: String(product._id ?? product.id),
            title: product.title || product.name || "محصول بدون نام",
            subtitle: product.category || "محصول",
            type: "product",
            href: "/Products",
          }));

        if (!cancelled) {
          setResults([...orderResults, ...productResults].slice(0, 8));
        }
      } catch (err) {
        if (!cancelled) {
          setResults([]);
          setError(err.message || "خطایی در جست‌وجو رخ داد.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, apiUrl]);

  return (
    <div className={styles.SearchContainer}>
      <div className={styles.SearchBox}>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Search products, orders, or customers..."
          aria-label="Search products, orders, or customers"
          aria-expanded={open && query.trim().length >= 2}
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            className={styles.ClearSearch}
            onClick={() => {
              setQuery("");
              setResults([]);
              setError("");
              setOpen(false);
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className={styles.SearchResults}>
          {loading && <p className={styles.SearchMessage}>Searching...</p>}

          {!loading && error && (
            <p className={styles.SearchError}>{error}</p>
          )}

          {!loading && !error && results.length === 0 && (
            <p className={styles.SearchMessage}>No results found.</p>
          )}

          {!loading &&
            !error &&
            results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.href}
                className={styles.SearchResult}
                onClick={() => setOpen(false)}
              >
                <span className={styles.ResultIcon}>
                  {result.type === "order" ? "📦" : "🛍️"}
                </span>

                <span className={styles.ResultText}>
                  <strong>{result.title}</strong>
                  <small>{result.subtitle}</small>
                </span>

                <span className={styles.ResultType}>
                  {result.type === "order" ? "Order" : "Product"}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
