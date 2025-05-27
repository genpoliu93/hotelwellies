"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WindChime } from "@/components/wind-chime";
import { Z_INDEX } from "@/lib/z-index";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // 获取当前路径的基本部分（不包括语言前缀）
  const getBasePathname = () => {
    const parts = pathname.split("/");
    return parts.length > 2 ? `/${parts.slice(2).join("/")}` : "";
  };

  // 检查是否在首页
  const isHomePage = () => {
    return getBasePathname() === "" || getBasePathname() === "/";
  };

  // Function to handle navigation and scrolling
  const navigateToSection = (id: string) => {
    setIsMenuOpen(false);

    // If already on home page, just scroll
    if (isHomePage()) {
      scrollToSection(id);
      return;
    }

    // If not on home page, navigate to home page first, then scroll
    setIsNavigating(true);

    // Store the target section in sessionStorage to retrieve after navigation
    sessionStorage.setItem("scrollTarget", id);
    router.push(`/${locale}`);
  };

  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    // For hero section, scroll to top
    if (id === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // For other sections, scroll to the element with offset
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Check for stored scroll target after navigation
  useEffect(() => {
    if (isHomePage() && !isNavigating) {
      const scrollTarget = sessionStorage.getItem("scrollTarget");
      if (scrollTarget) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          scrollToSection(scrollTarget);
          sessionStorage.removeItem("scrollTarget");
        }, 100);
      }
    }

    // Reset navigating state
    setIsNavigating(false);
  }, [pathname, isNavigating]);

  return (
    <header
      className={`sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative`}
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hotel Wellies Logo"
              width={40}
              height={40}
              className="h-10 w-10 transition-transform duration-300 hover:scale-110 hover:rotate-12"
            />
            <span className="text-xl font-semibold tracking-tight">
              Hotel Wellies
            </span>
            <span className="ml-1 text-sm text-muted-foreground">.jp</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <button
            onClick={() => navigateToSection("hero")}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.home")}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <button
            onClick={() => navigateToSection("rooms")}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.rooms")}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <button
            onClick={() => navigateToSection("features")}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.features")}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <button
            onClick={() => navigateToSection("gallery")}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.gallery")}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <button
            onClick={() => navigateToSection("contact")}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.contact")}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </button>
          <Link
            href={`/${locale}/news`}
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            {t("common.news") || "お知らせ"}
            <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="outline" size="sm">
            {t("common.viewPrices")}
          </Button>
          <Button size="sm" asChild>
            <Link href={`/${locale}/booking`}>{t("common.bookNow")}</Link>
          </Button>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container">
            <div className="grid gap-3 pb-4">
              <button
                onClick={() => navigateToSection("hero")}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.home")}
              </button>
              <button
                onClick={() => navigateToSection("rooms")}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.rooms")}
              </button>
              <button
                onClick={() => navigateToSection("features")}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.features")}
              </button>
              <button
                onClick={() => navigateToSection("gallery")}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.gallery")}
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.contact")}
              </button>
              <Link
                href={`/${locale}/news`}
                className="flex items-center py-2 text-sm font-medium w-full text-left"
              >
                {t("common.news") || "お知らせ"}
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex justify-start pb-2">
                  <LanguageSwitcher />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {t("common.viewPrices")}
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link href={`/${locale}/booking`}>{t("common.bookNow")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加风铃组件 */}
      <WindChime />
    </header>
  );
}
