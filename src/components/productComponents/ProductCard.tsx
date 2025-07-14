import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/types/product"


interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{product.badge}</Badge>}
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

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

        <div className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
