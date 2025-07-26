// "use client";

// import { Button } from "@/components/ui/button";
// import { Truck, Tag, Sparkles, Star } from "lucide-react";

// export default function AboutPage() {
//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="py-16 px-4 text-center">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
//             🛍️ Welcome to ShopHub
//           </h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Discover top-quality items across Health & Beauty, Baby Products, Home & Kitchen, Grocery,
//             Chocolate & Candy, Art & Craft, and Lawn & Garden — all in one place.
//           </p>
//           <div className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg">
//             🎉 Summer Sale 50% OFF — Until Sunday!
//           </div>
//           <div className="mt-6">
//             <Button size="lg" className="text-lg px-6 py-4">
//               Shop Now
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//         <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
//           <Truck className="w-10 h-10 mx-auto text-blue-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
//           <p className="text-gray-600 text-sm">
//             On orders over $100 — Today only!
//           </p>
//           <Button variant="link" className="mt-4 text-blue-600">
//             Order Now →
//           </Button>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
//           <Tag className="w-10 h-10 mx-auto text-red-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Big Discounts</h3>
//           <p className="text-gray-600 text-sm">
//             Save up to 50% on Health & Beauty, Baby Products, and more.
//           </p>
//           <Button variant="link" className="mt-4 text-red-600">
//             Shop Deals →
//           </Button>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
//           <Sparkles className="w-10 h-10 mx-auto text-green-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">New Arrivals</h3>
//           <p className="text-gray-600 text-sm">
//             Fresh stock in Grocery, Lawn & Garden, and Art & Craft.
//           </p>
//           <Button variant="link" className="mt-4 text-green-600">
//             Explore →
//           </Button>
//         </div>

//         <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
//           <Star className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
//           <h3 className="text-xl font-semibold mb-2">Premium Collection</h3>
//           <p className="text-gray-600 text-sm">
//             Handpicked luxury items across all categories — just for you.
//           </p>
//           <Button variant="link" className="mt-4 text-yellow-600">
//             View Collection →
//           </Button>
//         </div>
//       </section>

//       {/* About Us Text */}
//       <section className="py-16 px-4 bg-gray-100">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Why Choose ShopHub?</h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             At ShopHub, we bring you a carefully curated range of Health & Beauty essentials, Baby Products,
//             kitchenware, snacks, crafts, and gardening tools. With fast delivery, great prices, and excellent customer service,
//             shopping has never been more satisfying.
//           </p>
//         </div>
//       </section>

//       {/* Footer CTA */}
//       <section className="py-12 px-4 bg-white text-center">
//         <div className="max-w-2xl mx-auto">
//           <h3 className="text-2xl font-semibold mb-3">
//             Ready to explore the best products across all your favorite categories?
//           </h3>
//           <Button size="lg" className="text-lg px-8 py-4">
//             Start Shopping
//           </Button>
//         </div>
//       </section>
//     </div>
//   );
// }

///update

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Tag,
  Sparkles,
  Star,
  Heart,
  Baby,
  Home,
  ShoppingCart,
  Candy,
  Palette,
  Flower2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for everything you need and love. From
            health & beauty essentials to home comforts, we bring you quality
            products across all categories of life.
          </p>
          <div className="mt-6">
            <Link href="/products">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Heart className="w-8 h-8 mx-auto text-pink-500 mb-3" />
              <h3 className="font-semibold text-sm">Health & Beauty</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Baby className="w-8 h-8 mx-auto text-blue-500 mb-3" />
              <h3 className="font-semibold text-sm">Baby Products</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Home className="w-8 h-8 mx-auto text-green-500 mb-3" />
              <h3 className="font-semibold text-sm">Home & Kitchen</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <ShoppingCart className="w-8 h-8 mx-auto text-orange-500 mb-3" />
              <h3 className="font-semibold text-sm">Grocery</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Candy className="w-8 h-8 mx-auto text-red-500 mb-3" />
              <h3 className="font-semibold text-sm">Chocolate & Candy</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Palette className="w-8 h-8 mx-auto text-purple-500 mb-3" />
              <h3 className="font-semibold text-sm">Art & Craft</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Flower2 className="w-8 h-8 mx-auto text-emerald-500 mb-3" />
              <h3 className="font-semibold text-sm">Lawn & Garden</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Truck className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Free Shipping
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              On orders over $100 — Today only!
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Order Now →
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Tag className="w-12 h-12 mx-auto text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Big Discounts
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Save up to 50% on your favorite products across all categories.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Shop Deals →
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Sparkles className="w-12 h-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              New Arrivals
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore the latest products in health, beauty, home, and more.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Explore →
              </Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Star className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Premium Collection
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Shop premium products with exclusive VIP member discounts.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                View Collection →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Text */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Why Choose ShopHub?
          </h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At ShopHub, we believe shopping should be exciting, easy, and
              affordable. Whether you&apos;re looking for health & beauty
              essentials, baby products, home & kitchen necessities, fresh
              groceries, sweet treats, creative art supplies, or garden tools —
              we&apos;ve got you covered.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our curated collections span across all aspects of your life,
              ensuring you find exactly what you need with fast shipping,
              reliable support, and unbeatable prices. From everyday essentials
              to special treats, we make shopping a delightful experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Ready to discover amazing deals across all categories?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of happy customers who trust ShopHub for all their
            shopping needs.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
