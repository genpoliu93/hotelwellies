import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/translations";
import { translations } from "@/lib/i18n/translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Mail, Home } from "lucide-react";
import { SideMenu } from "@/components/side-menu";

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = translations[locale];
  const maintenance = t.maintenance as any;

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-24 text-stone-800 lg:pt-0 lg:pl-72">
      <SideMenu />
      <div className="relative">
        <div className="h-[300px] relative w-full overflow-hidden">
          <Image
            src="/images/hotel-terrace.webp"
            alt="Hotel Wellies maintenance"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {maintenance.title}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                {maintenance.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
                {maintenance.title}
              </CardTitle>
              <p className="text-lg text-gray-600 leading-relaxed">
                {maintenance.message}
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {maintenance.contactInfo}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{maintenance.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{maintenance.email}</span>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-green-600 font-medium">
                  {maintenance.expectedResolution}
                </p>
                <p className="text-gray-600">{maintenance.thankYou}</p>
              </div>

              <div className="flex justify-center pt-6">
                <Link href={`/${locale}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    <Home className="h-4 w-4 mr-2" />
                    {maintenance.backToHome}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}
