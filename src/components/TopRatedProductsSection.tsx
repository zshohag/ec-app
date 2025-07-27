"use client"

import { useState } from "react"
import { useProducts } from "@/lib/api/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { Product } from "@/types/types"

export default function TopRatedProductsSection() {
  const { data: products = [], isLoading, isError } = useProducts()
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({})

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load products.</div>

  // Filter only "Top Rated"
  const topRatedProducts = products.filter((product: Product) => product.badge === "Top Rated")

  if (topRatedProducts.length === 0) {
    return <div className="text-center text-gray-500 py-10">No Top Rated products available.</div>
  }

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Recommendations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of top-rated products that our customers love most.
          </p>
        </div>

        {topRatedProducts.map((product) => {
          const imageIndex = currentImageIndex[product.id] || 0

          return (
            <Card key={product.id} className="max-w-5xl mx-auto mb-16 overflow-hidden shadow-2xl border-0">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Images */}
                  <div className="relative bg-white p-8">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1">
                        {product.badge}
                      </Badge>
                    </div>

                    <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-50">
                      <Image
                        src={product.images[imageIndex] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-300"
                      />
                    </div>

                    <div className="flex gap-2 justify-center">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setCurrentImageIndex((prev) => ({ ...prev, [product.id]: idx }))
                          }
                          className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            imageIndex === idx
                              ? "border-blue-500 ring-2 ring-blue-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 lg:p-12 bg-white">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                        <span className="text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {product.quantity} in stock
                        </Badge>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4 pt-4">
                        <Button size="lg" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                        <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Extra Info */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Category: {product.category.replace("-", " ")}</span>
                          <span className="text-green-600 font-medium">✓ In Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
