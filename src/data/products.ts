// import type { Product, Category } from "../types/product"

// export const categories: Category[] = [
//   { id: "health", name: "Health & Wellness", icon: "🏥", count: 4 },
//   { id: "household", name: "Household Items", icon: "🏠", count: 4 },
//   { id: "gadgets", name: "Tech Gadgets", icon: "📱", count: 4 },
//   { id: "coffee", name: "Coffee Products", icon: "☕", count: 4 },
// ]

// export const products: Product[] = [
//   // Health & Wellness
//   {
//     id: "1",
//     name: "Smart Fitness Tracker Pro",
//     price: 199.99,
//     originalPrice: 249.99,
//     image:
//       "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "health",
//     description: "Advanced fitness tracker with heart rate monitoring, sleep tracking, and 50+ workout modes.",
//     features: ["Heart Rate Monitor", "Sleep Tracking", "50+ Workout Modes", "Water Resistant", "7-Day Battery"],
//     rating: 4.8,
//     reviews: 1247,
//     inStock: true,
//     badge: "Best Seller",
//   },
//   {
//     id: "2",
//     name: "Premium Yoga Mat Set",
//     price: 89.99,
//     originalPrice: 119.99,
//     image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "health",
//     description: "Eco-friendly yoga mat with alignment lines, carrying strap, and blocks included.",
//     features: ["Eco-Friendly Material", "Non-Slip Surface", "Alignment Lines", "Includes Blocks", "Carrying Strap"],
//     rating: 4.6,
//     reviews: 892,
//     inStock: true,
//     badge: "Eco-Friendly",
//   },
//   {
//     id: "3",
//     name: "Digital Blood Pressure Monitor",
//     price: 79.99,
//     image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "health",
//     description: "Clinically accurate blood pressure monitor with large display and memory storage.",
//     features: ["Clinically Accurate", "Large LCD Display", "120 Memory Storage", "Irregular Heartbeat Detection"],
//     rating: 4.7,
//     reviews: 634,
//     inStock: true,
//   },
//   {
//     id: "4",
//     name: "Essential Oils Diffuser",
//     price: 49.99,
//     originalPrice: 69.99,
//     image:
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "health",
//     description: "Ultrasonic aromatherapy diffuser with LED lights and timer settings.",
//     features: ["Ultrasonic Technology", "7 LED Colors", "Timer Settings", "Auto Shut-off", "Whisper Quiet"],
//     rating: 4.5,
//     reviews: 1156,
//     inStock: true,
//     badge: "Popular",
//   },

//   // Household Items
//   {
//     id: "5",
//     name: "Robot Vacuum Cleaner",
//     price: 299.99,
//     originalPrice: 399.99,
//     image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "household",
//     description: "Smart robot vacuum with mapping technology and app control.",
//     features: ["Smart Mapping", "App Control", "Auto-Charging", "HEPA Filter", "120min Runtime"],
//     rating: 4.4,
//     reviews: 2341,
//     inStock: true,
//     badge: "Smart Home",
//   },
//   {
//     id: "6",
//     name: "Air Purifier HEPA Filter",
//     price: 179.99,
//     image:
//       "https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "household",
//     description: "High-efficiency air purifier for large rooms with real-time air quality monitoring.",
//     features: ["HEPA H13 Filter", "Real-time Monitoring", "Covers 500 sq ft", "Ultra Quiet", "Smart Sensors"],
//     rating: 4.6,
//     reviews: 1789,
//     inStock: true,
//   },
//   {
//     id: "7",
//     name: "Smart LED Light Bulbs (4-Pack)",
//     price: 39.99,
//     originalPrice: 59.99,
//     image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "household",
//     description: "WiFi-enabled smart bulbs with 16 million colors and voice control.",
//     features: ["16M Colors", "Voice Control", "WiFi Enabled", "Energy Efficient", "Schedule Timer"],
//     rating: 4.3,
//     reviews: 967,
//     inStock: true,
//     badge: "Value Pack",
//   },
//   {
//     id: "8",
//     name: "Stainless Steel Cookware Set",
//     price: 149.99,
//     originalPrice: 199.99,
//     image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "household",
//     description: "Professional-grade 10-piece stainless steel cookware set with non-stick coating.",
//     features: ["10-Piece Set", "Non-Stick Coating", "Dishwasher Safe", "Oven Safe 500°F", "Lifetime Warranty"],
//     rating: 4.7,
//     reviews: 1423,
//     inStock: true,
//     badge: "Professional",
//   },

