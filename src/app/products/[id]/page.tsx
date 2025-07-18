// "use client";

// import { useParams } from "next/navigation";
// import { products } from "@/data/products";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Star,
//   Check,
//   Truck,
//   RotateCcw,
//   Shield,
// } from "lucide-react";
// import Image from "next/image";
// import { useCart } from "@/context/CartContext";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const [quantity, setQuantity] = useState(1);
//   const { dispatch } = useCart();

//   const product = products.find((p) => p.id === id);

//   const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

//   if (!product) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">
//         Product not found
//       </div>
//     );
//   }

//   const discount = product.originalPrice
//     ? Math.round(100 - (product.price / product.originalPrice) * 100)
//     : null;

//   // const handleAddToCartWithQuantity = (qty: number) => {
//   //   dispatch({
//   //     type: "ADD_ITEM",
//   //     payload: { ...product, quantity: qty },
//   //   });
//   // };

//   const handleAddToCart = () => {
//     dispatch({ type: "ADD_ITEM", payload: product });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div className="space-y-4">
//           <div className="max-w-4xl mx-auto w-full">
//             <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow group">
//               <Image
//                 src={selectedImage || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto">
//             {product.images?.map((img, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
//                   selectedImage === img ? "border-gray-500" : "border-gray-200"
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`Preview ${index}`}
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-3 flex-wrap">
//             <h1 className="text-3xl font-bold">{product.name}</h1>

//             {product.inStock ? (
//               <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
//                 <Check className="w-4 h-4" />
//                 In Stock
//               </Badge>
//             ) : (
//               <Badge
//                 variant="destructive"
//                 className="px-3 py-1 text-sm font-medium"
//               >
//                 Out of Stock
//               </Badge>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-5 h-5 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-gray-600">({product.reviews} reviews)</span>
//           </div>

//           <div className="flex items-center gap-3 text-2xl font-bold">
//             <span>${product.price}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-lg line-through text-gray-500">
//                   ${product.originalPrice}
//                 </span>
//                 <Badge variant="destructive">{discount}% OFF</Badge>
//               </>
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">{product.description}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Key Features</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {product.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex  items-center flex-wrap gap-4 mt-6">
//             {/* Quantity Selector */}
//             <div className="flex items-center px-3 py-2 gap-4">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               >
//                 -
//               </Button>
//               <span className="text-lg font-medium w-6 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 +
//               </Button>
//             </div>

//             {/* Add to Cart Button */}
//             <div>
//               <Button
//                 onClick={handleAddToCart}
//                 disabled={!product.inStock}
//                 className="w-full sm:w-auto text-lg px-6 py-5"
//               >
//                 <ShoppingCart className="mr-2 w-5 h-5" />
//                 Add to Cart – ${product.price}
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4 pt-4 border-t">
//             <div className="text-center">
//               <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
//               <div className="font-semibold text-sm">Free Shipping</div>
//               <div className="text-xs text-gray-500">On orders over $50</div>
//             </div>
//             <div className="text-center">
//               <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
//               <div className="font-semibold text-sm">30-Day Returns</div>
//               <div className="text-xs text-gray-500">No questions asked</div>
//             </div>
//             <div className="text-center">
//               <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
//               <div className="font-semibold text-sm">2-Year Warranty</div>
//               <div className="text-xs text-gray-500">Full protection</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="max-w-7xl mx-auto px-4 mt-20">
//         <h1 className="text-3xl font-bold my-6 ">Related Products</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products
//             .filter(
//               (p) => p.category === product.category && p.id !== product.id
//             )
//             .slice(0, 6) // Only show 4 related items
//             .map((related) => (
//               <Card
//                 key={related.id}
//                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
//               >
//                 <div className="relative">
//                   {/* Product Image */}
//                   <div className="relative h-56 overflow-hidden">
//                     <Image
//                       src={related.images?.[0] || "/placeholder.svg"}
//                       alt={related.name}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     {related.badge && (
//                       <Badge className="absolute top-3 left-3 bg-red-500">
//                         {related.badge}
//                       </Badge>
//                     )}
//                     {!related.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge
//                           variant="destructive"
//                           className="text-lg px-4 py-2"
//                         >
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Info */}
//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                       {related.name}
//                     </h3>

