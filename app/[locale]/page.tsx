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
import { SideMenu } from "@/components/side-menu";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function Home() {
  return (
    <>
      <SideMenu />
      <ZenHero />
      {/* 滚动内容区域 - 会遮盖固定的 banner */}
      <main className="relative z-20 bg-stone-50 pt-24 text-stone-800 lg:pt-0">
        <ZenAbout />
        <ZenFeatures />
        <ZenRooms />
        <ZenTestimonials />
        <ZenGallery />
        <ZenContact />
        <Footer />
      </main>
    </>
  );
}