//   // Tech Gadgets
//   {
//     id: "9",
//     name: "Wireless Charging Station",
//     price: 79.99,
//     image:
//       "https://images.unsplash.com/photo-1609592806596-4d1b5e5e0e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "gadgets",
//     description: "3-in-1 wireless charging station for phone, earbuds, and smartwatch.",
//     features: ["3-in-1 Charging", "Fast Charging 15W", "LED Indicators", "Anti-Slip Design", "Universal Compatible"],
//     rating: 4.5,
//     reviews: 856,
//     inStock: true,
//     badge: "Fast Charging",
//   },
//   {
//     id: "10",
//     name: "Bluetooth Noise-Canceling Headphones",
//     price: 249.99,
//     originalPrice: 329.99,
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "gadgets",
//     description: "Premium over-ear headphones with active noise cancellation and 30-hour battery.",
//     features: ["Active Noise Cancellation", "30-Hour Battery", "Hi-Res Audio", "Quick Charge", "Foldable Design"],
//     rating: 4.8,
//     reviews: 2156,
//     inStock: true,
//     badge: "Premium Audio",
//   },
//   {
//     id: "11",
//     name: "Portable Power Bank 20000mAh",
//     price: 59.99,
//     originalPrice: 79.99,
//     image:
//       "https://images.unsplash.com/photo-1609592806596-4d1b5e5e0e0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "gadgets",
//     description: "High-capacity power bank with fast charging and digital display.",
//     features: ["20000mAh Capacity", "Fast Charging PD", "Digital Display", "3 USB Ports", "LED Flashlight"],
//     rating: 4.4,
//     reviews: 1234,
//     inStock: true,
//   },
//   {
//     id: "12",
//     name: "Smart Home Security Camera",
//     price: 129.99,
//     image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "gadgets",
//     description: "1080p HD security camera with night vision and motion detection.",
//     features: ["1080p HD Video", "Night Vision", "Motion Detection", "Two-Way Audio", "Cloud Storage"],
//     rating: 4.6,
//     reviews: 1567,
//     inStock: false,
//     badge: "Security",
//   },

//   // Coffee Products
//   {
//     id: "13",
//     name: "Espresso Machine Deluxe",
//     price: 399.99,
//     originalPrice: 499.99,
//     image:
//       "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "coffee",
//     description: "Professional espresso machine with built-in grinder and milk frother.",
//     features: ["Built-in Grinder", "Milk Frother", "15 Bar Pressure", "Programmable", "Stainless Steel"],
//     rating: 4.7,
//     reviews: 892,
//     inStock: true,
//     badge: "Barista Choice",
//   },
//   {
//     id: "14",
//     name: "Premium Coffee Bean Set",
//     price: 49.99,
//     image:
//       "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "coffee",
//     description: "Artisan roasted coffee beans from around the world - 4 varieties pack.",
//     features: ["4 Varieties Pack", "Artisan Roasted", "Single Origin", "Fresh Roasted", "Whole Beans"],
//     rating: 4.9,
//     reviews: 1678,
//     inStock: true,
//     badge: "Artisan Roasted",
//   },
//   {
//     id: "15",
//     name: "French Press Coffee Maker",
//     price: 34.99,
//     originalPrice: 49.99,
//     image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "coffee",
//     description: "Borosilicate glass French press with stainless steel filter.",
//     features: ["Borosilicate Glass", "Stainless Steel Filter", "34oz Capacity", "Heat Resistant", "Easy Clean"],
//     rating: 4.5,
//     reviews: 743,
//     inStock: true,
//   },
//   {
//     id: "16",
//     name: "Electric Coffee Grinder",
//     price: 89.99,
//     image:
//       "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     category: "coffee",
//     description: "Burr coffee grinder with 40 grind settings and timer function.",
//     features: ["40 Grind Settings", "Burr Grinding", "Timer Function", "Anti-Static", "Easy Clean"],
//     rating: 4.6,
//     reviews: 1089,
//     inStock: true,
//     badge: "Precision Grinding",
//   },

// ]


import type { Product, Category } from "../types/product"

// export const categories: Category[] = [
//   { id: "health", name: "Health & Wellness", icon: "🏥", count: 4 },
//   { id: "household", name: "Household Items", icon: "🏠", count: 4 },
//   { id: "gadgets", name: "Tech Gadgets", icon: "📱", count: 4 },
//   { id: "coffee", name: "Coffee Products", icon: "☕", count: 4 },
// ]

