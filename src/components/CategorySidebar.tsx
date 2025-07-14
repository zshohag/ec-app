"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/products";
import { ShoppingBag } from "lucide-react";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategorySidebar({
  selectedCategory,
  onCategoryChange,
}: CategorySidebarProps) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="space-y-3">
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          className="w-full justify-start text-left h-auto p-2 transition"
          onClick={() => onCategoryChange("all")}
        >
          <ShoppingBag
            className={`w-5 h-5 mr-3 transition-colors ${
              selectedCategory === "all" ? "text-white" : "text-primary"
            }`}
          />
          <div className="flex-1">
            <div className="font-semibold">All Products</div>
            <div className="text-sm text-gray-500">View everything</div>
          </div>
        </Button>

        {categories.map((category) => {
          const Icon = category.icon; // Lucide icon component
          const isSelected = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "ghost"}
              className="w-full justify-start text-left h-auto p-2 transition"
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon
                className={`w-5 h-5 mr-3 transition-colors ${
                  isSelected ? "text-white" : "text-primary"
                }`}
              />

              <div className="flex-1">
                <div className="font-semibold">{category.name}</div>
                {/* <div className="text-sm text-gray-500">{category.count} items</div> */}
              </div>

              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">🎉 Special Offers</h3>
        <p className="text-sm text-gray-600 mb-3">
          Get 20% off on your first order!
        </p>
        <Button size="sm" className="w-full">
          Claim Offer
        </Button>
      </div>
    </div>
  );
}


/////not 
// "use client"

// import { Button } from "@/components/ui/button"
// import { categories } from "@/data/products"

// interface CategorySidebarProps {
//   selectedCategory: string
//   onCategoryChange: (category: string) => void
// }

// // const categories = [
// //   { id: "all", name: "All Products", count: 24 },
// //   { id: "health-beauty", name: "Health & Beauty", count: 8 },
// //   { id: "baby", name: "Baby Items", count: 6 },
// //   { id: "home-kitchen", name: "Home & Kitchen", count: 5 },
// //   { id: "grocery", name: "Grocery", count: 3 },
// //   { id: "art-craft", name: "Art & Craft", count: 2 },
// // ]

// export function CategorySidebar({ selectedCategory, onCategoryChange }: CategorySidebarProps) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
//       <div className="space-y-2">
//         {categories.map((category) => (
//           <Button
//             key={category.id}
//             variant={selectedCategory === category.id ? "default" : "ghost"}
//             className="w-full justify-between h-auto py-3 px-4"
//             onClick={() => onCategoryChange(category.id)}
//           >
//             <span className="text-left">{category.name}</span>
//             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{category.count}</span>
//           </Button>
//         ))}
//       </div>
//     </div>
//   )
// }

