 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaBan } from "react-icons/fa";
import styles from "../component/css/Orders.module.css";

export default function OrderActions({ orderId, status }) {
  const router = useRouter();

  const [loadingca, setLoadingca] = useState(false);
  const [loadingde, setLoadingde] = useState(false);

  const isLoading = loadingca || loadingde;

  async function handleCancel() {
    if (isLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    setLoadingca(true);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          status: "cancelled",
        }),
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.status}`);
      }

      router.refresh();
    } catch (error) {
      console.error("Cancel order error:", error);
      window.alert("Could not cancel the order. Check your API.");
    } finally {
      setLoadingca(false);
    }
  }

  async function handleDelete() {
    if (isLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this order?"
    );

    if (!confirmed) return;

    setLoadingde(true);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.status}`);
      }

      router.refresh();
    } catch (error) {
      console.error("Delete order error:", error);
      window.alert("Could not delete the order. Check your API.");
    } finally {
      setLoadingde(false);
    }
  }

  return (
    <div className={styles.Actions}>
      <button
        type="button"
        className={styles.CancelButton}
        onClick={handleCancel}
        disabled={isLoading}
      >
        <FaBan />
        {loadingca ? "Cancelling..." : "Cancel"}
      </button>

      <button
        type="button"
        className={styles.DeleteButton}
        onClick={handleDelete}
        disabled={isLoading}
      >
        <FaTrash />
        {loadingde ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
 