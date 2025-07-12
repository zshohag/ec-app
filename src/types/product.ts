// export interface Product {
//   id: string
//   name: string
//   price: number
//   originalPrice?: number
//   image: string
//   category: string
//   description: string
//   features: string[]
//   rating: number
//   reviews: number
//   inStock: boolean
//   badge?: string
// }

// export interface CartItem extends Product {
//   quantity: number
// }

// export type Category = {
//   id: string
//   name: string
//   icon: string
//   count: number
// }

import { LucideIcon } from "lucide-react";

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[] // changed from `image` to `images`
  category: string
  description: string
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  id: string
  name: string
  icon: LucideIcon
  count: number
}
