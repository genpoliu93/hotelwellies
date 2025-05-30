import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/context";
import { HtmlLangSetter } from "@/components/html-lang-setter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Hotel Wellies | Karuizawa",
  description:
    "European-style hideaway in the healing mountain resort of Karuizawa",
  generator: "v0.dev",
  keywords: [
    "hotel",
    "karuizawa",
    "european style",
    "mountain resort",
    "Japan",
    "luxury accommodation",
  ],
  authors: [{ name: "Hotel Wellies" }],
  creator: "Hotel Wellies",
  publisher: "Hotel Wellies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hotel-wellies.com",
    title: "Hotel Wellies | Karuizawa",
    description:
      "European-style hideaway in the healing mountain resort of Karuizawa",
    siteName: "Hotel Wellies",
    images: [
      {
        url: "/images/hotel-exterior.webp",
        width: 1200,
        height: 630,
        alt: "Hotel Wellies Exterior - European-style mountain resort in Karuizawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Wellies | Karuizawa",
    description:
      "European-style hideaway in the healing mountain resort of Karuizawa",
    images: ["/images/hotel-exterior.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // 请替换为实际的Google验证码
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <HtmlLangSetter />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