//                     <div className="flex items-center gap-1 mb-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(related.rating)
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-1">
//                         ({related.reviews})
//                       </span>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {related.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {related.features.slice(0, 3).map((feature, index) => (
//                         <Badge
//                           key={index}
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {feature}
//                         </Badge>
//                       ))}
//                       {related.features.length > 3 && (
//                         <Badge variant="outline" className="text-xs">
//                           +{related.features.length - 3} more
//                         </Badge>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ${related.price}
//                       </span>
//                       {related.originalPrice && (
//                         <span className="text-lg text-gray-500 line-through">
//                           ${related.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </CardContent>
//                 </div>

//                 {/* Action Buttons */}

//                 <div className="px-2 pb-4 flex flex-col mt-auto">
//                   <Link href={`/products/${related.id}`} className="w-full">
//                     <Button variant="default" className="w-full">
//                       View More
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

///222

// "use client";

// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Star,
//   Check,
//   Truck,
//   RotateCcw,
//   Shield,
// } from "lucide-react";
// import Image from "next/image";
// import { useCart } from "@/context/CartContext";
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { useProduct, useProducts } from "@/lib/api/products";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const { data: product, isLoading, isError } = useProduct(id as string);
//   const { data: products = [] } = useProducts();
//   const [quantity, setQuantity] = useState(1);
//   const { dispatch } = useCart();
//   // const [selectedImage, setSelectedImage] = useState<string | undefined>(
//   //   product?.images?.[0]
//   // );

//   const [selectedImage, setSelectedImage] = useState<string | undefined>(
//     undefined
//   );

//   // Set default image when product loads
//   useEffect(() => {
//     if (product && product.images && product.images.length > 0) {
//       setSelectedImage(product.images[0]);
//     }
//   }, [product]);

//   //const [selectedImage, setSelectedImage] = useState<string | undefined>();

//   console.log("selectedImage", selectedImage);
//   console.log("product.images", product?.images);

//   if (isLoading) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">
//         Product not found
//       </div>
//     );
//   }
//   const discount = product.originalPrice
//     ? Math.round(100 - (product.price / product.originalPrice) * 100)
//     : null;

//   const handleAddToCart = () => {
//     dispatch({ type: "ADD_ITEM", payload: { ...product } });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div className="space-y-4">
//           <div className="max-w-4xl mx-auto w-full">
//             <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow group">
//               <Image
//                 src={selectedImage || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto">
//             {product.images?.map((img, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
//                   selectedImage === img ? "border-gray-500" : "border-gray-200"
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`Preview ${index}`}
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-3 flex-wrap">
//             <h1 className="text-3xl font-bold">{product.name}</h1>

//             {product.inStock ? (
//               <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
//                 <Check className="w-4 h-4" />
//                 In Stock
//               </Badge>
//             ) : (
//               <Badge
//                 variant="destructive"
//                 className="px-3 py-1 text-sm font-medium"
//               >
//                 Out of Stock
//               </Badge>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-5 h-5 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-gray-600">({product.reviews} reviews)</span>
//           </div>

//           <div className="flex items-center gap-3 text-2xl font-bold">
//             <span>${product.price}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-lg line-through text-gray-500">
//                   ${product.originalPrice}
//                 </span>
//                 <Badge variant="destructive">{discount}% OFF</Badge>
//               </>
//             )}
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">{product.description}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Key Features</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {product.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center flex-wrap gap-4 mt-6">
//             {/* Quantity Selector */}
//             <div className="flex items-center px-3 py-2 gap-4">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               >
//                 -
//               </Button>
//               <span className="text-lg font-medium w-6 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 +
//               </Button>
//             </div>

