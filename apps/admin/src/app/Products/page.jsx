 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../component/css/Products.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/api/products`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid products response");
        }

        setProducts(data);
      } catch (err) {
        console.error("Fetch products error:", err);
        setError("دریافت محصولات با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  function getProductId(product) {
    return product.id ?? product._id;
  }

  function isNew(product) {
    if (!product.createdAt) return false;

    const createdAt = new Date(product.createdAt).getTime();

    if (!Number.isFinite(createdAt)) return false;

    const age = Date.now() - createdAt;

    return age >= 0 && age <= 24 * 60 * 60 * 1000;
  }

  return (
    <main className={styles.Container}>
      <header className={styles.Head}>
        <div>
          <span className={styles.Eyebrow}>STORE MANAGEMENT</span>

          <h1 className={styles.Title}>Products</h1>

          <p className={styles.Subtitle}>
            Manage your products and review their information.
          </p>
        </div>

        <Link href="/Products/new" className={styles.new}>
          + Add Product
        </Link>
      </header>

      <section className={styles.ProductsPanel}>
        <div className={styles.PanelHeader}>
          <h2>All Products</h2>

          <span className={styles.CountBadge}>
            {products.length} Products
          </span>
        </div>

        {loading ? (
          <div className={styles.Empty}>Loading products...</div>
        ) : error ? (
          <div className={styles.Error}>{error}</div>
        ) : products.length === 0 ? (
          <div className={styles.Empty}>
            No products found.
          </div>
        ) : (
          <div className={styles.TableWrapper}>
            <table className={styles.Table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => {
                  const id = getProductId(item);

                  return (
                    <tr key={id}>
                      <td>
                        <div className={styles.ProductName}>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title || "Product"}
                              className={styles.ProductIcon}
                            />
                          ) : (
                            <div className={styles.ProductIcon}>
                              📦
                            </div>
                          )}

                          <div>
                            <strong>
                              {item.title || "Untitled Product"}
                            </strong>

                            <div className={styles.ProductId}>
                              ID: {String(id)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>{item.category || "Uncategorized"}</td>

                      <td>
                        {Number.isFinite(Number(item.price))
                          ? Number(item.price).toLocaleString("en-US")
                          : "-"}
                      </td>

                      <td>
                        {isNew(item) ? (
                          <span className={styles.newBadge}>
                            New
                          </span>
                        ) : (
                          <span className={styles.ExistingBadge}>
                            Existing
                          </span>
                        )}
                      </td>

                      <td>
                        <div className={styles.Actions}>
                          <Link
                            href={`/Products/${encodeURIComponent(String(id))}`}
                            className={styles.ActionBtn}
                          >
                            View Details
                          </Link>

                          <Link
                            href={`/Products/edit/${encodeURIComponent(String(id))}`}
                            className={styles.EditBtn}
                          >
                            Edit
                          </Link>

                          <Link
                            href={`/Products/delete/${encodeURIComponent(String(id))}`}
                            className={styles.DeleteBtn}
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
 