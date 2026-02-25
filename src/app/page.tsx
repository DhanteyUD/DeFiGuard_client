import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#282632]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