//             {/* Add to Cart Button */}
//             <div>
//               <Button
//                 onClick={handleAddToCart}
//                 disabled={!product.inStock}
//                 className="w-full sm:w-auto text-lg px-6 py-5"
//               >
//                 <ShoppingCart className="mr-2 w-5 h-5" />
//                 Add to Cart – ${product.price}
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4 pt-4 border-t">
//             <div className="text-center">
//               <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
//               <div className="font-semibold text-sm">Free Shipping</div>
//               <div className="text-xs text-gray-500">On orders over $50</div>
//             </div>
//             <div className="text-center">
//               <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
//               <div className="font-semibold text-sm">30-Day Returns</div>
//               <div className="text-xs text-gray-500">No questions asked</div>
//             </div>
//             <div className="text-center">
//               <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
//               <div className="font-semibold text-sm">2-Year Warranty</div>
//               <div className="text-xs text-gray-500">Full protection</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="max-w-7xl mx-auto px-4 mt-20">
//         <h1 className="text-3xl font-bold my-6">Related Products</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products
//             .filter(
//               (p) => p.category === product.category && p.id !== product.id
//             )
//             .slice(0, 6)
//             .map((related) => (
//               <Card
//                 key={related.id}
//                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
//               >
//                 <div className="relative">
//                   <div className="relative h-56 overflow-hidden">
//                     <Image
//                       src={related.images?.[0] || "/placeholder.svg"}
//                       alt={related.name}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     {related.badge && (
//                       <Badge className="absolute top-3 left-3 bg-red-500">
//                         {related.badge}
//                       </Badge>
//                     )}
//                     {!related.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge
//                           variant="destructive"
//                           className="text-lg px-4 py-2"
//                         >
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>

//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                       {related.name}
//                     </h3>

//                     <div className="flex items-center gap-1 mb-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(related.rating)
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-1">
//                         ({related.reviews})
//                       </span>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {related.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {related.features.slice(0, 3).map((feature, index) => (
//                         <Badge
//                           key={index}
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {feature}
//                         </Badge>
//                       ))}
//                       {related.features.length > 3 && (
//                         <Badge variant="outline" className="text-xs">
//                           +{related.features.length - 3} more
//                         </Badge>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ${related.price}
//                       </span>
//                       {related.originalPrice && (
//                         <span className="text-lg text-gray-500 line-through">
//                           ${related.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </CardContent>
//                 </div>

//                 <div className="px-2 pb-4 flex flex-col mt-auto">
//                   <Link href={`/products/${related.id}`} className="w-full">
//                     <Button variant="default" className="w-full">
//                       View More
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }


/////
////////


// Updated ProductDetailsPage with Redux integration
"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Star,
  Check,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useProduct, useProducts } from "@/lib/api/products";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { toast } from "sonner"; // or your preferred toast library

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id as string);
  const { data: products = [] } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  
  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector((state) => state.cart);

  // Set default image when product loads
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || "/placeholder.svg",
        inStock: product.inStock,
        category: product.category,
      }));
    }
    
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
    setQuantity(1); // Reset quantity
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="max-w-4xl mx-auto w-full">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow group">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto">
            {product.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
                  selectedImage === img ? "border-gray-500" : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`Preview ${index}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {product.inStock ? (
              <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                In Stock
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="px-3 py-1 text-sm font-medium"
              >
                Out of Stock
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 text-2xl font-bold">
            <span>${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg line-through text-gray-500">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center px-3 py-2 gap-4 border rounded-lg">
              <span className="text-sm font-medium">Quantity:</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="text-lg font-medium w-6 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>

            {/* Add to Cart Button */}
            <div className="flex-1">
              <Button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="w-full text-lg px-6 py-5 bg-blue-600 hover:bg-blue-700"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart – ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Cart Badge */}
          {itemCount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                {itemCount} item(s) in cart
              </span>
              <Link href="/cart">
                <Button variant="outline" size="sm" className="ml-auto">
                  View Cart
                </Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <div className="font-semibold text-sm">Free Shipping</div>
              <div className="text-xs text-gray-500">On orders over $50</div>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <div className="font-semibold text-sm">30-Day Returns</div>
              <div className="text-xs text-gray-500">No questions asked</div>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
              <div className="font-semibold text-sm">2-Year Warranty</div>
              <div className="text-xs text-gray-500">Full protection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <h1 className="text-3xl font-bold my-6">Related Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .slice(0, 6)
            .map((related) => (
              <Card
                key={related.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
              >
                <div className="relative">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={related.images?.[0] || "/placeholder.svg"}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {related.badge && (
                      <Badge className="absolute top-3 left-3 bg-red-500">
                        {related.badge}
                      </Badge>
                    )}
                    {!related.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge
                          variant="destructive"
                          className="text-lg px-4 py-2"
                        >
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {related.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(related.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({related.reviews})
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {related.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {related.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {related.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{related.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${related.price}
                      </span>
                      {related.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${related.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>

                <div className="px-2 pb-4 flex flex-col mt-auto">
                  <Link href={`/products/${related.id}`} className="w-full">
                    <Button variant="default" className="w-full">
                      View More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
