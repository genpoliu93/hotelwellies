import React from "react";
import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/translations";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hotel Wellies | Karuizawa",
  description:
    "European-style hideaway in the healing mountain resort of Karuizawa",
};

// 为静态导出生成所有支持的语言页面
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }, { locale: "zh" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { locale } = params as { locale: Locale };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
