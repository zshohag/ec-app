"use client";

import type { Product } from "../types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  ShoppingCart,
  Check
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const { dispatch } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="relative h-52 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
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
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">In Stock</span>
                </>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div> */}

            {/* Features */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="sm"
              className="w-full text-lg py-4 mt-2"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart - ${product.price}
            </Button>

            {/* Additional Info */}
            {/* <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-semibold">Free Shipping</div>
                <div className="text-xs text-gray-500">Orders over $50</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-sm font-semibold">30-Day Returns</div>
                <div className="text-xs text-gray-500">Easy returns</div>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="text-sm font-semibold">2-Year Warranty</div>
                <div className="text-xs text-gray-500">Full coverage</div>
              </div>
            </div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
