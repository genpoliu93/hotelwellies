import { Header } from "@/components/header";
import {
  ZenHero,
  ZenAbout,
  ZenFeatures,
  ZenRooms,
  ZenTestimonials,
  ZenGallery,
  ZenContact,
} from "@/components/zen-components";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      <Header />
      <ZenHero />
      <ZenAbout />
      <ZenFeatures />
      <ZenRooms />
      <ZenTestimonials />
      <ZenGallery />
      <ZenContact />
      <Footer />
    </main>
  );
}
