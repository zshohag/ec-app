// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel";
// import { Button } from "@/components/ui/button";
// import { ShoppingBag, Truck, Sparkles } from "lucide-react";

// // const slides = [
// //   {
// //     src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
// //     alt: "Summer Sale Banner",
// //     headline: "🔥 Summer Sale 50% OFF",
// //     subtext: "On all electronics until Sunday — Hurry up!",
// //     cta: "Shop Now",
// //     gradient: "from-orange-500/80 via-red-500/70 to-pink-600/80",
// //     icon: <ShoppingBag className="w-8 h-8" />,
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
// //     alt: "Free Shipping Banner",
// //     headline: "🚚 Free Shipping",
// //     subtext: "On orders over $100 — Today only!",
// //     cta: "Order Now",
// //     gradient: "from-blue-500/80 via-purple-500/70 to-indigo-600/80",
// //     icon: <Truck className="w-8 h-8" />,
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
// //     alt: "New Arrivals Banner",
// //     headline: "🆕 New Arrivals",
// //     subtext: "Check out the latest tech & gadgets",
// //     cta: "Explore",
// //     gradient: "from-green-500/80 via-teal-500/70 to-cyan-600/80",
// //     icon: <Sparkles className="w-8 h-8" />,
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
// //     alt: "Premium Collection",
// //     headline: "✨ Premium Collection",
// //     subtext: "Luxury items with exclusive discounts",
// //     cta: "Discover",
// //     gradient: "from-purple-500/80 via-pink-500/70 to-rose-600/80",
// //     icon: <Sparkles className="w-8 h-8" />,
// //   },
// // ];

// const slides = [
//   {
//     src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//     alt: "Summer Sale Banner",
//     headline: "🔥 Summer Sale 50% OFF",
//     subtext: "On all electronics until Sunday — Hurry up!",
//     cta: "Shop Now",
//     gradient: "from-orange-500/40 via-red-500/30 to-pink-600/40",
//     icon: <ShoppingBag className="w-8 h-8" />,
//   },
//   {
//     src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
//     alt: "Free Shipping Banner",
//     headline: "🚚 Free Shipping",
//     subtext: "On orders over $100 — Today only!",
//     cta: "Order Now",
//     gradient: "from-blue-500/40 via-purple-500/30 to-indigo-600/40",
//     icon: <Truck className="w-8 h-8" />,
//   },
//   {
//     src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
//     alt: "New Arrivals Banner",
//     headline: "🆕 New Arrivals",
//     subtext: "Check out the latest tech & gadgets",
//     cta: "Explore",
//     gradient: "from-green-500/40 via-teal-500/30 to-cyan-600/40",
//     icon: <Sparkles className="w-8 h-8" />,
//   },
//   {
//     src: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
//     alt: "Premium Collection",
//     headline: "✨ Premium Collection",
//     subtext: "Luxury items with exclusive discounts",
//     cta: "Discover",
//     gradient: "from-purple-500/40 via-pink-500/30 to-rose-600/40",
//     icon: <Sparkles className="w-8 h-8" />,
//   },
// ];



// export default function HomeSlider() {
//   const [api, setApi] = React.useState<CarouselApi>();
//   const [current, setCurrent] = React.useState(0);
//   //const [count, setCount] = React.useState(0);

//   // Enhanced autoplay configuration
//   const plugin = React.useRef(
//     Autoplay({
//       delay: 3000,
//       stopOnInteraction: false, // Keep autoplay running
//       stopOnMouseEnter: true, // Only stop on hover
//       playOnInit: true, // Start immediately
//     })
//   );

//   React.useEffect(() => {
//     if (!api) {
//       return;
//     }

//     //setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   // Function to go to specific slide
//   const goToSlide = (index: number) => {
//     if (api) {
//       api.scrollTo(index);
//     }
//   };

//   // Restart autoplay after user interaction
//   const handleMouseLeave = () => {
//     plugin.current.reset();
//     plugin.current.play();
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <Carousel
//         setApi={setApi}
//         plugins={[plugin.current]}
//         className="w-full relative"
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={handleMouseLeave}
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//       >
//         <CarouselContent>
//           {slides.map((slide, index) => (
//             <CarouselItem key={index} className="relative">
//               <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
//                 <Image
//                   src={slide.src || "/placeholder.svg"}
//                   alt={slide.alt}
//                   fill
//                   className="object-cover transition-transform duration-700 hover:scale-105"
//                   priority={index === 0}
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
//                 />

//                 {/* Gradient Overlay */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} rounded-2xl`}
//                 />

//                 {/* Animated Background Pattern */}
//                 <div className="absolute inset-0 opacity-10">
//                   <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
//                   <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-1000" />
//                   <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-500" />
//                 </div>

//                 {/* Content */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className="mb-6"
//                   >
//                     <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 inline-block">
//                       {slide.icon}
//                     </div>
//                   </motion.div>