import {
  Heart,
  Baby,
  Home,
  Soup,
  Paintbrush2,
} from "lucide-react";



export const categories: Category[] = [
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: Heart,
    count: 8,
  },
  {
    id: "baby",
    name: "Baby Items",
    icon: Baby,
    count: 8,
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen / Tools",
    icon: Home,
    count: 8,
  },
  {
    id: "grocery",
    name: "Grocery",
    icon: Soup,
    count: 1,
  },
  {
    id: "art-craft",
    name: "Art & Craft",
    icon: Paintbrush2,
    count: 1,
  },
];


export const products: Product[] =  
[
  {
    "id": "1",
    "name": "Vitamin C Serum",
    "price": 29.99,
    "images": [
      "https://alibaba.com/product_images/vitamin-c-serum/1.jpg",
      "https://alibaba.com/product_images/vitamin-c-serum/2.jpg",
      "https://alibaba.com/product_images/vitamin-c-serum/3.jpg",
      "https://alibaba.com/product_images/vitamin-c-serum/4.jpg",
      "https://alibaba.com/product_images/vitamin-c-serum/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Brightening Vitamin C serum for radiant skin.",
    "features": ["Brightening", "Antioxidant", "Non-greasy", "All skin types", "Cruelty-free"],
    "rating": 4.7,
    "reviews": 342,
    "inStock": true,
    "badge": "Best Seller"
  },
  {
    "id": "2",
    "name": "Herbal Shampoo",
    "price": 18.50,
    "images": [
      "https://alibaba.com/product_images/herbal-shampoo/1.jpg",
      "https://alibaba.com/product_images/herbal-shampoo/2.jpg",
      "https://alibaba.com/product_images/herbal-shampoo/3.jpg",
      "https://alibaba.com/product_images/herbal-shampoo/4.jpg",
      "https://alibaba.com/product_images/herbal-shampoo/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Sulfate-free herbal shampoo for soft and shiny hair.",
    "features": ["Sulfate-free", "Hydrating", "Eco-friendly", "Safe for color-treated", "Paraben-free"],
    "rating": 4.5,
    "reviews": 158,
    "inStock": true,
    "badge": "New Arrival"
  },
  {
    "id": "3",
    "name": "Electric Toothbrush",
    "price": 49.99,
    "images": [
      "https://alibaba.com/product_images/electric-toothbrush/1.jpg",
      "https://alibaba.com/product_images/electric-toothbrush/2.jpg",
      "https://alibaba.com/product_images/electric-toothbrush/3.jpg",
      "https://alibaba.com/product_images/electric-toothbrush/4.jpg",
      "https://alibaba.com/product_images/electric-toothbrush/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Rechargeable electric toothbrush with multiple modes.",
    "features": ["Rechargeable", "Multiple modes", "Timer", "Ergonomic", "Travel case"],
    "rating": 4.8,
    "reviews": 869,
    "inStock": true,
    "badge": "Top Rated"
  },
  {
    "id": "4",
    "name": "Face Moisturizer",
    "price": 24.75,
    "images": [
      "https://alibaba.com/product_images/face-moisturizer/1.jpg",
      "https://alibaba.com/product_images/face-moisturizer/2.jpg",
      "https://alibaba.com/product_images/face-moisturizer/3.jpg",
      "https://alibaba.com/product_images/face-moisturizer/4.jpg",
      "https://alibaba.com/product_images/face-moisturizer/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Lightweight daily face moisturizer with SPF.",
    "features": ["SPF 30", "Non-comedogenic", "Hydrating", "Quick absorption", "Fragrance-free"],
    "rating": 4.6,
    "reviews": 425,
    "inStock": false,
    "badge": "Customer Favorite"
  },
  {
    "id": "5",
    "name": "Essential Oils Set",
    "price": 35.00,
    "images": [
      "https://alibaba.com/product_images/essential-oils-set/1.jpg",
      "https://alibaba.com/product_images/essential-oils-set/2.jpg",
      "https://alibaba.com/product_images/essential-oils-set/3.jpg",
      "https://alibaba.com/product_images/essential-oils-set/4.jpg",
      "https://alibaba.com/product_images/essential-oils-set/5.jpg"
    ],
    "category": "health-beauty",
    "description": "6-piece essential oil set for aromatherapy.",
    "features": ["6 oils", "100% pure", "Glass bottles", "Therapeutic grade", "Best for diffuser"],
    "rating": 4.4,
    "reviews": 203,
    "inStock": true,
    "badge": "Limited Offer"
  },
  {
    "id": "6",
    "name": "Hair Dryer",
    "price": 59.99,
    "images": [
      "https://alibaba.com/product_images/hair-dryer/1.jpg",
      "https://alibaba.com/product_images/hair-dryer/2.jpg",
      "https://alibaba.com/product_images/hair-dryer/3.jpg",
      "https://alibaba.com/product_images/hair-dryer/4.jpg",
      "https://alibaba.com/product_images/hair-dryer/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Professional ionic hair dryer with multiple heat settings.",
    "features": ["Ionic tech", "Dual voltage", "Quiet", "Lightweight", "Cool shot"],
    "rating": 4.7,
    "reviews": 317,
    "inStock": true,
    "badge": "Top Rated"
  },
  {
    "id": "7",
    "name": "Nail Kit",
    "price": 22.49,
    "images": [
      "https://alibaba.com/product_images/nail-kit/1.jpg",
      "https://alibaba.com/product_images/nail-kit/2.jpg",
      "https://alibaba.com/product_images/nail-kit/3.jpg",
      "https://alibaba.com/product_images/nail-kit/4.jpg",
      "https://alibaba.com/product_images/nail-kit/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Complete manicure and pedicure kit.",
    "features": ["10 pieces", "Stainless steel", "Carry case", "Precise", "Durable"],
    "rating": 4.3,
    "reviews": 89,
    "inStock": true,
    "badge": "Customer Favorite"
  },
  {
    "id": "8",
    "name": "Lip Balm",
    "price": 5.99,
    "images": [
      "https://alibaba.com/product_images/lip-balm/1.jpg",
      "https://alibaba.com/product_images/lip-balm/2.jpg",
      "https://alibaba.com/product_images/lip-balm/3.jpg",
      "https://alibaba.com/product_images/lip-balm/4.jpg",
      "https://alibaba.com/product_images/lip-balm/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Moisturizing lip balm with vitamin E.",
    "features": ["Vitamin E", "SPF 15", "Travel size", "Castor oil", "Smooth application"],
    "rating": 4.5,
    "reviews": 240,
    "inStock": true,
    "badge": "Best Seller"
  },
  {
    "id": "9",
    "name": "Facial Cleanser",
    "price": 19.95,
    "images": [
      "https://alibaba.com/product_images/facial-cleanser/1.jpg",
      "https://alibaba.com/product_images/facial-cleanser/2.jpg",
      "https://alibaba.com/product_images/facial-cleanser/3.jpg",
      "https://alibaba.com/product_images/facial-cleanser/4.jpg",
      "https://alibaba.com/product_images/facial-cleanser/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Gentle cleanser for daily use.",
    "features": ["Gentle", "pH-balanced", "No parabens", "Soap-free", "For all skin types"],
    "rating": 4.4,
    "reviews": 180,
    "inStock": true,
    "badge": "Top Rated"
  },
  {
    "id": "10",
    "name": "Body Scrub",
    "price": 24.99,
    "images": [
      "https://alibaba.com/product_images/body-scrub/1.jpg",
      "https://alibaba.com/product_images/body-scrub/2.jpg",
      "https://alibaba.com/product_images/body-scrub/3.jpg",
      "https://alibaba.com/product_images/body-scrub/4.jpg",
      "https://alibaba.com/product_images/body-scrub/5.jpg"
    ],
    "category": "health-beauty",
    "description": "Exfoliating body scrub with natural ingredients.",
    "features": ["Sugar scrub", "Natural oils", "Moisturizing", "Invigorating scent", "Eco-friendly"],
    "rating": 4.6,
    "reviews": 150,
    "inStock": false,
    "badge": "New Arrival"
  },
  {
    "id": "11",
    "name": "Baby Diapers (Pack of 50)",
    "price": 39.99,
    "images": [
      "https://alibaba.com/product_images/baby-diapers/1.jpg",
      "https://alibaba.com/product_images/baby-diapers/2.jpg",
      "https://alibaba.com/product_images/baby-diapers/3.jpg",
      "https://alibaba.com/product_images/baby-diapers/4.jpg",
      "https://alibaba.com/product_images/baby-diapers/5.jpg"
    ],
    "category": "baby",
    "description": "Ultra-soft baby diapers with leak protection.",
    "features": ["Leak-proof", "Hypoallergenic", "Soft", "Elastic waistband", "Wetness indicator"],
    "rating": 4.8,
    "reviews": 640,
    "inStock": true,
    "badge": "Best Seller"
  },
  {
    "id": "12",
    "name": "Infant Formula",
    "price": 49.50,
    "images": [
      "https://alibaba.com/product_images/infant-formula/1.jpg",
      "https://alibaba.com/product_images/infant-formula/2.jpg",
      "https://alibaba.com/product_images/infant-formula/3.jpg",
      "https://alibaba.com/product_images/infant-formula/4.jpg",
      "https://alibaba.com/product_images/infant-formula/5.jpg"
    ],
    "category": "baby",
    "description": "Nutrient-rich formula for newborns.",
    "features": ["UL-certified", "DHA & ARA", "Non-GMO", "Easy mix", "Iron-fortified"],
    "rating": 4.5,
    "reviews": 312,
    "inStock": true,
    "badge": "Top Rated"
  },
  {
    "id": "13",
    "name": "Baby Stroller",
    "price": 129.99,
    "images": [
      "https://alibaba.com/product_images/baby-stroller/1.jpg",
      "https://alibaba.com/product_images/baby-stroller/2.jpg",
      "https://alibaba.com/product_images/baby-stroller/3.jpg",
      "https://alibaba.com/product_images/baby-stroller/4.jpg",
      "https://alibaba.com/product_images/baby-stroller/5.jpg"
    ],
    "category": "baby",
    "description": "Lightweight foldable baby stroller.",
    "features": ["Foldable", "Reclining seat", "Sunshade", "Storage basket", "One-handed fold"],
    "rating": 4.6,
    "reviews": 420,
    "inStock": false,
    "badge": "New Arrival"
  },
  {
    "id": "14",
    "name": "Baby Lotion",
    "price": 12.99,
    "images": [
      "https://alibaba.com/product_images/baby-lotion/1.jpg",
      "https://alibaba.com/product_images/baby-lotion/2.jpg",
      "https://alibaba.com/product_images/baby-lotion/3.jpg",
      "https://alibaba.com/product_images/baby-lotion/4.jpg",
      "https://alibaba.com/product_images/baby-lotion/5.jpg"
    ],
    "category": "baby",
    "description": "Gentle baby lotion with aloe vera.",
    "features": ["Aloe vera", "Hypoallergenic", "Non-greasy", "Dermatologist tested", "Paraben-free"],
    "rating": 4.7,
    "reviews": 215,
    "inStock": true,
    "badge": "Customer Favorite"
  },
  {
    "id": "15",
    "name": "Teething Toys Set",
    "price": 16.50,
    "images": [
      "https://alibaba.com/product_images/teething-toys/1.jpg",
      "https://alibaba.com/product_images/teething-toys/2.jpg",
      "https://alibaba.com/product_images/teething-toys/3.jpg",
      "https://alibaba.com/product_images/teething-toys/4.jpg",
      "https://alibaba.com/product_images/teething-toys/5.jpg"
    ],
    "category": "baby",
    "description": "Colorful teething toys made from BPA-free silicone.",
    "features": ["BPA-free", "Freezing safe", "Soft texture", "Easy to clean", "Chew-safe"],
    "rating": 4.4,
    "reviews": 170,
    "inStock": true,
    "badge": "Limited Offer"
  },
  {
    "id": "16",
    "name": "Crib Mobile",
    "price": 29.95,
    "images": [
      "https://alibaba.com/product_images/crib-mobile/1.jpg",
      "https://alibaba.com/product_images/crib-mobile/2.jpg",
      "https://alibaba.com/product_images/crib-mobile/3.jpg",
      "https://alibaba.com/product_images/crib-mobile/4.jpg",
      "https://alibaba.com/product_images/crib-mobile/5.jpg"
    ],
    "category": "baby",
    "description": "Soothing crib mobile with music and lights.",
    "features": ["Music player", "LED lights", "Rotating mobile", "Adjustable arm", "Soft toys"],
    "rating": 4.8,
    "reviews": 290,
    "inStock": true,
    "badge": "Best Seller"
  },
  {
    "id": "17",
    "name": "Soft Baby Blanket",
    "price": 24.99,
    "images": [
      "https://alibaba.com/product_images/soft-baby-blanket/1.jpg",
      "https://alibaba.com/product_images/soft-baby-blanket/2.jpg",
      "https://alibaba.com/product_images/soft-baby-blanket/3.jpg",
      "https://alibaba.com/product_images/soft-baby-blanket/4.jpg",
      "https://alibaba.com/product_images/soft-baby-blanket/5.jpg"
    ],
    "category": "baby",
    "description": "Ultra-soft organic cotton baby blanket.",
    "features": ["Organic cotton", "Hypoallergenic", "Machine washable", "Lightweight", "Breathable"],
    "rating": 4.7,
    "reviews": 198,
    "inStock": true,
    "badge": "Customer Favorite"
  },
  {
    "id": "18",
    "name": "Baby Monitor",
    "price": 59.99,
    "images": [
      "https://alibaba.com/product_images/baby-monitor/1.jpg",
      "https://alibaba.com/product_images/baby-monitor/2.jpg",
      "https://alibaba.com/product_images/baby-monitor/3.jpg",
      "https://alibaba.com/product_images/baby-monitor/4.jpg",
      "https://alibaba.com/product_images/baby-monitor/5.jpg"
    ],
    "category": "baby",
    "description": "Video baby monitor with night vision.",
    "features": ["Night vision", "2 way audio", "Wireless", "Long range", "Portable"],
    "rating": 4.6,
    "reviews": 342,
    "inStock": false,
    "badge": "Top Rated"
  },
   {
    "id": "19",
    "name": "Stainless Steel Chef Knife",
    "price": 45.99,
    "images": [
      "https://alibaba.com/product_images/chef-knife/1.jpg",
      "https://alibaba.com/product_images/chef-knife/2.jpg",
      "https://alibaba.com/product_images/chef-knife/3.jpg",
      "https://alibaba.com/product_images/chef-knife/4.jpg",
      "https://alibaba.com/product_images/chef-knife/5.jpg"
    ],
    "category": "home-kitchen",
    "description": "High-carbon stainless chef knife with ergonomic handle.",
    "features": ["Rust-resistant", "Ergonomic grip", "Precision edge", "Dishwasher safe", "Balance-tested"],
    "rating": 4.8,
    "reviews": 512,
    "inStock": true,
    "badge": "Top Rated"
  },
  {
    "id": "20",
    "name": "Cast Iron Skillet 10\"",
    "price": 39.99,
    "images": [
      "https://alibaba.com/product_images/cast-iron-skillet/1.jpg",
      "https://alibaba.com/product_images/cast-iron-skillet/2.jpg",
      "https://alibaba.com/product_images/cast-iron-skillet/3.jpg",
      "https://alibaba.com/product_images/cast-iron-skillet/4.jpg",
      "https://alibaba.com/product_images/cast-iron-skillet/5.jpg"
    ],
    "category": "home-kitchen",
    "description": "Pre-seasoned cast iron skillet for versatile cooking.",
    "features": ["Non-stick surface", "Even heat", "Oven safe", "Pre-seasoned", "Built-in handle"],
    "rating": 4.7,
    "reviews": 389,
    "inStock": true,
    "badge": "Customer Favorite"
  },

  {
    "id": "27",
    "name": "Organic Fair‑Trade Coffee Beans 1kg",
    "price": 19.99,
    "images": [
      "https://alibaba.com/product_images/coffee‑beans/1.jpg",
    ],
    "category": "grocery",
    "description": "Premium organic coffee beans, sustainably sourced.",
    "features": ["Fair-trade", "Medium roast", "Freshly roasted", "Eco-pack", "Rich aroma"],
    "rating": 4.9,
    "reviews": 1045,
    "inStock": true,
    "badge": "Best Seller"
  },

   {
    "id": "34",
    "name": "12‑Color Acrylic Paint Set",
    "price": 24.49,
    "images": [
      "https://alibaba.com/product_images/acrylic‑paints/1.jpg",
    ],
    "category": "art-craft",
    "description": "Vivid acrylic paints for canvas, wood, pottery.",
    "features": ["Quick dry", "Non-toxic", "Rich pigments", "12 colors", "Mixable"],
    "rating": 4.6,
    "reviews": 275,
    "inStock": true,
    "badge": "New Arrival"
  },


 
]
