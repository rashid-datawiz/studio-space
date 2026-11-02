import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturedStudios } from "@/components/home/FeaturedStudios";
import { BrowseCategories } from "@/components/home/BrowseCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HostGuarantee } from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <BrowseCategories />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}
