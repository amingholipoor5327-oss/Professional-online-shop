"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from "../../component/css/newproduct.module.css"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function NewProduct() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",      
    category: "men's clothing",
  })

  function handleInput(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:3001//api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
        console.log(res)
      router.push("/Products")
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Error ❌")
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
        />

        <input
          className={styles.Input}
          type="number"
          name="price"
          value={form.price}
          onChange={handleInput}
          placeholder="Price"
        />

        <input
          className={styles.Input}
          type="text"
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

        <button className={styles.SubmitBtn} type="submit">
          Save New Product
        </button>

        <Link href={"/Products"} className={styles.back}><FaArrowLeft/> back</Link>
      </form>
    </div>
  )
}