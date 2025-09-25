"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/i18n/context";
import { Z_INDEX } from "@/lib/z-index";
import { openBookingSystem } from "@/lib/booking-utils";

const SCROLL_OFFSET = 96;

type NavItem =
  | { id: string; label: string; type: "section" }
  | { id: string; label: string; type: "route"; href: string };

export function SideMenu() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "hero", label: t("common.home"), type: "section" },
      {
        id: "about",
        label: t("about.subtitle") || t("about.title"),
        type: "section",
      },
      { id: "features", label: t("features.title"), type: "section" },
      { id: "rooms", label: t("rooms.title"), type: "section" },
      { id: "testimonials", label: t("testimonials.title"), type: "section" },
      { id: "gallery", label: t("gallery.title"), type: "section" },
      { id: "contact", label: t("common.contact"), type: "section" },
      {
        id: "news",
        label: t("common.news"),
        type: "route",
        href: `/${locale}/news`,
      },
    ],
    [t, locale]
  );

  const getBasePathname = () => {
    const parts = pathname.split("/");
    return parts.length > 2 ? `/${parts.slice(2).join("/")}` : "";
  };

  const isHomePage = () => getBasePathname() === "" || getBasePathname() === "/";

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    const { top } = element.getBoundingClientRect();
    const offset = top + window.pageYOffset - SCROLL_OFFSET;

    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  const navigateToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (isHomePage()) {
      scrollToSection(id);
      return;
    }

    setIsNavigating(true);
    sessionStorage.setItem("scrollTarget", id);
    router.push(`/${locale}`);
  };

  const navigateToRoute = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  useEffect(() => {
    if (isHomePage() && !isNavigating) {
      const scrollTarget = sessionStorage.getItem("scrollTarget");
      if (scrollTarget) {
        setTimeout(() => {
          scrollToSection(scrollTarget);
          sessionStorage.removeItem("scrollTarget");
        }, 120);
      }
    }

    setIsNavigating(false);
  }, [pathname, isNavigating]);

  // 使用混合检测方案：Intersection Observer + 精确的滚动位置检测
  useEffect(() => {
    let currentSection = 'hero';

    const updateTextColor = (section: string) => {
      const darkSections = ['hero', 'rooms']; // hero和rooms使用白色文字
      setIsDarkText(!darkSections.includes(section));
    };

    // 方案1: 基于滚动位置的精确检测
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // 检测各个区域的大致位置
      if (scrollPosition < viewportHeight * 0.8) {
        // Hero区域
        if (currentSection !== 'hero') {
          currentSection = 'hero';
          updateTextColor('hero');
        }
      } else {
        // 检查是否在rooms区域
        const roomsElement = document.getElementById('rooms');
        if (roomsElement) {
          const roomsRect = roomsElement.getBoundingClientRect();
          const roomsTop = roomsRect.top + scrollPosition;
          const roomsBottom = roomsTop + roomsRect.height;

          if (scrollPosition >= roomsTop - viewportHeight * 0.3 &&
              scrollPosition <= roomsBottom - viewportHeight * 0.3) {
            // 在rooms区域内
            if (currentSection !== 'rooms') {
              currentSection = 'rooms';
              updateTextColor('rooms');
            }
          } else {
            // 在其他浅色区域
            const newSection = scrollPosition > roomsBottom ? 'after-rooms' : 'before-rooms';
            if (currentSection !== newSection) {
              currentSection = newSection;
              updateTextColor('other');
            }
          }
        }
      }
    };

    // 方案2: Intersection Observer作为辅助
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0, 0.1, 0.5, 0.9]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          if (sectionId === 'rooms') {
            currentSection = 'rooms';
            updateTextColor('rooms');
          } else if (['about', 'features', 'testimonials', 'gallery', 'contact'].includes(sectionId)) {
            currentSection = sectionId;
            updateTextColor('other');
          }
        }
      });
    }, observerOptions);

    // 延迟设置observer，确保DOM已渲染
    const setupObserver = () => {
      const sectionsToObserve = ['rooms', 'about', 'features', 'testimonials', 'gallery', 'contact'];
      sectionsToObserve.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.observe(section);
        }
      });
    };

    // 初始化
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 立即执行一次

    // 延迟设置observer
    setTimeout(setupObserver, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headline = t("hero.title");
  const subHeadline = t("hero.subtitle");
  const phone = t("contact.phone");
  const rawLanguageLabel = t("common.languages");
  const languageLabel =
    rawLanguageLabel === "common.languages" ? "Languages" : rawLanguageLabel;
  const rawSinceText = t("common.since");
  const sinceText =
    rawSinceText === "common.since" ? "Since 2013" : rawSinceText;

  return (
    <>

      {/* 智能文字颜色切换的导航菜单 */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 flex-col justify-between px-8 py-12 transition-all duration-700 ease-in-out hidden lg:flex ${
          isDarkText ? 'text-stone-800' : 'text-white'
        }`}
        style={{
          zIndex: Z_INDEX.NAVIGATION,
          background: isDarkText
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(8px)"
        }}
      >
        <div className="space-y-10 flex-1 min-h-0">
          <Link href={`/${locale}`} className="group flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Hotel Wellies Logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full bg-white/90 object-contain p-1 shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <p className={`text-xs uppercase tracking-[0.4em] ${
                  isDarkText ? 'text-stone-600' : 'text-white/60'
                }`}>
                  Karuizawa
                </p>
                <p className="text-xl font-light tracking-[0.2em]">
                  Hotel Wellies
                </p>
              </div>
            </div>
            <p className={`text-xs leading-relaxed ${
              isDarkText ? 'text-stone-700' : 'text-white/80'
            }`}>
              {subHeadline}
            </p>
          </Link>

          <nav className="space-y-4 flex-1 min-h-0 overflow-y-auto">
            {navItems.map((item) => {
              if (item.type === "section") {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToSection(item.id)}
                    className={`group flex w-full items-center gap-3 text-left text-xs uppercase tracking-[0.45em] transition ${
                      isDarkText
                        ? 'text-stone-600 hover:text-stone-800'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span className={`h-px w-8 transition-all group-hover:w-12 ${
                      isDarkText
                        ? 'bg-stone-400 group-hover:bg-stone-800'
                        : 'bg-white/30 group-hover:bg-white'
                    }`} />
                    <span className="flex-1 truncate">{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToRoute(item.href)}
                  className={`group flex w-full items-center gap-3 text-left text-xs uppercase tracking-[0.45em] transition ${
                    isDarkText
                      ? 'text-stone-600 hover:text-stone-800'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className={`h-px w-8 transition-all group-hover:w-12 ${
                    isDarkText
                      ? 'bg-stone-400 group-hover:bg-stone-800'
                      : 'bg-white/30 group-hover:bg-white'
                  }`} />
                  <span className="flex-1 truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 flex-shrink-0">
          <div className={`space-y-2 text-xs uppercase tracking-[0.35em] ${
            isDarkText ? 'text-stone-600' : 'text-white/60'
          }`}>
            <span className="block">{sinceText}</span>
            <span className={`block font-medium text-xs ${
              isDarkText ? 'text-stone-800' : 'text-white'
            }`}>{headline}</span>
          </div>
          <div className={`space-y-2 text-sm ${
            isDarkText ? 'text-stone-700' : 'text-white/80'
          }`}>
            <p className={`flex items-center gap-2 text-xs ${
              isDarkText ? 'text-stone-800' : 'text-white'
            }`}>
              <Phone className="h-3 w-3" />
              <span>{phone}</span>
            </p>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <span className={`text-xs uppercase tracking-[0.35em] ${
                isDarkText ? 'text-stone-600' : 'text-white/60'
              }`}>
                {languageLabel}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            className={`w-full rounded-lg py-2 text-xs uppercase tracking-[0.4em] transition ${
              isDarkText
                ? 'border border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200'
                : 'border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
            }`}
            onClick={() => openBookingSystem('sidebar')}
          >
            {t("common.bookNow")}
          </Button>
        </div>
      </aside>

      <div
        className="fixed left-4 right-4 top-4 flex items-center justify-between rounded-full border border-stone-200 bg-white/90 px-5 py-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70 lg:hidden"
        style={{ zIndex: Z_INDEX.NAVIGATION }}
      >
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Hotel Wellies Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-white object-contain p-1"
          />
          <div className="flex flex-col leading-tight text-stone-700">
            <span className="text-sm uppercase tracking-[0.35em]">Hotel Wellies</span>
            <span className="text-[0.65rem] uppercase tracking-[0.45em] text-stone-400">
              Karuizawa
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 flex flex-col bg-stone-50/95 px-6 py-24 text-stone-800 backdrop-blur-lg lg:hidden"
          style={{ zIndex: Z_INDEX.MODAL }}
          role="dialog"
          aria-modal="true"
        >
          <nav className="space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.type === "section"
                    ? navigateToSection(item.id)
                    : navigateToRoute(item.href)
                }
                className="w-full border-b border-stone-200 pb-4 text-left text-sm uppercase tracking-[0.45em] text-stone-600 transition hover:text-stone-900"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-6 pt-12">
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <span className="text-xs uppercase tracking-[0.4em] text-stone-500">
                {languageLabel}
              </span>
            </div>
            <p className="flex items-center gap-3 text-sm text-stone-600">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </p>
            <Button
              size="lg"
              className="w-full rounded-none bg-stone-900 py-3 text-xs uppercase tracking-[0.5em] text-white transition hover:bg-stone-700"
              onClick={() => openBookingSystem('mobile-menu')}
            >
              {t("common.bookNow")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
