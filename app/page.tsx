import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import HowItWorks from "@/components/home/HowItWorks";
import PopularCategories from "@/components/home/PopularCategories";
import StatsSection from "@/components/home/StatsSection";
import FeaturedLocalPros from "@/components/home/FeaturedLocalPros";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <PopularCategories />
      <StatsSection />
      <FeaturedLocalPros />
      <Testimonials />
      <CTASection />
    </main>
  );
}