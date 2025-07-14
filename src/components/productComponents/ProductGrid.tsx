"use client"

import { useState, useMemo } from "react"

import SearchBar from "./SearchBar"
import CategoryFilter from "./CategoryFilter"
import { products } from "@/data/products"
import ProductCard from "./ProductCard"

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    return filtered
  }, [selectedCategory, searchTerm])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
        <p className="text-muted-foreground">Discover our wide range of quality products across multiple categories</p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} products
          {selectedCategory !== "all" && ` in ${selectedCategory.replace("-", " & ")}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  )
}
