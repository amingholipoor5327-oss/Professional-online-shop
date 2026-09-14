"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import styles from "../../../component/css/newproduct.module.css"
import Link from "next/link"
import { FaArrowLeft} from "react-icons/fa"

export default function EditClient({product}) {
  const router = useRouter()
  const {id} = useParams();

  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price ||"",
    image: product?.image || "",
    description: product?.description ||"",      
    category: product?.category ||  "men's clothing",
  })

  const [loading , setLoading] = useState(false)

  function handleInput(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await fetch(` http://localhost:3001//api/products/${id}` , {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
        console.log(response)
      router.push("/Products")
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Error ❌")
    }finally{
        setLoading(false)
    }
  }

  return (
    <div className={styles.Container}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <h1 className={styles.FormTitle}>Edit product</h1>

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

        <button className={styles.SubmitBtn} type="submit"
        disabled = {loading}
        >
          
          {loading ? "saving..." : "save"}
        </button>

        <Link href={"/Products"} className={styles.back}><FaArrowLeft/> back</Link>
      </form>
    </div>
  )
}