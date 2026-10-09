"use client";

import { useEffect, useState } from "react";
import { useStoreSettings } from "../component/SettingsProvider/SettingsProvider";

import {
  FaStore,
  FaBell,
  FaPalette,
  FaCreditCard,
  FaShieldAlt,
  FaSave,
  FaUndo,
} from "react-icons/fa";

import { DEFAULT_SETTINGS } from "@/lib/settings-defaults";
import styles from "../component/css/Settings.module.css";

const cloneDefaults = () => JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

function mergeSettings(received = {}) {
  const defaults = cloneDefaults();

  return {
    ...defaults,
    ...received,
    store: { ...defaults.store, ...(received.store || {}) },
    appearance: {
      ...defaults.appearance,
      ...(received.appearance || {}),
    },
    notifications: {
      ...defaults.notifications,
      ...(received.notifications || {}),
    },
    commerce: {
      ...defaults.commerce,
      ...(received.commerce || {}),
      payments: {
        ...defaults.commerce.payments,
        ...(received.commerce?.payments || {}),
      },
    },
    security: {
      ...defaults.security,
      ...(received.security || {}),
    },
  };
}

const translations = {
  en: {
    loading: "Loading settings...",
    eyebrow: "STORE ADMINISTRATION",
    title: "Settings",
    subtitle:
      "Manage your store information, appearance, notifications, and checkout options.",
    storeInfo: "Store Information",
    storeInfoDesc: "Manage your store details and contact information.",
    storeName: "Store Name",
    logoUrl: "Logo URL",
    supportEmail: "Support Email",
    phone: "Phone Number",
    address: "Store Address",
    instagram: "Instagram URL",
    telegram: "Telegram URL",
    x: "X URL",
    description: "Description",
    descriptionPlaceholder: "Tell customers about your store",
    appearance: "Appearance and Language",
    appearanceDesc: "Choose your preferred admin interface settings.",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    system: "System",
    language: "Language",
    english: "English",
    persian: "Persian",
    direction: "Text Direction",
    ltr: "Left to Right",
    rtl: "Right to Left",
    itemsPerPage: "Items Per Page",
    compact: "Compact Mode",
    compactDesc: "Use less spacing between interface elements.",
    notifications: "Notifications",
    notificationsDesc: "Manage your notification preferences.",
    newOrder: "New Orders",
    newOrderDesc: "Track newly created orders.",
    orderStatus: "Order Status Changes",
    orderStatusDesc: "Track order status updates.",
    lowStock: "Low Stock Alerts",
    lowStockDesc: "Enable alerts for low product inventory.",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc:
      "Enable email notifications when an email provider is configured.",
    ordersPayments: "Orders and Payments",
    ordersPaymentsDesc: "Configure your default checkout preferences.",
    currency: "Currency",
    irr: "Iranian Rial (IRR)",
    usd: "US Dollar (USD)",
    eur: "Euro (EUR)",
    gbp: "British Pound (GBP)",
    minimumOrder: "Minimum Order Amount",
    shippingFee: "Shipping Fee",
    onlinePayment: "Online Payment",
    cashOnDelivery: "Cash on Delivery",
    paymentHint:
      "Payment methods and pricing preferences must also be connected to your checkout logic to enforce them.",
    reset: "Reset Form",
    save: "Save Settings",
    saving: "Saving...",
    saved: "Settings saved successfully.",
    confirmReset: "Restore all settings to their default values?",
    sessionExpired: "Your session has expired. Please sign in again.",
    loadError: "Could not load settings.",
    saveError: "Could not save settings.",
    unexpected: "An unexpected error occurred.",
  },

  fa: {
    loading: "در حال بارگذاری تنظیمات...",
    eyebrow: "مدیریت فروشگاه",
    title: "تنظیمات",
    subtitle:
      "اطلاعات فروشگاه، ظاهر پنل، اعلان‌ها و گزینه‌های پرداخت را مدیریت کنید.",
    storeInfo: "اطلاعات فروشگاه",
    storeInfoDesc: "اطلاعات فروشگاه و راه‌های ارتباطی را مدیریت کنید.",
    storeName: "نام فروشگاه",
    logoUrl: "آدرس لوگو",
    supportEmail: "ایمیل پشتیبانی",
    phone: "شماره تلفن",
    address: "آدرس فروشگاه",
    instagram: "آدرس اینستاگرام",
    telegram: "آدرس تلگرام",
    x: "آدرس ایکس",
    description: "توضیحات",
    descriptionPlaceholder: "درباره فروشگاه خود به مشتریان توضیح دهید",
    appearance: "ظاهر و زبان",
    appearanceDesc: "تنظیمات ظاهری پنل مدیریت را انتخاب کنید.",
    theme: "قالب ظاهری",
    dark: "تاریک",
    light: "روشن",
    system: "مطابق تنظیمات سیستم",
    language: "زبان",
    english: "انگلیسی",
    persian: "فارسی",
    direction: "جهت نوشتار",
    ltr: "چپ به راست",
    rtl: "راست به چپ",
    itemsPerPage: "تعداد موارد در هر صفحه",
    compact: "حالت فشرده",
    compactDesc: "فاصله بین عناصر صفحه را کمتر کنید.",
    notifications: "اعلان‌ها",
    notificationsDesc: "تنظیمات اعلان‌های فروشگاه را مدیریت کنید.",
    newOrder: "سفارش‌های جدید",
    newOrderDesc: "سفارش‌های تازه ثبت‌شده را پیگیری کنید.",
    orderStatus: "تغییر وضعیت سفارش",
    orderStatusDesc: "تغییرات وضعیت سفارش‌ها را پیگیری کنید.",
    lowStock: "هشدار کمبود موجودی",
    lowStockDesc: "برای کم‌شدن موجودی محصولات هشدار دریافت کنید.",
    emailNotifications: "اعلان‌های ایمیلی",
    emailNotificationsDesc:
      "در صورت پیکربندی سرویس ایمیل، اعلان‌های ایمیلی فعال می‌شوند.",
    ordersPayments: "سفارش‌ها و پرداخت‌ها",
    ordersPaymentsDesc: "تنظیمات پیش‌فرض ثبت سفارش و پرداخت را مشخص کنید.",
    currency: "واحد پول",
    irr: "ریال ایران (IRR)",
    usd: "دلار آمریکا (USD)",
    eur: "یورو (EUR)",
    gbp: "پوند بریتانیا (GBP)",
    minimumOrder: "حداقل مبلغ سفارش",
    shippingFee: "هزینه ارسال",
    onlinePayment: "پرداخت آنلاین",
    cashOnDelivery: "پرداخت در محل",
    paymentHint:
      "برای اعمال واقعی روش‌های پرداخت و هزینه‌ها، باید آن‌ها را به منطق ثبت سفارش نیز متصل کنید.",
    reset: "بازنشانی فرم",
    save: "ذخیره تنظیمات",
    saving: "در حال ذخیره...",
    saved: "تنظیمات با موفقیت ذخیره شد.",
    confirmReset: "همه تنظیمات به مقادیر پیش‌فرض بازگردند؟",
    sessionExpired: "نشست شما منقضی شده است. لطفاً دوباره وارد شوید.",
    loadError: "بارگذاری تنظیمات انجام نشد.",
    saveError: "ذخیره تنظیمات انجام نشد.",
    unexpected: "خطای غیرمنتظره‌ای رخ داد.",
  },
};

