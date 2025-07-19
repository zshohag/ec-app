import { LucideIcon } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  quantity: number;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

// export interface CartItem extends Product {
//   quantity: number
// }

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  inStock?: boolean;
  category?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethodType =
  | string
  | {
      type: string;
      last4?: string;
    };

export interface OrderType {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  shippingAddress: ShippingAddress;
  paymentMethod?: PaymentMethodType;
  status: OrderStatus;
  estimatedDelivery?: string; // ✅ Add this line
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id?: string;
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string; // Optional field for estimated delivery date
  discount?: number; // Optional field for discount amount
}


/////////////////////////////////////


/////////NEW ///////////

///////////////////
// lib/types.ts

// import { LucideIcon } from "lucide-react"; // Category ইন্টারফেসের জন্য




// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   category: string;
//   quantity: number; // This might be for inventory/stock, not cart quantity directly
//   description: string;
//   features: string[];
//   rating: number;
//   reviews: number;
//   inStock: boolean;
//   badge?: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   icon: LucideIcon;
//   count: number; // এই count টি সম্ভবত ওই ক্যাটাগরির প্রোডাক্ট সংখ্যা নির্দেশ করে
// }


// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   quantity: number; // এটি কার্টে থাকা নির্দিষ্ট আইটেমের পরিমাণ
//   inStock?: boolean;
//   category?: string;
// }

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }



// export type OrderStatus =
//   | "pending"
//   | "processing"
//   | "shipped"
//   | "delivered"
//   | "cancelled";

// // পেমেন্ট পদ্ধতির সুনির্দিষ্ট টাইপ (যেমন: ক্রেডিট কার্ড, ক্যাশ অন ডেলিভারি)
// export type PaymentMethod = "credit_card" | "paypal" | "apple_pay" | "cash_on_delivery";

// // Stripe বা অন্যান্য পেমেন্ট গেটওয়ের নির্দিষ্ট তথ্যের জন্য একটি ঐচ্ছিক টাইপ
// // যদি আপনি 'credit_card' এর জন্য card type, last4 digits ইত্যাদি স্টোর করতে চান
// export type PaymentDetails = {
//   type: string; // যেমন 'card'
//   last4?: string; // কার্ডের শেষ ৪ ডিজিট
//   brand?: string; // যেমন 'visa', 'mastercard'
//   // অন্যান্য প্রাসঙ্গিক তথ্য যোগ করা যেতে পারে
// } | null; // অথবা null যদি কোনো বিস্তারিত তথ্য না থাকে


// export interface Order {
//   id: string; // UUID (যেমন uuidv4() থেকে আসে)
//   userId: string; // ব্যবহারকারীর MongoDB _id, ক্লায়েন্ট সাইডে string হিসেবে থাকবে
//   items: CartItem[];
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   total: number;
//   discount?: number; // ঐচ্ছিক ডিসকাউন্ট
//   shippingAddress: ShippingAddress;
//   paymentMethod: PaymentMethod; // পেমেন্ট পদ্ধতি
//   paymentStatus: 'pending' | 'succeeded' | 'failed' | 'refunded'; // পেমেন্টের অবস্থা
//   transactionId?: string; // Stripe Payment Intent ID বা PayPal transaction ID (ঐচ্ছিক)
//   paymentDetails?: PaymentDetails; // পেমেন্টের বিস্তারিত তথ্য (যেমন কার্ডের শেষ ৪ ডিজিট)
//   estimatedDelivery?: string; // আনুমানিক ডেলিভারি তারিখ (ঐচ্ছিক)
//   status: OrderStatus; // অর্ডারের বর্তমান অবস্থা
//   createdAt: string; // ISO Date String
//   updatedAt: string; // ISO Date String
// }


// export interface UserSession {
//   id: string; // MongoDB ObjectId থেকে আসা String
//   email: string;
//   name: string;
//   role: 'user' | 'admin';
//   // অন্যান্য ব্যবহারকারীর বৈশিষ্ট্য যোগ করুন
// }