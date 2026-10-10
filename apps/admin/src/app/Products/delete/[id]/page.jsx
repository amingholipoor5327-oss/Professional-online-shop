 import Link from "next/link";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import DeleteClient from "./deleteClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const dynamic = "force-dynamic";

export default async function DeleteItem({ params }) {
  const { id } = await params;

  let product;

  try {
    const res = await fetch(
      `${API_URL}/api/products/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    product = await res.json();

    if (!product || typeof product !== "object" || Array.isArray(product)) {
      throw new Error("Invalid product response");
    }
  } catch (error) {
    console.error("Fetch product for deletion failed:", error);

    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "40px 20px",
          background: "#0b1020",
          color: "#e5e7eb",
        }}
      >
        <Link
          href="/Products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#a5b4fc",
            textDecoration: "none",
          }}
        >
          <FaArrowLeft />
          Back to Products
        </Link>

        <section style={{ marginTop: "50px", textAlign: "center" }}>
          <FaBoxOpen size={42} color="#f87171" />
          <h2>Product Not Found</h2>
          <p style={{ color: "#9ca3af" }}>
            محصول پیدا نشد یا ارتباط با API برقرار نیست.
          </p>
        </section>
      </main>
    );
  }

  return <DeleteClient product={product} />;
}
 