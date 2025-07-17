// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true }, // Optional: could use _id instead
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   images: [{ type: String }],
//   category: { type: String, required: true },
//   description: { type: String },
//   features: [{ type: String }],
//   rating: { type: Number, default: 0 },
//   reviews: { type: Number, default: 0 },
//   inStock: { type: Boolean, default: true },
//   badge: { type: String }, // e.g., "Best Seller"
// }, {
//   timestamps: true,
// });

// export default mongoose.models.Product || mongoose.model("Product", productSchema);

// src/models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    description: { type: String },
    features: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    badge: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);

// import mongoose, { Schema } from "mongoose";

// const productSchema = new Schema({
//   name: String,
//   price: Number,
//   images: [String],
//   category: String,
//   description: String,
//   features: [String],
//   rating: Number,
//   reviews: Number,
//   inStock: Boolean,
//   badge: String,
// });

// export default mongoose.models.Product || mongoose.model("Product", productSchema);
