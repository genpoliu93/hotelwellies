"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import {
  type Locale,
  translations,
  type TranslationObject,
} from "./translations/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// 添加调试标志
const DEBUG_I18N = false;

export function LanguageProvider({
  children,
  initialLocale = "ja",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  // 安全地获取searchParams，避免SSR问题
  let searchParams: URLSearchParams | null = null;
  try {
    searchParams = useSearchParams();
  } catch (error) {
    // 在某些情况下useSearchParams可能会失败，我们使用fallback
    if (typeof window !== "undefined") {
      searchParams = new URLSearchParams(window.location.search);
    }
  }

  // 输出初始化信息
  useEffect(() => {
    if (DEBUG_I18N) {
      console.log(`[I18N] LanguageProvider initialized with locale: ${locale}`);
      console.log(`[I18N] Current pathname: ${pathname}`);
    }

    // 保存语言偏好到localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale, pathname]);

  // 设置语言并更新路由
  const setLocale = (newLocale: Locale) => {
    if (DEBUG_I18N) {
      console.log(`[I18N] Setting locale from ${locale} to ${newLocale}`);
    }

    setLocaleState(newLocale);

    // 更新URL路径中的语言部分，同时保留查询参数和hash
    const currentPathWithoutLocale =
      pathname.split("/").slice(2).join("/") || "";

    // 构建新的路径
    let newPath = `/${newLocale}/${currentPathWithoutLocale}`;

    // 保留查询参数
    if (searchParams && searchParams.toString()) {
      newPath += `?${searchParams.toString()}`;
    }

    // 保留hash（如果有的话）
    if (typeof window !== "undefined" && window.location.hash) {
      newPath += window.location.hash;
    }

    // 使用 replace 而不是 push，并禁用自动滚动
    router.replace(newPath, { scroll: false });
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: TranslationObject | string = translations[locale];

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        if (DEBUG_I18N) {
          console.warn(
            `[I18N] Translation key not found: ${key} (in locale: ${locale})`
          );
          // 尝试在其他语言中查找
          const foundInOtherLocales = Object.keys(translations).filter(
            (otherLocale) => {
              let tempResult: TranslationObject | string =
                translations[otherLocale as Locale];
              let found = true;
              for (const tempKey of keys) {
                if (
                  tempResult &&
                  typeof tempResult === "object" &&
                  tempKey in tempResult
                ) {
                  tempResult = tempResult[tempKey];
                } else {
                  found = false;
                  break;
                }
              }
              return found;
            }
          );

          if (foundInOtherLocales.length > 0) {
            console.log(
              `[I18N] Key "${key}" found in locales: ${foundInOtherLocales.join(
                ", "
              )}`
            );
          } else {
            console.log(`[I18N] Key "${key}" not found in any locale`);
          }
        }
        return key;
      }
    }

    // 确保返回的是字符串
    if (typeof result === "string") {
      return result;
    } else {
      console.warn(`[I18N] Expected string for key: ${key}, but got object`);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
