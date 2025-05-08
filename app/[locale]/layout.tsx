import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "../../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/context"
import type { Locale } from "@/lib/i18n/translations"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hotel Wellies | Karuizawa",
  description: "European-style hideaway in the healing mountain resort of Karuizawa",
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider initialLocale={params.locale}>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
