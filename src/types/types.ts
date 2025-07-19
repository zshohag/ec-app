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
