// src/app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Check, Truck, RotateCcw, Shield } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { dispatch } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="text-center py-20 text-xl text-gray-600">Product not found</div>;
  }

  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative h-[500px] rounded-xl overflow-hidden shadow">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-red-500">{product.badge}</Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 text-2xl font-bold">
            <span>${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg line-through text-gray-500">${product.originalPrice}</span>
                <Badge variant="destructive">{discount}% OFF</Badge>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <Check className="text-green-500" />
                <span className="text-green-600 font-medium">In Stock</span>
              </>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
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

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full text-lg py-6"
          >
            <ShoppingCart className="mr-2 w-5 h-5" />
            Add to Cart - ${product.price}
          </Button>

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
    </div>
  );
}
