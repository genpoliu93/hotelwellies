import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking/booking-form";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";
import { Suspense } from "react";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

// BookingForm的Loading组件
function BookingFormLoader() {
  return (
    <div className="py-16 bg-[#f8f9fa]">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
                  <div className="space-y-6">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-40 bg-white rounded-xl shadow-sm border border-gray-100"></div>
                <div className="h-32 bg-white rounded-xl shadow-sm border border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = translations[locale];
  const booking = t.booking as any;

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
                {booking.heroTitle}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                {booking.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<BookingFormLoader />}>
        <BookingForm />
      </Suspense>
      <Footer />
    </main>
  );
}
