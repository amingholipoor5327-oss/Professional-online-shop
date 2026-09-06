import mongoose from "mongoose";

const Orderrequest = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },
        paymentMethod: {
        type: String,
        default: "online",
    }, 
    },

    cart: [
      {
        id: {
          type: Number,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        rating: {
          rate: {
            type: Number,
            required: true,
          },

          count: {
            type: Number,
            required: true,
            min: 1,
          },
        },

        count: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalprice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
    },

    timecount: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||mongoose.model("Order", Orderrequest);