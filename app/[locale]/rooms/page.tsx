import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RoomGallery } from "@/components/room-gallery";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = translations[locale];
  const rooms = t.rooms as any;

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-stone-100">
      <Header />
      <div className="relative">
        {/* Hero Section */}
        <div className="h-[400px] relative w-full overflow-hidden">
          <Image
            src="/images/hotel-exterior.webp"
            alt="Hotel Wellies Rooms"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
          {/* 渐变覆盖层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* 微妙纹理覆盖层 */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-6 max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-6xl font-light tracking-wide mb-6">
                {rooms.galleryTitle || "Room Gallery"}
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mx-auto leading-relaxed">
                {rooms.gallerySubtitle ||
                  "Discover the comfort and elegance of our rooms"}
              </p>

              {/* 装饰线条 */}
              <div className="flex justify-center items-center space-x-8 pt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RoomGallery />
      <Footer />
    </main>
  );
}
