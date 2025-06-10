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
import type { Locale } from "@/lib/i18n/translations";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">
      <Header />
      <ZenHero />
      <ZenAbout />
      <ZenFeatures />
      <ZenRooms />
      <ZenGallery />
      <ZenContact />
      <Footer />
    </main>
  );
}
