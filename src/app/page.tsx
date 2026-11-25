import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VinylShowcase from "@/components/VinylShowcase";
import MusicVideoSection from "@/components/MusicVideoSection";
import Overview from "@/components/Overview";
import GigsSection from "@/components/GigsSection";
import MusicSection from "@/components/MusicSection";
import MerchSection from "@/components/MerchSection";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black w-full max-w-full overflow-x-clip">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section with Live Video Footage & Centered Logo */}
      <Hero />

      {/* 3. Featured New Single - Dramatic Interactive Vinyl Experience */}
      <VinylShowcase />

      {/* 4. Jadwal Manggung & Ticket Stub Showcase */}
      <GigsSection />

      {/* 5. Karya Musik - Fanned Album Deck & Interactive Audio Catalog */}
      <MusicSection />

      {/* 6. Rilisan Fisik & Merch (High-Contrast Editorial Paper) */}
      <MerchSection />

      {/* 7. Manifesto Band & Milestone Ledger (Clean White Editorial) */}
      <Overview />

      {/* 8. Kisah Perjalanan & Formasi 8 Personel */}
      <StorySection />

      {/* 9. Official Music Video Section (Drive Preview -> YouTube on release) */}
      <MusicVideoSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
