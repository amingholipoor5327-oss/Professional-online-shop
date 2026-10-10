 "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../component/css/newproduct.module.css";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function NewProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "men's clothing",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleInput(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim() || form.price === "") {
      setError("Title and price are required.");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price < 0) {
      setError("Please enter a valid price.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          price,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: HTTP ${res.status}`);
      }

      router.push("/Products");
      router.refresh();
    } catch (err) {
      console.error("Failed to create product:", err);
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h1 className={styles.FormTitle}>Add New Product</h1>

        <input
          className={styles.Input}
          type="text"
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Title"
          required
        />

        <input
          className={styles.Input}
          type="number"
          name="price"
          value={form.price}
          onChange={handleInput}
          placeholder="Price"
          min="0"
          step="any"
          required
        />

        <input
          className={styles.Input}
          type="url"
          name="image"
          value={form.image}
          onChange={handleInput}
          placeholder="Image URL"
        />

        <textarea
          className={styles.Textarea}
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Description"
        />

        <select
          className={styles.Select}
          name="category"
          value={form.category}
          onChange={handleInput}
        >
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelry">Jewelry</option>
          <option value="electronics">Electronics</option>
        </select>

        {error && <p role="alert">{error}</p>}

        <button
          className={styles.SubmitBtn}
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save new product"}
        </button>

        <Link href="/Products" className={styles.back}>
          <FaArrowLeft /> Back
        </Link>
      </form>
    </div>
  );
}
 