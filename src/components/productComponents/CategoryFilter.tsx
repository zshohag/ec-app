"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categories } from "@/data/products"


interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center gap-2"
        >
          {category.name}
          <Badge variant="secondary" className="ml-1">
            {category.count}
          </Badge>
        </Button>
      ))}
    </div>
  )
}
