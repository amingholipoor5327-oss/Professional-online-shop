 export const DEFAULT_SETTINGS = {
  store: {
    storeName: "Amin Store",
    description: "",
    logoUrl: "",
    supportEmail: "",
    phone: "",
    address: "",
    instagram: "",
    telegram: "",
    x: "",
  },

  appearance: {
    theme: "dark",
    language: "en",
    direction: "ltr",
    compactMode: false,
    itemsPerPage: 10,
  },

  notifications: {
    newOrder: true,
    orderStatusChanged: true,
    lowStock: true,
    emailEnabled: false,
  },

  commerce: {
    currency: "IRR",
    timezone: "Asia/Tehran",
    lowStockThreshold: 5,
    minimumOrderAmount: 0,
    shippingFee: 0,

    payments: {
      online: true,
      cashOnDelivery: false,
    },
  },

  security: {
    sessionTimeoutMinutes: 480,
  },
};
 