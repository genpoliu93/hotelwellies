"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Locale, translations } from "./translations/index"
import { usePathname, useRouter } from "next/navigation"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLocale = "ja",
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 设置HTML语言属性
    document.documentElement.lang = locale

    // 保存语言偏好到localStorage
    localStorage.setItem("locale", locale)
  }, [locale])

  // 设置语言并更新路由
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)

    // 更新URL路径中的语言部分
    const currentPathWithoutLocale = pathname.split("/").slice(2).join("/") || ""
    const newPath = `/${newLocale}/${currentPathWithoutLocale}`
    router.push(newPath)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let result = translations[locale]

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return result as string
  }

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
