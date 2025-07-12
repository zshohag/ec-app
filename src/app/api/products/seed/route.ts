// src/app/api/products/seed/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import {Product} from '@/models/Product';

const products = [
    {
      "_id": "66f19b15a8f61bb7283337c4",
      "id": 3,
      "name": "Google Pixel 6",
      "image": "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
      "description": "Google Pixel 6 with 6.4-inch AMOLED display, 8GB RAM, 128GB storage, and Google Tensor processor.",
      "price": "799",
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337cd",
      "id": 12,
      "name": "Asus ROG Zephyrus G14",
      "image": "https://dlcdnwebimgs.asus.com/gain/87C641FC-4E5F-4073-B739-1C41E2783B96/w1000/h732",
      "description": "Asus ROG Zephyrus G14 gaming laptop with AMD Ryzen 9, 16GB RAM, NVIDIA RTX 3060, and 1TB SSD.",
      "price": 1499,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 12
    },
    {
      "_id": "66f19b15a8f61bb7283337cf",
      "id": 14,
      "name": "Dell G5 15 Gaming Laptop",
      "image": "https://i.dell.com/is/image/DellContent//content/dam/images/products/laptops-and-2-in-1s/g-series/g5-15-5500-non-touch/dg5500nt-cnb-05000ff090-bk-upsell.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402&chrss=full",
      "description": "Dell G5 15 gaming laptop with Intel Core i7, NVIDIA GTX 1660 Ti, 16GB RAM, and 512GB SSD.",
      "price": 1299,
      "ratings": 4.7,
      "category": "Laptops",
      "stock": 7
    },
    {
      "_id": "66f19b15a8f61bb7283337d4",
      "id": 19,
      "name": "Apple iPhone SE (2020)",
      "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-se-2020-2.jpg",
      "description": "Apple iPhone SE (2020) with 4.7-inch Retina HD display, A13 Bionic chip, and 12MP camera.",
      "price": 399.99,
      "ratings": 4.5,
      "category": "Smartphones",
      "stock": 20
    },
    {
      "_id": "66f19b15a8f61bb7283337d6",
      "id": 21,
      "name": "Lenovo ThinkPad X1 Carbon",
      "image": "https://p2-ofp.static.pub//fes/cms/2023/11/21/xn2mhejoktj9ttffveuotwfhqvv4yg908647.png",
      "description": "Lenovo ThinkPad X1 Carbon with Intel Core i7, 16GB RAM, 512GB SSD, and a 14-inch UHD display.",
      "price": 1899,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 2
    },
    {
      "_id": "66f19b15a8f61bb7283337c6",
      "id": 5,
      "name": "Dell XPS 13",
      "image": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9315/media-gallery/notebook-xps-9315-nt-blue-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=575&qlt=100,1&resMode=sharp2&size=575,402&chrss=full",
      "description": "Dell XPS 13 with Intel Core i7, 16GB RAM, 512GB SSD, and a stunning 13.4-inch InfinityEdge display.",
      "price": 1399,
      "ratings": 4.7,
      "category": "Laptops",
      "stock": 78
    },
    {
      "_id": "66f19b15a8f61bb7283337d5",
      "id": 20,
      "name": "DJI Mavic 2 Pro",
      "image": "https://www.runbazaar.com/_next/image/?url=https%3A%2F%2Fapi.runbazaar.com%2Fmedia%2F__sized__%2Fproduct_img%2F2024%2F01%2F27%2FRBIVYqwz%2FDJI_Mavic_3_Pro_with_DJI_RC_3-smart_crop-c0-5__0-5-750x750-70.jpg&w=640&q=75",
      "description": "DJI Mavic 2 Pro drone with Hasselblad camera, 4K video recording, 31-minute flight time, and advanced obstacle avoidance.",
      "price": 1499,
      "ratings": 4.8,
      "category": "Drones",
      "stock": 42
    },
    {
      "_id": "66f19b15a8f61bb7283337ca",
      "id": 9,
      "name": "Samsung Galaxy Z Fold 3",
      "image": "https://res.cloudinary.com/dhsjpmqz9/images/f_auto,q_auto,w_700,h_460,c_fill,g_auto/Samsung_Galaxy_Z_Fold3_Phantom_Green_tdbwdo/plus-260-clhrxbogt079308jtz8fnja5d.jpg",
      "description": "Samsung Galaxy Z Fold 3 5G with foldable 7.6-inch Dynamic AMOLED display, 12GB RAM, and 256GB storage.",
      "price": 1799,
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 88
    },
    {
      "_id": "66f19b15a8f61bb7283337c7",
      "id": 6,
      "name": "HP Spectre x360",
      "image": "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06150545.png",
      "description": "HP Spectre x360 convertible laptop with Intel Core i7, 16GB RAM, 2TB SSD, and a 13.3-inch OLED touchscreen.",
      "price": 1699,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337d0",
      "id": 15,
      "name": "Samsung Galaxy Note 20 Ultra",
      "image": "https://www.gizmochina.com/wp-content/uploads/2020/07/Samsung-Galaxy-Note-20-Ultra-564x564.jpg",
      "description": "Samsung Galaxy Note 20 Ultra with 6.9-inch Dynamic AMOLED display, 12GB RAM, and 108MP camera.",
      "price": 1299,
      "ratings": 4.7,
      "category": "Smartphones",
      "stock": 76
    },
    {
      "_id": "66f19b15a8f61bb7283337d2",
      "id": 17,
      "name": "DJI Inspire 2",
      "image": "https://diamu.com.bd/wp-content/uploads/2021/04/DJI-Inspire-2-Drone1-600x600.jpg",
      "description": "DJI Inspire 2 professional drone with 5.2K video recording, 30-minute flight time, and dual-battery system.",
      "price": 2999,
      "ratings": 4.9,
      "category": "Drones",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337dc",
      "id": 27,
      "name": "Google Pixel 5",
      "image": "https://caseface.ie/wp-content/uploads/Liquid-Silicone-Google-Pixel-5-Case-1.png",
      "description": "Google Pixel 5 with 6-inch OLED display, 8GB RAM, 128GB storage, and dual-camera system.",
      "price": 699,
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 9
    },
    {
      "_id": "66f19b15a8f61bb7283337e0",
      "id": 31,
      "name": "OnePlus Nord 2",
      "image": "https://adminapi.applegadgetsbd.com/storage/media/large/OnePlus-Nord-2-5G-Gray-Sierra-5484.jpg",
      "description": "OnePlus Nord 2 with 6.43-inch AMOLED display, MediaTek Dimensity 1200, 8GB RAM, and dual-camera system.",
      "price": 499,
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 12
    },
    {
      "_id": "66f19b15a8f61bb7283337da",
      "id": 25,
      "name": "Lenovo Legion 5 Pro",
      "image": "https://www.globalbrand.com.bd/image/cache/catalog/LAPTOP/LENOVO/Lenovo-Legion-Pro-5i-(9)-(83DF00A2LK)-14th-Gen-Core-i7-Gaming-Laptop-600x600.jpg",
      "description": "Lenovo Legion 5 Pro gaming laptop with AMD Ryzen 7, 16GB RAM, NVIDIA RTX 3070, and 512GB SSD.",
      "price": 1699,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 8
    },
    {
      "_id": "66f19b15a8f61bb7283337d7",
      "id": 22,
      "name": "Apple MacBook Air M1",
      "image": "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg",
      "description": "Apple MacBook Air with M1 chip, 8GB RAM, 256GB SSD, and a 13.3-inch Retina display.",
      "price": 999,
      "ratings": 4.9,
      "category": "Laptops",
      "stock": 40
    },
    {
      "_id": "66f19b15a8f61bb7283337d8",
      "id": 23,
      "name": "OnePlus 9 Pro",
      "image": "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-pro-1.jpg",
      "description": "OnePlus 9 Pro with 6.7-inch Fluid AMOLED display, Snapdragon 888, 8GB RAM, and quad-camera system.",
      "price": 969.99,
      "ratings": 4.7,
      "category": "Smartphones",
      "stock": 7
    },
    {
      "_id": "66f19b15a8f61bb7283337d9",
      "id": 24,
      "name": "Samsung Galaxy S20 FE",
      "image": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s20-fe-5g-1.jpg",
      "description": "Samsung Galaxy S20 FE with 6.5-inch Super AMOLED display, Snapdragon 865, 6GB RAM, and triple camera system.",
      "price": 699.99,
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 14
    },
    {
      "_id": "66f19b15a8f61bb7283337dd",
      "id": 28,
      "name": "Apple MacBook Pro M1 Max",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCsi2oRXWnyj3k1H08v8sbMfcoifIWwCZ7Nw&s",
      "description": "Apple MacBook Pro M1 Max with 16GB RAM, 1TB SSD, and a 16-inch Liquid Retina XDR display.",
      "price": 3299,
      "ratings": 4.9,
      "category": "Laptops",
      "stock": 5
    },
    {
      "_id": "66f19b15a8f61bb7283337db",
      "id": 26,
      "name": "DJI Air 2S",
      "image": "https://assets.videomaker.com/2021/09/DJI_AIR_2S_002-scaled-1-1068x601.jpg",
      "description": "DJI Air 2S drone with 20MP camera, 5.4K video recording, and 31-minute flight time.",
      "price": 999,
      "ratings": 4.7,
      "category": "Drones",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337c2",
      "id": 1,
      "name": "Samsung Galaxy S21",
      "image": "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg",
      "description": "The Samsung Galaxy S21 features a 6.2-inch Dynamic AMOLED display, 8GB RAM, 128GB storage, and a 4120mAh battery.",
      "price": 888,
      "ratings": 4.5,
      "category": "Smartphones",
      "stock": 15
    },
    {
      "_id": "66f19b15a8f61bb7283337c3",
      "id": 2,
      "name": "Apple iPhone 13 Pro",
      "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-01.jpg",
      "description": "Apple iPhone 13 Pro with 6.1-inch Super Retina XDR display, A15 Bionic chip, 5G, and triple camera system.",
      "price": 999.99,
      "ratings": 4.7,
      "category": "Smartphones",
      "stock": 8
    },
    {
      "_id": "66f19b15a8f61bb7283337d1",
      "id": 16,
      "name": "HP Omen 15",
      "image": "https://www.startech.com.bd/image/cache/catalog/laptop/hp-laptop/ek0035tx/ek0035tx-1-500x500.jpg",
      "description": "HP Omen 15 gaming laptop with Intel Core i7, NVIDIA RTX 2070, 16GB RAM, and 512GB SSD.",
      "price": 1399,
      "ratings": 2,
      "category": "Laptops",
      "stock": 7
    },
    {
      "_id": "66f19b15a8f61bb7283337c5",
      "id": 4,
      "name": "Apple MacBook Pro 14-inch",
      "image": "https://m.media-amazon.com/images/I/61cCf94xIEL._AC_SL1500_.jpg",
      "description": "Apple MacBook Pro with M1 Pro chip, 14-inch Liquid Retina XDR display, 16GB RAM, and 512GB SSD.",
      "price": 1999,
      "ratings": 4.9,
      "category": "Laptops",
      "stock": 81
    },
    {
      "_id": "66f19b15a8f61bb7283337c9",
      "id": 8,
      "name": "DJI Mini 2",
      "image": "https://www.ryans.com/storage/products/main/dji-fpv-combo-21667284256.webp",
      "description": "DJI Mini 2 lightweight drone with 12MP camera, 4K video recording, and 31-minute flight time.",
      "price": 449.99,
      "ratings": 4.7,
      "category": "Drones",
      "stock": 2
    },
    {
      "_id": "66f19b15a8f61bb7283337e1",
      "id": 32,
      "name": "Lenovo Legion 5",
      "image": "https://www.globalbrand.com.bd/image/cache/catalog/LAPTOP/LENOVO/Lenovo-Legion-5-15IAH7H-(82RB00R2IN)-12th-Gen-Core-i7-16GB-RAM-512GB-SSD-Laptop-With-RTX-3060-4-600x600.jpg",
      "description": "Lenovo Legion 5 gaming laptop with AMD Ryzen 5, 8GB RAM, NVIDIA GTX 1650, and 512GB SSD.",
      "price": 1199,
      "ratings": 4.7,
      "category": "Laptops",
      "stock": 9
    },
    {
      "_id": "66f19b15a8f61bb7283337cb",
      "id": 10,
      "name": "Microsoft Surface Laptop 4",
      "image": "https://www.custommacbd.com/cdn/shop/products/MicrosoftSurfaceLaptop4CMBD_540x.jpg?v=1632392479",
      "description": "Microsoft Surface Laptop 4 with AMD Ryzen 7, 16GB RAM, 512GB SSD, and a 13.5-inch touchscreen display.",
      "price": 1299,
      "ratings": 4.7,
      "category": "Laptops",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337cc",
      "id": 11,
      "name": "DJI Phantom 4 Pro",
      "image": "https://cdn.shopify.com/s/files/1/1005/9694/products/P4-Multispectral-Shadow.jpg",
      "description": "DJI Phantom 4 Pro drone with 20MP camera, 4K video recording, 30-minute flight time, and advanced obstacle sensors.",
      "price": 1599,
      "ratings": 4.8,
      "category": "Drones",
      "stock": 4
    },
    {
      "_id": "66f19b15a8f61bb7283337df",
      "id": 30,
      "name": "HP Elite Dragonfly",
      "image": "https://www.techlandbd.com/image/catalog/HP/hp-elitebook-dragonfly-laptop.jpg",
      "description": "HP Elite Dragonfly with Intel Core i5, 16GB RAM, 512GB SSD, and a 13.5-inch touchscreen display.",
      "price": 1699,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 7
    },
    {
      "_id": "66f19b15a8f61bb7283337c8",
      "id": 7,
      "name": "DJI Mavic Air 2",
      "image": "https://www.d1store.com.au/images/products/[PRODUCT-THUMB]-MAVIC-AIR-2-01-v1.jpg",
      "description": "DJI Mavic Air 2 drone with 48MP camera, 4K video recording, 34-minute flight time, and obstacle avoidance.",
      "price": 799.99,
      "ratings": 4.8,
      "category": "Drones",
      "stock": 0
    },
    {
      "_id": "66f19b15a8f61bb7283337de",
      "id": 29,
      "name": "DJI FPV Combo",
      "image": "https://www.robotonbd.com/wp-content/uploads/2021/04/bd799db8213b45ac25bae2183033fcc3@origin-1024x1024.jpg.webp",
      "description": "DJI FPV Combo with immersive first-person view experience, 4K video recording, and 20-minute flight time.",
      "price": 1299.99,
      "ratings": 4.8,
      "category": "Drones",
      "stock": 6
    },
    {
      "_id": "66f19b15a8f61bb7283337ce",
      "id": 13,
      "name": "Apple iPhone 12 Mini",
      "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-mini-2.jpg",
      "description": "Apple iPhone 12 Mini with 5.4-inch Super Retina XDR display, A14 Bionic chip, and dual-camera system.",
      "price": 699.99,
      "ratings": 4.6,
      "category": "Smartphones",
      "stock": 15
    },
    {
      "_id": "66f19b15a8f61bb7283337d3",
      "id": 18,
      "name": "Razer Blade 15",
      "image": "https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad/images/S200727787_1?1684139339?g=0",
      "description": "Razer Blade 15 gaming laptop with Intel Core i7, NVIDIA RTX 3070, 16GB RAM, and 1TB SSD.",
      "price": 2299,
      "ratings": 4.8,
      "category": "Laptops",
      "stock": 6
    }
  ]

export async function GET() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    return NextResponse.json({ message: 'Seeding successful!' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Seeding failed.' }, { status: 500 });
  }
}
