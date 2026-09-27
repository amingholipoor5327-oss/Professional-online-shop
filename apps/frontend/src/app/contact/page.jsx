"use client";

import { useState } from "react";
import styles from "../component/css/Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className={styles.container}>

       <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>✉️ ارتباط با ما</span>

          <h1>
            با ما در <span>ارتباط باشید</span>
          </h1>

          <p>
            اگر سوالی درباره محصولات، سفارش یا نحوه استفاده از فروشگاه
            دارید، می‌توانید از طریق فرم زیر با ما در ارتباط باشید.
          </p>
        </div>
      </section>


       <section className={styles.contactSection}>

         <div className={styles.info}>

          <span className={styles.sectionLabel}>
            CONTACT US
          </span>

          <h2>
            چطور می‌توانیم کمکتان کنیم؟
          </h2>

          <p className={styles.description}>
            پیام خود را برای ما ارسال کنید. تلاش می‌کنیم در سریع‌ترین
            زمان ممکن درخواست شما را بررسی کنیم.
          </p>


          <div className={styles.infoList}>

            <div className={styles.infoCard}>
              <div className={styles.icon}>
                📧
              </div>

              <div>
                <h3>ایمیل</h3>
                <p>amingholipour5327@gmail.com</p>
              </div>
            </div>


            <div className={styles.infoCard}>
              <div className={styles.icon}>
                📱
              </div>

              <div>
                <h3>تلفن</h3>
                <p>09026815327</p>
              </div>
            </div>


            <div className={styles.infoCard}>
              <div className={styles.icon}>
                🛍️
              </div>

              <div>
                <h3>پشتیبانی فروشگاه</h3>
                <p>
                  سوالی درباره سفارش خود دارید؟ با ما در ارتباط باشید.
                </p>
              </div>
            </div>

          </div>
        </div>


         <div className={styles.formCard}>

          <h2>ارسال پیام</h2>

          <p>
            فرم زیر را تکمیل کنید.
          </p>

          {submitted && (
            <div className={styles.success}>
              ✅ پیام شما با موفقیت ارسال شد.
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className={styles.formGrid}>

              <div className={styles.field}>
                <label>نام و نام خانوادگی</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="نام خود را وارد کنید"
                  required
                />
              </div>


              <div className={styles.field}>
                <label>ایمیل</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                />
              </div>

            </div>


            <div className={styles.field}>
              <label>موضوع</label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="موضوع پیام"
                required
              />
            </div>


            <div className={styles.field}>
              <label>پیام شما</label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="پیام خود را بنویسید..."
                rows="6"
                required
              />
            </div>


            <button
              type="submit"
              className={styles.submitButton}
            >
              ارسال پیام
            </button>

          </form>
        </div>

      </section>


       <section className={styles.faq}>

        <span className={styles.sectionLabel}>
          FAQ
        </span>

        <h2>سوالات متداول</h2>

        <div className={styles.faqGrid}>

          <div className={styles.faqItem}>
            <h3>چطور سفارش خودم را ثبت کنم؟</h3>
            <p>
              محصول موردنظر را به سبد خرید اضافه کنید و پس از تکمیل
              اطلاعات، سفارش خود را ثبت کنید.
            </p>
          </div>


          <div className={styles.faqItem}>
            <h3>آیا امکان پرداخت در محل وجود دارد؟</h3>
            <p>
              در صورت فعال بودن این گزینه، می‌توانید هنگام ثبت سفارش
              روش پرداخت در محل را انتخاب کنید.
            </p>
          </div>


          <div className={styles.faqItem}>
            <h3>چطور با پشتیبانی تماس بگیرم؟</h3>
            <p>
              می‌توانید از طریق اطلاعات تماس یا فرم همین صفحه پیام
              خود را برای ما ارسال کنید.
            </p>
          </div>


          <div className={styles.faqItem}>
            <h3>آیا می‌توانم درباره محصولات سوال بپرسم؟</h3>
            <p>
              بله، سوال خود درباره محصولات را از طریق فرم تماس برای
              ما ارسال کنید.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}