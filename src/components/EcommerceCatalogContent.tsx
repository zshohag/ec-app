"use client";
 
import { useState, useMemo } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CategorySidebar } from "./CategorySidebar";
import { ProductCard } from "./ProductCard";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { categories } from "@/data/products";
import { Product } from "@/types/types";
import { useProducts } from "@/lib/api/products";

function EcommerceCatalogContent() {
  const { data: allProducts = [], isLoading: loading } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Filtering products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.features?.some((feature) =>
            feature.toLowerCase().includes(query)
          )
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, searchQuery]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="lg:hidden bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>

                  <div className="text-sm text-gray-600">
                    {filteredProducts.length} products found
                  </div>
                </div>
              </div>

              {/* Mobile Category Pills */}
              <div className="lg:hidden mt-4 flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="whitespace-nowrap flex items-center gap-2"
                >
                  <ShoppingBag
                    className={`w-4 h-4 ${
                      selectedCategory === "all"
                        ? "text-white"
                        : "text-primary"
                    }`}
                  />
                  All
                </Button>

                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;

                  return (
                    <Button
                      key={category.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap flex items-center gap-2"
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isSelected ? "text-white" : "text-primary"
                        }`}
                      />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default function EcommerceCatalog() {
  return (
    <>
      <EcommerceCatalogContent />
    </>
  );
}