export default function SettingsPage() {
  const { setSettings: setGlobalSettings } = useStoreSettings();

  const [settings, setSettings] = useState(cloneDefaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isPersian = settings.appearance.language === "fa";
  const t = translations[isPersian ? "fa" : "en"];

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const response = await fetch("/api/settings", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? translations.en.sessionExpired
              : data.message || translations.en.loadError
          );
        }

        if (!cancelled) {
          const loadedSettings = mergeSettings(data.settings);
          setSettings(loadedSettings);
          setGlobalSettings(loadedSettings);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || translations.en.loadError);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, [setGlobalSettings]);

  function update(group, key, value) {
    setSettings((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [key]: value,
      },
    }));

    setMessage("");
    setError("");
  }

  function updatePayment(key, value) {
    setSettings((current) => ({
      ...current,
      commerce: {
        ...current.commerce,
        payments: {
          ...current.commerce.payments,
          [key]: value,
        },
      },
    }));

    setMessage("");
    setError("");
  }

  async function saveSettings(event) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ settings }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.saveError);
      }

      const savedSettings = mergeSettings(data.settings || settings);

      setSettings(savedSettings);
      setGlobalSettings(savedSettings);

      const savedLanguage =
        savedSettings.appearance.language === "fa" ? "fa" : "en";

      setMessage(translations[savedLanguage].saved);
    } catch (err) {
      setError(err.message || t.unexpected);
    } finally {
      setSaving(false);
    }
  }

  function resetSettings() {
    if (!window.confirm(t.confirmReset)) {
      return;
    }

    const defaults = cloneDefaults();

    setSettings(defaults);
    setGlobalSettings(defaults);
    setMessage("");
    setError("");
  }

  if (loading) {
    return (
      <main className={styles.Container} dir="ltr">
        <p className={styles.Loading}>{t.loading}</p>
      </main>
    );
  }

  const storeFields = [
    ["storeName", t.storeName, "Amin Store"],
    ["logoUrl", t.logoUrl, "https://example.com/logo.png"],
    ["supportEmail", t.supportEmail, "support@example.com"],
    ["phone", t.phone, "+98..."],
    ["address", t.address, "Street, city, country"],
    ["instagram", t.instagram, "https://instagram.com/..."],
    ["telegram", t.telegram, "https://t.me/..."],
    ["x", t.x, "https://x.com/..."],
  ];

  const notificationFields = [
    ["newOrder", t.newOrder, t.newOrderDesc],
    ["orderStatusChanged", t.orderStatus, t.orderStatusDesc],
    ["lowStock", t.lowStock, t.lowStockDesc],
    ["emailEnabled", t.emailNotifications, t.emailNotificationsDesc],
  ];

  return (
    <main
      className={styles.Container}
      dir="ltr"
      lang={settings.appearance.language}
    >
      <header className={styles.PageHeader}>
        <div>
          <span className={styles.Eyebrow}>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className={styles.HeaderIcon}>
          <FaShieldAlt />
        </div>
      </header>

      {error && (
        <p className={styles.Message} role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className={styles.Message} role="status">
          {message}
        </p>
      )}

      <form onSubmit={saveSettings}>
        <section className={styles.SettingsCard}>
          <div className={styles.SectionHeader}>
            <div className={styles.SectionIcon}>
              <FaStore />
            </div>

            <div>
              <h2>{t.storeInfo}</h2>
              <p>{t.storeInfoDesc}</p>
            </div>
          </div>

          <div className={styles.FieldsGrid}>
            {storeFields.map(([key, label, placeholder]) => (
              <label className={styles.Field} key={key}>
                <span>{label}</span>

                <input
                  type={key === "supportEmail" ? "email" : "text"}
                  value={settings.store[key] ?? ""}
                  onChange={(e) =>
                    update("store", key, e.target.value)
                  }
                  placeholder={placeholder}
                  required={key === "storeName"}
                />
              </label>
            ))}

            <label className={styles.Field}>
              <span>{t.description}</span>

              <textarea
                value={settings.store.description ?? ""}
                onChange={(e) =>
                  update("store", "description", e.target.value)
                }
                rows={3}
                placeholder={t.descriptionPlaceholder}
              />
            </label>
          </div>
        </section>

        <section className={styles.SettingsCard}>
          <div className={styles.SectionHeader}>
            <div className={styles.SectionIcon}>
              <FaPalette />
            </div>

            <div>
              <h2>{t.appearance}</h2>
              <p>{t.appearanceDesc}</p>
            </div>
          </div>

          <div className={styles.FieldsGrid}>
            <label className={styles.Field}>
              <span>{t.theme}</span>

              <select
                value={settings.appearance.theme}
                onChange={(e) =>
                  update("appearance", "theme", e.target.value)
                }
              >
                <option value="dark">{t.dark}</option>
                <option value="light">{t.light}</option>
                <option value="system">{t.system}</option>
              </select>
            </label>

            <label className={styles.Field}>
              <span>{t.language}</span>

              <select
                value={settings.appearance.language}
                onChange={(e) =>
                  update("appearance", "language", e.target.value)
                }
              >
                <option value="en">{t.english}</option>
                <option value="fa">{t.persian}</option>
              </select>
            </label>

            <label className={styles.Field}>
              <span>{t.direction}</span>

              <select
                value={settings.appearance.direction}
                onChange={(e) =>
                  update("appearance", "direction", e.target.value)
                }
              >
                <option value="ltr">{t.ltr}</option>
                <option value="rtl">{t.rtl}</option>
              </select>
            </label>

            <label className={styles.Field}>
              <span>{t.itemsPerPage}</span>

              <select
                value={settings.appearance.itemsPerPage}
                onChange={(e) =>
                  update(
                    "appearance",
                    "itemsPerPage",
                    Number(e.target.value)
                  )
                }
              >
                {[10, 20, 50, 100].map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={styles.ToggleRow}>
            <div>
              <strong>{t.compact}</strong>
              <small>{t.compactDesc}</small>
            </div>

            <input
              type="checkbox"
              checked={Boolean(settings.appearance.compactMode)}
              onChange={(e) =>
                update("appearance", "compactMode", e.target.checked)
              }
            />
          </label>
        </section>

        <section className={styles.SettingsCard}>
          <div className={styles.SectionHeader}>
            <div className={styles.SectionIcon}>
              <FaBell />
            </div>

            <div>
              <h2>{t.notifications}</h2>
              <p>{t.notificationsDesc}</p>
            </div>
          </div>

          {notificationFields.map(([key, title, description]) => (
            <label className={styles.ToggleRow} key={key}>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>

              <input
                type="checkbox"
                checked={Boolean(settings.notifications[key])}
                onChange={(e) =>
                  update("notifications", key, e.target.checked)
                }
              />
            </label>
          ))}
        </section>

        <section className={styles.SettingsCard}>
          <div className={styles.SectionHeader}>
            <div className={styles.SectionIcon}>
              <FaCreditCard />
            </div>

            <div>
              <h2>{t.ordersPayments}</h2>
              <p>{t.ordersPaymentsDesc}</p>
            </div>
          </div>

          <div className={styles.FieldsGrid}>
            <label className={styles.Field}>
              <span>{t.currency}</span>

              <select
                value={settings.commerce.currency}
                onChange={(e) =>
                  update("commerce", "currency", e.target.value)
                }
              >
                <option value="IRR">{t.irr}</option>
                <option value="USD">{t.usd}</option>
                <option value="EUR">{t.eur}</option>
                <option value="GBP">{t.gbp}</option>
              </select>
            </label>

            <label className={styles.Field}>
              <span>{t.minimumOrder}</span>

              <input
                type="number"
                min="0"
                value={settings.commerce.minimumOrderAmount}
                onChange={(e) =>
                  update(
                    "commerce",
                    "minimumOrderAmount",
                    Number(e.target.value)
                  )
                }
              />
            </label>

            <label className={styles.Field}>
              <span>{t.shippingFee}</span>

              <input
                type="number"
                min="0"
                value={settings.commerce.shippingFee}
                onChange={(e) =>
                  update(
                    "commerce",
                    "shippingFee",
                    Number(e.target.value)
                  )
                }
              />
            </label>
          </div>

          {[
            ["online", t.onlinePayment],
            ["cashOnDelivery", t.cashOnDelivery],
          ].map(([key, title]) => (
            <label className={styles.ToggleRow} key={key}>
              <div>
                <strong>{title}</strong>
              </div>

              <input
                type="checkbox"
                checked={Boolean(settings.commerce.payments[key])}
                onChange={(e) =>
                  updatePayment(key, e.target.checked)
                }
              />
            </label>
          ))}

          <p className={styles.Hint}>{t.paymentHint}</p>
        </section>

        <div className={styles.FormActions}>
          <button
            type="button"
            onClick={resetSettings}
            className={styles.ResetButton}
          >
            <FaUndo /> {t.reset}
          </button>

          <button
            type="submit"
            className={styles.SaveButton}
            disabled={saving}
          >
            <FaSave /> {saving ? t.saving : t.save}
          </button>
        </div>
      </form>
    </main>
  );
}
 