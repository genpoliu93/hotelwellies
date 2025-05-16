import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking/booking-form";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/translations";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="relative">
        <div className="h-[300px] relative w-full overflow-hidden">
          <Image
            src="/images/hotel-terrace.webp"
            alt="Hotel Wellies booking"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Book Your Stay
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                Experience the charm and comfort of Hotel Wellies
              </p>
            </div>
          </div>
        </div>
      </div>
      <BookingForm />
      <Footer />
    </main>
  );
}
