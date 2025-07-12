"use client";

import { Button } from "@/components/ui/button";
import { Truck, Tag, Sparkles, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 to-orange-200 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            🛍️ Welcome to ShopHub
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your one-stop shop for all things tech and trendy. Discover exclusive offers,
            unbeatable deals, and the newest gadgets, all in one place.
          </p>
          <div className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg">
            🎉 Summer Sale 50% OFF — Until Sunday!
          </div>
          <div className="mt-6">
            <Button size="lg" className="text-lg px-6 py-4">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <Truck className="w-10 h-10 mx-auto text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600 text-sm">
            On orders over $100 — Today only!
          </p>
          <Button variant="link" className="mt-4 text-blue-600">
            Order Now →
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <Tag className="w-10 h-10 mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Big Discounts</h3>
          <p className="text-gray-600 text-sm">
            Save up to 50% on your favorite electronics and accessories.
          </p>
          <Button variant="link" className="mt-4 text-red-600">
            Shop Deals →
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <Sparkles className="w-10 h-10 mx-auto text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">New Arrivals</h3>
          <p className="text-gray-600 text-sm">
            Explore the latest tech, wearables, and home gadgets.
          </p>
          <Button variant="link" className="mt-4 text-green-600">
            Explore →
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <Star className="w-10 h-10 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Collection</h3>
          <p className="text-gray-600 text-sm">
            Shop luxury electronics with exclusive VIP discounts.
          </p>
          <Button variant="link" className="mt-4 text-yellow-600">
            View Collection →
          </Button>
        </div>
      </section>

      {/* About Us Text */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose ShopHub?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At ShopHub, we believe shopping should be exciting, easy, and affordable.
            Whether you&apos;re a tech enthusiast or a casual buyer, our curated collections,
            fast shipping, and reliable support make sure you get what you need — fast.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-3">
            Ready to grab the best tech deals of the season?
          </h3>
          <Button size="lg" className="text-lg px-8 py-4">
            Start Shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
