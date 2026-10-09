
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { connectDB } from "@/lib/mongodb";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { DEFAULT_SETTINGS } from "@/lib/settings-defaults";
import StoreSettings from "@/models/StoreSettings";

export const dynamic = "force-dynamic";

function jsonError(message, status) {
  return NextResponse.json({ message }, { status });
}

function unauthorized() {
  return jsonError("Unauthorized", 401);
}

async function authorizeAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await verifySessionToken(token);

  const allowedEmail = process.env.ADMIN_EMAIL
    ?.trim()
    .toLowerCase();

  const sessionEmail =
    typeof session?.email === "string"
      ? session.email.trim().toLowerCase()
      : "";

  if (
    !sessionEmail ||
    !allowedEmail ||
    sessionEmail !== allowedEmail
  ) {
    return null;
  }

  return sessionEmail;
}

function validString(value, maxLength) {
  return (
    typeof value === "string" &&
    value.length <= maxLength
  );
}

function validOptionalUrl(value) {
  if (!validString(value, 2048)) return false;
  if (!value.trim()) return true;

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function validateSettings(input) {
  if (!isPlainObject(input)) return false;

  const { store, appearance, notifications, commerce, security } =
    input;

  if (
    !isPlainObject(store) ||
    !isPlainObject(appearance) ||
    !isPlainObject(notifications) ||
    !isPlainObject(commerce) ||
    !isPlainObject(commerce.payments) ||
    !isPlainObject(security)
  ) {
    return false;
  }

  const storeStrings = [
    ["storeName", 100],
    ["description", 1000],
    ["supportEmail", 254],
    ["phone", 30],
    ["address", 500],
  ];

  for (const [key, maxLength] of storeStrings) {
    if (!validString(store[key], maxLength)) {
      return false;
    }
  }

  if (!store.storeName.trim()) return false;

  if (
    store.supportEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      store.supportEmail
    )
  ) {
    return false;
  }

  for (const key of [
    "logoUrl",
    "instagram",
    "telegram",
    "x",
  ]) {
    if (!validOptionalUrl(store[key])) {
      return false;
    }
  }

  if (!["dark", "light", "system"].includes(appearance.theme)) {
    return false;
  }

  if (!["en", "fa"].includes(appearance.language)) {
    return false;
  }

  if (!["ltr", "rtl"].includes(appearance.direction)) {
    return false;
  }

  if (typeof appearance.compactMode !== "boolean") {
    return false;
  }

  if (![10, 20, 50, 100].includes(appearance.itemsPerPage)) {
    return false;
  }

  for (const key of [
    "newOrder",
    "orderStatusChanged",
    "lowStock",
    "emailEnabled",
  ]) {
    if (typeof notifications[key] !== "boolean") {
      return false;
    }
  }

  if (!["IRR", "USD", "EUR", "GBP"].includes(commerce.currency)) {
    return false;
  }

  const allowedTimezones = [
    "Asia/Tehran",
    "UTC",
    "Europe/London",
    "America/New_York",
  ];

  if (
    typeof commerce.timezone !== "string" ||
    !allowedTimezones.includes(commerce.timezone)
  ) {
    return false;
  }

  for (const key of [
    "lowStockThreshold",
    "minimumOrderAmount",
    "shippingFee",
  ]) {
    const value = commerce[key];

    if (
      typeof value !== "number" ||
      !Number.isFinite(value) ||
      value < 0
    ) {
      return false;
    }
  }

  if (commerce.lowStockThreshold > 100000) {
    return false;
  }

  if (
    typeof commerce.payments.online !== "boolean" ||
    typeof commerce.payments.cashOnDelivery !== "boolean"
  ) {
    return false;
  }

  if (
    ![30, 60, 120, 240, 480].includes(
      security.sessionTimeoutMinutes
    )
  ) {
    return false;
  }

  return true;
}

function flattenSettings(settings) {
  const result = {};

  for (const group of [
    "store",
    "appearance",
    "notifications",
    "commerce",
    "security",
  ]) {
    for (const [key, value] of Object.entries(settings[group])) {
      if (group === "commerce" && key === "payments") {
        for (const [paymentKey, paymentValue] of Object.entries(
          value
        )) {
          result[`commerce.payments.${paymentKey}`] =
            paymentValue;
        }
      } else {
        result[`${group}.${key}`] = value;
      }
    }
  }

  return result;
}

function serializeSettings(document) {
  if (!document) {
    return DEFAULT_SETTINGS;
  }

  const value = document.toObject
    ? document.toObject()
    : document;

  return {
    store: {
      ...DEFAULT_SETTINGS.store,
      ...value.store,
    },

    appearance: {
      ...DEFAULT_SETTINGS.appearance,
      ...value.appearance,
    },

    notifications: {
      ...DEFAULT_SETTINGS.notifications,
      ...value.notifications,
    },

    commerce: {
      ...DEFAULT_SETTINGS.commerce,
      ...value.commerce,
      payments: {
        ...DEFAULT_SETTINGS.commerce.payments,
        ...value.commerce?.payments,
      },
    },

    security: {
      ...DEFAULT_SETTINGS.security,
      ...value.security,
    },
  };
}

export async function GET() {
  try {
    const email = await authorizeAdmin();

    if (!email) {
      return unauthorized();
    }

    await connectDB();

    const document = await StoreSettings.findOne({
      key: "main",
    }).lean();

    return NextResponse.json({
      settings: serializeSettings(document),
      system: {
        database: "connected",
        updatedAt: document?.updatedAt ?? null,
      },
    });
  } catch (error) {
    console.error("GET /api/settings:", error);

    return jsonError("Could not load settings", 500);
  }
}

export async function PUT(request) {
  try {
    const email = await authorizeAdmin();

    if (!email) {
      return unauthorized();
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return jsonError("Invalid JSON body", 400);
    }

    if (!validateSettings(body?.settings)) {
      return jsonError("Invalid settings data", 400);
    }

    await connectDB();

    const update = flattenSettings(body.settings);

    const document = await StoreSettings.findOneAndUpdate(
      { key: "main" },
      {
        $set: {
          ...update,
          updatedBy: email,
        },
        $setOnInsert: {
          key: "main",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json({
      message: "Settings saved successfully",
      settings: serializeSettings(document),
    });
  } catch (error) {
    console.error("PUT /api/settings:", error);

    return jsonError("Could not save settings", 500);
  }
}
