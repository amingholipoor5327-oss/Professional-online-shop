import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
     id: {                             
      type: Number,
      required: true,
      unique: true, 
   },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    image: {
      type: String,
      required: [true, "Image URL is required"],
    },

     rating: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);