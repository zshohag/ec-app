// import EcommerceCatalog from "@/components/EcommerceCatalogContent";
// import HomeSlider from "@/components/HomeSlider";
// import { MarqueeSlider } from "@/components/MarqueeSlider";
// import ProductGrid from "@/components/productComponents/ProductGrid";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">

//       <HomeSlider />

//        <ProductGrid />

//       <EcommerceCatalog />
//       <MarqueeSlider />
//     </div>
//   );
// }

import EcommerceCatalog from "@/components/EcommerceCatalogContent";
import HomeSlider from "@/components/HomeSlider";
import { MarqueeSlider } from "@/components/MarqueeSlider";
import TopRatedProductsSection from "@/components/TopRatedProductsSection";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <EcommerceCatalog />
      <TopRatedProductsSection />
      <MarqueeSlider />
    </div>
  );
}
