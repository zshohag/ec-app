// "use client";

// import type React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import type { Product } from "../types/product";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star, ShoppingCart, Eye, Heart } from "lucide-react";

// interface ProductCardProps {
//   product: Product;
//   onViewDetails: (product: Product) => void;
// }

// export function ProductCard({ product, onViewDetails }: ProductCardProps) {
//   //const { dispatch } = useCart();



//   const handleViewDetails = () => {
//     onViewDetails(product);
//   };

//   return (
//     <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between">
//       <div className="relative" onClick={handleViewDetails}>
//         {/* Product Image */}
//         <div className="relative h-56 overflow-hidden">
//           <Image
//             src={product.images?.[0] || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             className="object-cover group-hover:scale-105 transition-transform duration-300"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           />
//           {product.badge && (
//             <Badge className="absolute top-3 left-3 bg-red-500">
//               {product.badge}
//             </Badge>
//           )}

//           {!product.inStock && (
//             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//               <Badge variant="destructive" className="text-lg px-4 py-2">
//                 Out of Stock
//               </Badge>
//             </div>
//           )}

//           <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
//             <Button size="icon" variant="secondary" className="rounded-full">
//               <Heart className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Product Info */}
//         <CardContent className="p-4">
//           <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {product.name}
//           </h3>

//           <div className="flex items-center gap-1 mb-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-sm text-gray-600 ml-1">
//               ({product.reviews})
//             </span>
//           </div>

//           <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//             {product.description}
//           </p>

//           <div className="flex flex-wrap gap-1 mb-3">
//             {product.features.slice(0, 3).map((feature, index) => (
//               <Badge key={index} variant="outline" className="text-xs">
//                 {feature}
//               </Badge>
//             ))}
//             {product.features.length > 3 && (
//               <Badge variant="outline" className="text-xs">
//                 +{product.features.length - 3} more
//               </Badge>
//             )}
//           </div>

//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-2xl font-bold text-gray-900">
//               ${product.price}
//             </span>
//             {product.originalPrice && (
//               <span className="text-lg text-gray-500 line-through">
//                 ${product.originalPrice}
//               </span>
//             )}
//           </div>
//         </CardContent>
//       </div>

//       {/* Buttons Section */}
//       <div className="px-2 pb-4 flex flex-col gap-2 mt-auto">
//         <div className="flex gap-2">
//           <Button
            
//             disabled={!product.inStock}
//             className="flex-1"
//           >
//             <ShoppingCart className="w-4 h-4 mr-2" />
//             Add to Cart
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleViewDetails();
//             }}
//           >
//             <Eye className="w-4 h-4" />
//           </Button>
//         </div>

//         <Link href={`/products/${product.id}`} className="w-full">
//           <Button variant="secondary" className="w-full">
//             View More
//           </Button>
//         </Link>
//       </div>
//     </Card>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import type { Product } from "../types/types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { addToCart } from "@/lib/store/slices/cartSlice";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between">
      <div className="relative" onClick={handleViewDetails}>
        {/* Product Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={product.images?.[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              {product.badge}
            </Badge>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}

          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({product.reviews})
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {product.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* Buttons Section */}
      <div className="px-2 pb-4 flex flex-col gap-2 mt-auto">
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        <Link href={`/products/${product.id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            View More
          </Button>
        </Link>
      </div>
    </Card>
  );
}