//                   <motion.h2
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                     className="text-white text-3xl md:text-6xl font-bold mb-4 drop-shadow-2xl leading-tight"
//                   >
//                     {slide.headline}
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                     className="text-white/90 text-lg md:text-2xl mb-8 drop-shadow-lg font-medium max-w-2xl"
//                   >
//                     {slide.subtext}
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.8 }}
//                   >
//                     <Button
//                       size="lg"
//                       className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
//                     >
//                       {slide.cta}
//                     </Button>
//                   </motion.div>
//                 </div>

//                 {/* Decorative Elements */}
//                 {/* <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
//                   <span className="text-white font-semibold text-sm">
//                     Limited Time
//                   </span>
//                 </div> */}
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Custom Navigation Buttons */}
//         <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg" />
//         <CarouselNext className="right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg" />

//         {/* Interactive Slide Indicators (Dots) */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
//                 current === index + 1
//                   ? "bg-white shadow-lg scale-110"
//                   : "bg-white/50 hover:bg-white/70"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//         {/* Slide Counter */}
//         {/* <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
//           <span className="text-white text-sm font-medium">
//             {current} / {count}
//           </span>
//         </div> */}
//       </Carousel>

//       {/* Additional Features Section */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {slides.map((slide, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
//             onClick={() => goToSlide(index)}
//           >
//             <div className="flex items-center mb-4">
//               <div
//                 className={`bg-gradient-to-r ${slide.gradient} rounded-lg p-3 text-white mr-4`}
//               >
//                 {slide.icon}
//               </div>
//               <h3 className="font-bold text-lg text-gray-800">
//                 {slide.headline.replace(/[🔥🚚🆕✨]/gu, "").trim()}
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-4">{slide.subtext}</p>
//             <Button
//               variant="outline"
//               className="w-full hover:bg-gray-800 hover:text-white transition-colors bg-transparent"
//             >
//               {slide.cta}
//             </Button>
//           </motion.div>
//         ))}
//       </div>

//       {/* Progress Bar */}
//       {/* <div className="mt-8 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//         <div
//           className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
//           style={{ width: `${(current / count) * 100}%` }}
//         />
//       </div> */}
//     </div>
//   );
// }

"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, Sparkles } from "lucide-react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Summer Sale Banner",
    headline: "🔥 Summer Sale 50% OFF",
    subtext: "On all electronics until Sunday — Hurry up!",
    cta: "Shop Now",
    gradientImage: "from-orange-500/40 via-red-500/30 to-pink-600/40",
    gradientIcon: "from-orange-500 to-pink-500",
    icon: <ShoppingBag className="w-8 h-8" />,
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    alt: "Free Shipping Banner",
    headline: "🚚 Free Shipping",
    subtext: "On orders over $100 — Today only!",
    cta: "Order Now",
    gradientImage: "from-blue-500/40 via-purple-500/30 to-indigo-600/40",
    gradientIcon: "from-blue-500 to-indigo-500",
    icon: <Truck className="w-8 h-8" />,
  },
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80",
    alt: "New Arrivals Banner",
    headline: "🆕 New Arrivals",
    subtext: "Check out the latest tech & gadgets",
    cta: "Explore",
    gradientImage: "from-green-500/40 via-teal-500/30 to-cyan-600/40",
    gradientIcon: "from-green-500 to-cyan-500",
    icon: <Sparkles className="w-8 h-8" />,
  },
  {
    src: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80",
    alt: "Premium Collection",
    headline: "✨ Premium Collection",
    subtext: "Luxury items with exclusive discounts",
    cta: "Discover",
    gradientImage: "from-purple-500/40 via-pink-500/30 to-rose-600/40",
    gradientIcon: "from-purple-500 to-rose-500",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

export default function HomeSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const goToSlide = (index: number) => {
    if (api) api.scrollTo(index);
  };

  const handleMouseLeave = () => {
    plugin.current.reset();
    plugin.current.play();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={handleMouseLeave}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative">
              <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={index === 0}
                  sizes="100vw"
                />

                {/* Gradient Overlay for Image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradientImage} rounded-2xl`}
                />

                {/* Animated Blobs */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-1000" />
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-xl animate-pulse delay-500" />
                </div>

                {/* Slide Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6"
                  >
                    <div
                      className={`bg-gradient-to-r ${slide.gradientIcon} rounded-full p-4 mb-4 inline-block text-white`}
                    >
                      {slide.icon}
                    </div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-3xl md:text-6xl font-bold mb-4 drop-shadow-2xl leading-tight"
                  >
                    {slide.headline}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-white/90 text-lg md:text-2xl mb-8 drop-shadow-lg font-medium max-w-2xl"
                  >
                    {slide.subtext}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    >
                      {slide.cta}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg" />
        <CarouselNext className="right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12 shadow-lg" />

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                current === index + 1
                  ? "bg-white shadow-lg scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>

      {/* Feature Cards Below Slider */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => goToSlide(index)}
          >
            <div className="flex items-center mb-4">
              <div
                className={`bg-gradient-to-r ${slide.gradientIcon} rounded-lg p-3 text-white mr-4`}
              >
                {slide.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-800">
                {slide.headline.replace(/[🔥🚚🆕✨]/gu, "").trim()}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{slide.subtext}</p>
            <Button
              variant="outline"
              className="w-full hover:bg-gray-800 hover:text-white transition-colors bg-transparent"
            >
              {slide.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
