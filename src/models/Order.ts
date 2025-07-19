//models/Order.ts
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String },
});

const ShippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

// Updated OrderSchema to include discount and estimatedDelivery

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number }, // ✅ Optional discount
    shippingAddress: ShippingAddressSchema,
    paymentMethod: { type: String, required: true },
    estimatedDelivery: { type: String }, // ✅ Optional delivery date
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ADD FOR USER ASSOCIATION

  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);


///222222
// models/Order.ts


// import mongoose, { Schema, models, model, Document } from 'mongoose';
// import { CartItem, ShippingAddress, PaymentMethod } from '@/types/types'; 

// // Mongoose Schema for CartItem
// const CartItemSchema = new mongoose.Schema<CartItem>({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   originalPrice: { type: Number },
//   image: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   inStock: { type: Boolean, default: true },
//   category: { type: String },
// }, { _id: false });

// // Mongoose Schema for ShippingAddress
// const ShippingAddressSchema = new mongoose.Schema<ShippingAddress>({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   country: { type: String, required: true },
// }, { _id: false });

// // IOrder ইন্টারফেস - TypeScript টাইপ সেফটির জন্য
// export interface IOrder extends Document {
//   id: string; 
//   user: mongoose.Types.ObjectId; // User মডেলের রেফারেন্স
//   items: CartItem[];
//   total: number;
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   discount?: number; 
//   shippingAddress: ShippingAddress;
//   paymentMethod: PaymentMethod;
//   paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded'; // পেমেন্ট স্ট্যাটাস
//   transactionId?: string; // Stripe Payment Intent ID
//   estimatedDelivery?: string;
//   status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Order Schema
// const OrderSchema = new mongoose.Schema<IOrder>(
//   {
//     id: { type: String, required: true, unique: true },
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     items: { type: [CartItemSchema], required: true },
//     total: { type: Number, required: true },
//     subtotal: { type: Number, required: true },
//     tax: { type: Number, required: true },
//     shipping: { type: Number, required: true },
//     discount: { type: Number },
//     shippingAddress: { type: ShippingAddressSchema, required: true },
//     paymentMethod: {
//       type: String,
//       enum: ["credit_card", "paypal", "apple_pay", "cash_on_delivery"],
//       required: true,
//     },
//     paymentStatus: { 
//       type: String,
//       enum: ['pending', 'succeeded', 'failed', 'refunded'],
//       default: 'pending',
//       required: true,
//     },
//     transactionId: { type: String, unique: true, sparse: true },
//     estimatedDelivery: { type: String },
//     status: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = models.Order || model<IOrder>("Order", OrderSchema);

// export default Order;