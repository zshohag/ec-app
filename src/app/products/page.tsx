"use client";
import EcommerceCatalog from "@/components/EcommerceCatalogContent";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const promos = [
  "🔥 Summer Sale - Up to 50% OFF on all electronics!",
  "🚚 Free Shipping on orders over $100!",
  "🆕 Discover the latest arrivals – Shop now!",
  "🎁 Special Deals for Premium Members!",
  "💸 Flash Sale Ending Soon – Don’t Miss Out!",
];

const page = () => {
  return (
    <div>
      <div className="max-w-7xl w-full px-4 py-2 mx-auto mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white shadow-md">
        <Marquee pauseOnHover className="[--duration:40s]">
          {promos.map((text, index) => (
            <div
              key={index}
              className={cn(
                "mx-6 flex items-center gap-2 text-sm md:text-base font-medium tracking-wide"
              )}
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              {text}
            </div>
          ))}
        </Marquee>
      </div>
      <EcommerceCatalog />
    </div>
  );
};

export default page;
