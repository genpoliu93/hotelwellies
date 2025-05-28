"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";

export function HtmlLangSetter() {
  const { locale } = useLanguage();

  useEffect(() => {
    // 只在客户端设置HTML语言属性
    if (typeof window !== "undefined" && document.documentElement) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // 这个组件不渲染任何内容
  return null;
}
