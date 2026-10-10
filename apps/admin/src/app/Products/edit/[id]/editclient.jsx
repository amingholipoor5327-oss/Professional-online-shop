 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import styles from "../../../component/css/editproduct.module.css";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function EditClient({ product }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: product?.title ?? "",
    price: product?.price ?? "",
    image: product?.image ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "men's clothing",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleInput(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const id = product?.id ?? product?._id;

      if (!id) {
        throw new Error("Product ID not found");
      }

      const response = await fetch(
        `${API_URL}/api/products/${encodeURIComponent(String(id))}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      router.push("/Products");
      router.refresh();
    } catch (err) {
      console.error("Update product error:", err);
      setError("ذخیره تغییرات ناموفق بود. اتصال API را بررسی کن.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.Container}>
      <header className={styles.PageHeader}>
        <div>
          <span className={styles.Eyebrow}>STORE MANAGEMENT</span>
          <h1 className={styles.PageTitle}>Edit Product</h1>
          <p className={styles.Subtitle}>
            Update your product information.
          </p>
        </div>
      </header>

      <form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.FormHeader}>
          <h2 className={styles.FormTitle}>Product Information</h2>
          <p className={styles.FormSubtitle}>
            Edit the fields below and save your changes.
          </p>
        </div>

        <div className={styles.Field}>
          <label className={styles.Label} htmlFor="title">
            Product Title
          </label>

          <input
            id="title"
            className={styles.Input}
            type="text"
            name="title"
            value={form.title}
            onChange={handleInput}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className={styles.Field}>
          <label className={styles.Label} htmlFor="price">
            Price
          </label>

          <input
            id="price"
            className={styles.Input}
            type="number"
            name="price"
            value={form.price}
            onChange={handleInput}
            placeholder="Enter product price"
            min="0"
            step="any"
            required
          />
        </div>

        <div className={styles.Field}>
          <label className={styles.Label} htmlFor="image">
            Image URL
          </label>

          <input
            id="image"
            className={styles.Input}
            type="url"
            name="image"
            value={form.image}
            onChange={handleInput}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {form.image && (
          <div className={styles.ImagePreview}>
            <span className={styles.Label}>Image Preview</span>

            <img
              src={form.image}
              alt={form.title || "Product preview"}
              className={styles.PreviewImage}
            />
          </div>
        )}

        <div className={styles.Field}>
          <label className={styles.Label} htmlFor="category">
            Category
          </label>

          <select
            id="category"
            className={styles.Select}
            name="category"
            value={form.category}
            onChange={handleInput}
            required
          >
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelry">Jewelry</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <div className={styles.Field}>
          <label className={styles.Label} htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            className={styles.Textarea}
            name="description"
            value={form.description}
            onChange={handleInput}
            placeholder="Enter product description"
            rows={5}
          />
        </div>

        {error && (
          <p className={styles.Error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.Actions}>
          <button
            className={styles.SubmitBtn}
            type="submit"
            disabled={loading}
          >
            <FaSave />
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <Link href="/Products" className={styles.back}>
            <FaArrowLeft />
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
 