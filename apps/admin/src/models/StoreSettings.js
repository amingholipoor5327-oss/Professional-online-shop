
import mongoose from "mongoose";

const StoreSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "main",
      unique: true,
      required: true,
    },
    store: {
      storeName: { type: String, default: "Amin Store", maxlength: 100 },
      description: { type: String, default: "", maxlength: 1000 },
      logoUrl: { type: String, default: "", maxlength: 2048 },
      supportEmail: { type: String, default: "", maxlength: 254 },
      phone: { type: String, default: "", maxlength: 30 },
      address: { type: String, default: "", maxlength: 500 },
      instagram: { type: String, default: "", maxlength: 2048 },
      telegram: { type: String, default: "", maxlength: 2048 },
      x: { type: String, default: "", maxlength: 2048 },
    },
    appearance: {
      theme: {
        type: String,
        enum: ["dark", "light", "system"],
        default: "dark",
      },
      language: {
        type: String,
        enum: ["en", "fa"],
        default: "en",
      },
      direction: {
        type: String,
        enum: ["ltr", "rtl"],
        default: "ltr",
      },
      compactMode: { type: Boolean, default: false },
      itemsPerPage: {
        type: Number,
        enum: [10, 20, 50, 100],
        default: 10,
      },
    },
    notifications: {
      newOrder: { type: Boolean, default: true },
      orderStatusChanged: { type: Boolean, default: true },
      lowStock: { type: Boolean, default: true },
      emailEnabled: { type: Boolean, default: false },
    },
    commerce: {
      currency: {
        type: String,
        enum: ["IRR", "USD", "EUR", "GBP"],
        default: "IRR",
      },
      timezone: {
        type: String,
        default: "Asia/Tehran",
      },
      lowStockThreshold: {
        type: Number,
        default: 5,
        min: 0,
        max: 100000,
      },
      minimumOrderAmount: {
        type: Number,
        default: 0,
        min: 0,
      },
      shippingFee: {
        type: Number,
        default: 0,
        min: 0,
      },
      payments: {
        online: { type: Boolean, default: true },
        cashOnDelivery: { type: Boolean, default: false },
      },
    },
    security: {
      sessionTimeoutMinutes: {
        type: Number,
        enum: [30, 60, 120, 240, 480],
        default: 480,
      },
    },
    updatedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "store_settings" }
);

export default mongoose.models.StoreSettings ||
  mongoose.model("StoreSettings", StoreSettingsSchema);
