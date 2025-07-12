import EcommerceCatalog from "@/components/EcommerceCatalogContent";
import HomeSlider from "@/components/HomeSlider";
import { MarqueeSlider } from "@/components/MarqueeSlider";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <HomeSlider />
      <EcommerceCatalog />
      <MarqueeSlider />
    </div>
  );
}
